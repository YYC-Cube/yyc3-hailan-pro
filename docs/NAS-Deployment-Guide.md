# 海蓝 (HaiLan) Pro - 本地NAS部署指导

> **基于您的NAS环境配置**
> **OS**: QNAP/TS (推测，基于smbd/nmbd服务)
> **RAM**: 31GB (可用26GB)
> **Storage**: 14TB (Volume1/2)
> **Status**: Docker & Nginx Running

---

## 1. 环境检查与优化

### 1.1 系统负载
*当前负载平均值为 2.10，略高，可能是由于SMB传输或Docker服务。*

**建议**：
- 检查Docker容器资源占用。
- 限制非关键服务的CPU使用。
- 如果负载持续 >4，考虑增加内存或升级CPU。

### 1.2 存储规划
*Volume1 (14TB) 仅使用 5%，空间非常充足。*

**建议**：
- **应用数据**: 使用 `/Volume1/hailan-pro/app`
- **数据库数据**: 使用 `/Volume1/hailan-pro/db` (如果未使用远程DB)
- **媒体文件**: 使用 `/Volume1/hailan-pro/media`
- **备份**: 使用 `/Volume2/hailan-pro/backups`

### 1.3 权限设置 (关键)
NAS的Docker通常以特定用户运行，需注意文件权限。

```bash
# SSH登录NAS后执行
# 创建目录结构
sudo mkdir -p /Volume1/hailan-pro/{app,db,media,logs}

# 设置权限 (假设docker用户UID 1000，根据实际情况调整)
sudo chown -R 1000:1000 /Volume1/hailan-pro
sudo chmod -R 775 /Volume1/hailan-pro
```

---

## 2. Docker 部署配置

### 2.1 创建 Docker 网络
为了隔离服务，建议创建专用网络。

```bash
docker network create hailan-network --driver bridge
```

### 2.2 准备 `.env` 文件
在 `/Volume1/hailan-pro/app` 下创建 `.env` 文件。

```bash
# 基础配置
NODE_ENV=production
VITE_API_URL=http://<NAS_IP>:8080

# 数据库配置 (如果使用本地PostgreSQL)
POSTGRES_DB=hailan_prod
POSTGRES_USER=hailan_admin
POSTGRES_PASSWORD=<StrongPassword>
PGDATA=/var/lib/postgresql/data/pgdata

# Redis配置 (如果使用本地Redis)
REDIS_PASSWORD=<StrongPassword>

# Supabase配置 (云端)
SUPABASE_URL=<Your_Supabase_URL>
SUPABASE_ANON_KEY=<Your_Anon_Key>
SUPABASE_SERVICE_ROLE_KEY=<Your_Service_Role_Key>

# 安全配置
JWT_SECRET=<Your_Secret_Key>
SESSION_SECRET=<Your_Session_Secret>
```

### 2.3 Docker Compose 部署
由于NAS Nginx已运行，我们将使用 `network_mode: host` 或 `expose` + `nginx` 反向代理。
**注意**: 鉴于您有32G大内存，可以适当调整容器内存限制。

```yaml
version: '3.8'

services:
  # ==================== Frontend ====================
  hailan-frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: hailan-frontend
    restart: always
    ports:
      - "5174:80" # 注意：这里映射到宿主机5174端口，Nginx将代理此端口
    networks:
      - hailan-network
    volumes:
      - /Volume1/hailan-pro/media:/app/public/media:ro
    environment:
      - NODE_ENV=production
      - VITE_API_URL=http://<NAS_IP>:8080
    mem_limit: 512m
    memswap_limit: 1g

  # ==================== Database (可选，如果本地部署) ====================
  postgres:
    image: postgres:14.7-alpine
    container_name: hailan-db
    restart: always
    ports:
      - "5432:5432"
    networks:
      - hailan-network
    volumes:
      - /Volume1/hailan-pro/db:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    mem_limit: 2g
    memswap_limit: 2g

  # ==================== Redis (可选，如果本地部署) ====================
  redis:
    image: redis:7-alpine
    container_name: hailan-redis
    restart: always
    ports:
      - "6379:6379"
    networks:
      - hailan-network
    command: redis-server --requirepass ${REDIS_PASSWORD} --appendonly yes
    volumes:
      - /Volume1/hailan-pro/redis:/data
    mem_limit: 512m
    memswap_limit: 512m

networks:
  hailan-network:
    driver: bridge
```

### 2.4 启动服务

```bash
cd /Volume1/hailan-pro/app
docker-compose up -d --build
```

---

## 3. Nginx 反向代理配置

### 3.1 配置站点
您的NAS已运行Nginx。请在Nginx配置目录下（通常为 `/etc/nginx/conf.d/` 或通过Web界面配置）添加新站点。

```nginx
server {
    listen 80;
    server_name <NAS_IP> hailan.local; # 使用局域网IP或域名

    # 日志
    access_log /Volume1/hailan-pro/logs/nginx_access.log;
    error_log /Volume1/hailan-pro/logs/nginx_error.log;

    # 前端代理
    location / {
        proxy_pass http://127.0.0.1:5174; # 代理到Docker容器端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket支持 (如果使用了)
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # API代理 (如果Docker内部)
    # location /api/ {
    #     proxy_pass http://127.0.0.1:8080;
    #     proxy_set_header Host $host;
    #     ...
    # }

    # 静态资源缓存
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:5174;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3.2 重启 Nginx

```bash
# SSH执行
sudo nginx -t # 测试配置
sudo systemctl reload nginx # 或通过NAS管理界面重启Web服务
```

---

## 4. Samba 文件共享配置

### 4.1 共享开发目录
为了让团队成员能访问代码和资源，建议配置Samba共享。

**配置文件 (通常在 `/etc/samba/smb.conf` 或通过NAS管理界面):**

```ini
[HaiLan-Pro]
    comment = HaiLan Pro Project Directory
    path = /Volume1/hailan-pro
    browseable = yes
    read only = no
    guest ok = no
    valid users = hailan_dev, @admin
    create mask = 0775
    directory mask = 0775
    force user = docker
    force group = docker
```

**生效配置**:
```bash
sudo smbcontrol all reload-config
```

### 4.2 客户端访问
- **Windows**: `\\<NAS_IP>\HaiLan-Pro`
- **Mac**: Finder -> 前往 -> 连接服务器 -> `smb://<NAS_IP>/HaiLan-Pro`

---

## 5. 备份策略

### 5.1 数据库备份
利用NAS的 `/Volume2` 进行异地备份。

```bash
# 添加到NAS的Cron任务 (每周日凌晨2点)
0 2 * * 0 root pg_dump -U hailan_admin hailan_prod | gzip > /Volume2/hailan-pro/backups/db_$(date +\%Y\%m\%d).sql.gz
```

### 5.2 文件同步
如果需要同步到云盘（如Dropbox/Google Drive），可以在Docker中运行 `rclone` 容器。

```yaml
services:
  rclone:
    image: rclone/rclone
    container_name: hailan-rclone
    restart: unless-stopped
    command: sync /Volume1/hailan-pro remote:hailan-pro-backup --exclude ".git" --exclude "node_modules"
    volumes:
      - /Volume1/hailan-pro:/data
      - /Volume1/hailan-pro/config/rclone:/config/rclone
```

---

## 6. 性能监控

### 6.1 容器监控
建议安装 `portainer` 或使用 `netdata` (NAS通常自带监控面板)。

```yaml
# 添加到 docker-compose.yml
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: always
    ports:
      - "9000:9000"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /Volume1/hailan-pro/portainer:/data
```

访问 `http://<NAS_IP>:9000` 管理容器。

### 6.2 日志管理
NAS磁盘很大，但日志也需清理，避免写满 `/dev/md9` (仅7.5G)。

在Docker Compose中配置日志限制：

```yaml
services:
  hailan-frontend:
    # ...
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## 7. 故障排查

### 7.1 容器无法启动
```bash
docker-compose logs hailan-frontend
# 检查端口占用
netstat -tulpn | grep 5174
```

### 7.2 Nginx 502 Bad Gateway
- 检查Docker容器是否真的在 `127.0.0.1:5174` 监听。
- 检查NAS防火墙是否允许了本地回环访问。

### 7.3 权限被拒绝
- 确保Docker容器用户对挂载的Volume有读写权限。
- 确保 `/Volume1` 文件系统允许写入。

---

## 8. 安全建议

1.  **防火墙**: 关闭NAS的外网端口映射（80, 443, 5174），仅在内网访问，或通过VPN访问。
2.  **弱口令**: 修改NAS的默认管理员密码和SMB密码。
3.  **更新**: 定期检查NAS系统和Docker镜像的更新。

---

### 部署检查清单

- [ ] 目录已创建且权限正确
- [ ] `.env` 文件已配置
- [ ] Docker Compose 启动成功
- [ ] 容器健康检查正常 (`docker ps`)
- [ ] Nginx 配置已应用且重载
- [ ] 局域网 IP 可以访问首页
- [ ] Samba 共享可读写
- [ ] Portainer 可访问 (可选)

**祝部署顺利！**
