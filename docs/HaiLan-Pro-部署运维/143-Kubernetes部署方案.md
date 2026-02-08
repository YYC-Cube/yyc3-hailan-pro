---
file: 143-Kubernetes部署方案.md
description: HaiLan Pro Kubernetes部署方案，包含Pod、Service、Deployment、ConfigMap等
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-01-26
updated: 2026-01-26
status: published
tags:
  - HaiLan-Pro-部署运维,[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 143 Kubernetes部署方案

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-部署运维-Kubernetes部署方案相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景
HaiLan Pro (海蓝) 是新一代高端、私密、智能的情趣健康生活管理平台。项目基于「五高五标五化」理念，通过 PWA 技术结合 AI 智能辅助与物联网，为用户提供从生理健康到心理愉悦的全方位解决方案。

#### 1.2 项目愿景
打造极致隐私、智能陪伴、品质合规、全场景覆盖的情趣健康生活管理平台，为用户提供安全、专业、高端的健康生活体验。

#### 1.3 核心价值主张
- **极致隐私**：双重加密、隐私浏览模式及伪装发货机制
- **智能陪伴**：基于 LLM 的 AI 情感与生理健康顾问
- **品质合规**：医疗级标准商品，高端"海蓝蓝"视觉调性
- **全场景覆盖**：PWA 端支持离线浏览、桌面安装及无缝推送

#### 1.4 文档目标
- 规范Kubernetes部署方案相关的业务标准与技术落地要求
- 为项目相关人员提供清晰的参考依据
- 保障相关模块开发、实施、运维的一致性与规范性

### 2. 设计原则

#### 2.1 五高原则
- **高可用性**：确保系统7x24小时稳定运行，支持PWA离线能力
- **高性能**：优化响应时间和处理能力，支持高并发访问
- **高安全性**：保护用户数据和隐私安全，双重加密机制
- **高扩展性**：支持业务快速扩展，微服务架构设计
- **高可维护性**：便于后续维护和升级，模块化设计

#### 2.2 五标体系
- **标准化**：统一的技术和流程标准
- **规范化**：严格的开发和管理规范
- **自动化**：提高开发效率和质量，CI/CD自动化
- **智能化**：利用AI技术提升能力，LLM智能顾问
- **可视化**：直观的监控和管理界面

#### 2.3 五化架构
- **流程化**：标准化的开发流程
- **文档化**：完善的文档体系
- **工具化**：高效的开发工具链
- **数字化**：数据驱动的决策
- **生态化**：开放的生态系统

### 3. Kubernetes部署方案

#### 3.1 集群架构设计

**集群拓扑：**

```
                        ┌─────────────────────────────────────┐
                        │       External Load Balancer        │
                        │      (阿里云 SLB / AWS ELB)         │
                        └─────────────────────────────────────┘
                                          │
                        ┌─────────────────────────────────────┐
                        │     Ingress Controller (Nginx)      │
                        └─────────────────────────────────────┘
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        │                                 │                                 │
┌───────────────┐               ┌───────────────┐               ┌───────────────┐
│  Master Node  │               │  Worker Node  │               │  Worker Node  │
│  (Control)    │               │  (Compute)    │               │  (Compute)    │
├───────────────┤               ├───────────────┤               ├───────────────┤
│ API Server    │               │ Frontend Pod  │               │ Frontend Pod  │
│ Scheduler     │               │ Backend Pod   │               │ Backend Pod   │
│ Controller    │               │ Worker Pod    │               │ Worker Pod    │
│ etcd          │               │ Redis Pod     │               │ Redis Pod     │
└───────────────┘               └───────────────┘               └───────────────┘
```

**节点规格配置：**

| 节点类型 | 实例规格 | CPU | 内存 | 存储 | 用途 |
|----------|----------|-----|------|------|------|
| Master | 4c8g | 4核 | 8GB | 100GB SSD | 控制平面 |
| Worker-frontend | 8c16g | 8核 | 16GB | 200GB SSD | 前端服务 |
| Worker-backend | 16c32g | 16核 | 32GB | 500GB SSD | 后端服务 |
| Worker-storage | 8c32g | 8核 | 32GB | 2TB SSD | 数据存储 |

#### 3.2 集群安装与配置

**使用 kubeadm 初始化集群：**

```bash
#!/bin/bash

# Master 节点初始化
sudo kubeadm init \
  --apiserver-advertise-address=<MASTER_IP> \
  --control-plane-endpoint=k8s.hailan.pro \
  --kubernetes-version=v1.29.0 \
  --pod-network-cidr=10.244.0.0/16 \
  --service-cidr=10.96.0.0/12 \
  --upload-certs

# 配置 kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# 安装 Calico CNI
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

# 获取 join 命令
kubeadm token create --print-join-command
```

**Worker 节点加入集群：**

```bash
# 在 Worker 节点执行
sudo kubeadm join k8s.hailan.pro:6443 \
  --token <TOKEN> \
  --discovery-token-ca-cert-hash sha256:<HASH>
```

#### 3.3 命名空间配置

**创建命名空间：**

```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: hailan-pro
  labels:
    name: hailan-pro
    environment: production

---
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-resources
  namespace: hailan-pro
spec:
  hard:
    requests.cpu: "10"
    requests.memory: 20Gi
    limits.cpu: "20"
    limits.memory: 40Gi

---
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: hailan-pro
spec:
  limits:
  - default:
      cpu: 500m
      memory: 512Mi
    defaultRequest:
      cpu: 100m
      memory: 128Mi
    type: Container
```

#### 3.4 ConfigMap 配置

**应用配置 ConfigMap：**

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: hailan-config
  namespace: hailan-pro
data:
  # Nginx 配置
  nginx.conf: |
    user nginx;
    worker_processes auto;
    error_log /var/log/nginx/error.log warn;
    pid /var/run/nginx.pid;

    events {
        worker_connections 1024;
    }

    http {
        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for"';

        access_log /var/log/nginx/access.log main;

        sendfile on;
        tcp_nopush on;
        keepalive_timeout 65;
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_types text/plain text/css text/xml text/javascript
                   application/x-javascript application/xml+rss
                   application/json application/javascript;

        server {
            listen 8080;
            server_name _;
            root /usr/share/nginx/html;
            index index.html;

            location / {
                try_files $uri $uri/ /index.html;
                add_header Cache-Control "no-cache";
            }

            location /assets/ {
                expires 1y;
                add_header Cache-Control "public, immutable";
            }

            location /health {
                access_log off;
                return 200 "healthy\n";
                add_header Content-Type text/plain;
            }
        }
    }

  # 应用环境变量
  app.env: |
    NODE_ENV=production
    LOG_LEVEL=info
    API_TIMEOUT=30000

  # PWA 配置
  pwa.json: |
    {
      "name": "海蓝 HaiLan Pro",
      "short_name": "海蓝",
      "description": "高端私密健康管理平台",
      "start_url": "/",
      "display": "standalone",
      "background_color": "#0A1628",
      "theme_color": "#00D4FF",
      "orientation": "portrait"
    }
```

#### 3.5 Secret 配置

**敏感信息 Secret：**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: hailan-secrets
  namespace: hailan-pro
type: Opaque
stringData:
  # Supabase 配置
  supabase-url: "https://xxxxx.supabase.co"
  supabase-anon-key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  supabase-service-role-key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

  # Redis 配置
  redis-password: "your-redis-password"

  # JWT 配置
  jwt-secret: "your-jwt-secret"

  # IPFS 配置
  ipfs-api-key: "your-ipfs-api-key"
  ipfs-secret: "your-ipfs-secret"

  # AI API 配置
  openai-api-key: "sk-..."
  ai-model-endpoint: "https://api.openai.com/v1"

---
# TLS 证书 Secret
apiVersion: v1
kind: Secret
metadata:
  name: hailan-tls
  namespace: hailan-pro
type: kubernetes.io/tls
data:
  tls.crt: LS0tLS1CRUdJTi...
  tls.key: LS0tLS1CRUdJTi...

---
# Docker 镜像拉取 Secret
apiVersion: v1
kind: Secret
metadata:
  name: docker-registry-secret
  namespace: hailan-pro
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: eyJhdXRocyI6eyJyZWdpc3RyeS5oYWlsYW4ucHJvIjp7InVzZXJuYW1lIjoieHh4eCIsInBhc3N3b3JkIjoieHh4eCIsImF1dGgiOiJhVzFoYVd4MGFYUW9ZVzh4UTJWeWRHVnlJam94In19fQ==
```

#### 3.6 Frontend Deployment

**前端部署清单：**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hailan-frontend
  namespace: hailan-pro
  labels:
    app: hailan-frontend
    version: v1.0.0
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: hailan-frontend
  template:
    metadata:
      labels:
        app: hailan-frontend
        version: v1.0.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: hailan-frontend
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001
        fsGroup: 1001
      containers:
      - name: frontend
        image: registry.hailan.pro/hailan-frontend:v1.0.0
        imagePullPolicy: Always
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP
        env:
        - name: NODE_ENV
          value: "production"
        - name: VITE_API_URL
          valueFrom:
            configMapKeyRef:
              name: hailan-config
              key: api-url
        - name: VITE_SUPABASE_URL
          valueFrom:
            secretKeyRef:
              name: hailan-secrets
              key: supabase-url
        - name: VITE_SUPABASE_ANON_KEY
          valueFrom:
            secretKeyRef:
              name: hailan-secrets
              key: supabase-anon-key
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        volumeMounts:
        - name: nginx-config
          mountPath: /etc/nginx/nginx.conf
          subPath: nginx.conf
          readOnly: true
        - name: cache-volume
          mountPath: /var/cache/nginx
        - name: run-volume
          mountPath: /var/run
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 3
          successThreshold: 1
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          successThreshold: 1
          failureThreshold: 3
        lifecycle:
          preStop:
            exec:
              command:
              - sh
              - -c
              - sleep 15
      volumes:
      - name: nginx-config
        configMap:
          name: hailan-config
      - name: cache-volume
        emptyDir: {}
      - name: run-volume
        emptyDir: {}
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - hailan-frontend
              topologyKey: kubernetes.io/hostname

---
apiVersion: v1
kind: Service
metadata:
  name: hailan-frontend
  namespace: hailan-pro
  labels:
    app: hailan-frontend
spec:
  type: ClusterIP
  selector:
    app: hailan-frontend
  ports:
  - name: http
    port: 80
    targetPort: 8080
    protocol: TCP

---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: hailan-frontend-hpa
  namespace: hailan-pro
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: hailan-frontend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 30
      - type: Pods
        value: 2
        periodSeconds: 30
      selectPolicy: Max
```

#### 3.7 Ingress 配置

**Nginx Ingress Controller：**

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hailan-ingress
  namespace: hailan-pro
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/use-regex: "true"
    nginx.ingress.kubernetes.io/rewrite-target: /$2
    nginx.ingress.kubernetes.io/configuration-snippet: |
      more_set_headers "X-Frame-Options: SAMEORIGIN";
      more_set_headers "X-Content-Type-Options: nosniff";
      more_set_headers "X-XSS-Protection: 1; mode=block";
      more_set_headers "Referrer-Policy: no-referrer-when-downgrade";
      more_set_headers "Strict-Transport-Security: max-age=63072000; includeSubDomains; preload";
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - hailan.pro
    - www.hailan.pro
    secretName: hailan-tls
  rules:
  - host: hailan.pro
    http:
      paths:
      - path: /api(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: hailan-backend
            port:
              number: 80
      - path: /(/|$)(.*)
        pathType: Prefix
        backend:
          service:
            name: hailan-frontend
            port:
              number: 80
```

#### 3.8 后端服务部署

**Supabase Edge Functions Deployment：**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hailan-backend
  namespace: hailan-pro
spec:
  replicas: 2
  selector:
    matchLabels:
      app: hailan-backend
  template:
    metadata:
      labels:
        app: hailan-backend
    spec:
      containers:
      - name: backend
        image: registry.hailan.pro/hailan-backend:v1.0.0
        ports:
        - containerPort: 8080
        env:
        - name: SUPABASE_URL
          valueFrom:
            secretKeyRef:
              name: hailan-secrets
              key: supabase-url
        - name: SUPABASE_ANON_KEY
          valueFrom:
            secretKeyRef:
              name: hailan-secrets
              key: supabase-anon-key
        - name: SUPABASE_SERVICE_ROLE_KEY
          valueFrom:
            secretKeyRef:
              name: hailan-secrets
              key: supabase-service-role-key
        resources:
          requests:
            cpu: 200m
            memory: 256Mi
          limits:
            cpu: 1000m
            memory: 1Gi
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 10
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: hailan-backend
  namespace: hailan-pro
spec:
  type: ClusterIP
  selector:
    app: hailan-backend
  ports:
  - port: 80
    targetPort: 8080
```

#### 3.9 StatefulSet 部署 (Redis)

**Redis Cluster StatefulSet：**

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: hailan-redis
  namespace: hailan-pro
spec:
  serviceName: hailan-redis
  replicas: 6
  selector:
    matchLabels:
      app: hailan-redis
  template:
    metadata:
      labels:
        app: hailan-redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        command:
        - redis-server
        - /conf/redis.conf
        - --cluster-enabled yes
        - --cluster-config-file nodes.conf
        - --cluster-node-timeout 5000
        - --appendonly yes
        - --protected-mode no
        ports:
        - name: client
          containerPort: 6379
        - name: gossip
          containerPort: 16379
        env:
        - name: POD_IP
          valueFrom:
            fieldRef:
              fieldPath: status.podIP
        volumeMounts:
        - name: conf
          mountPath: /conf
        - name: data
          mountPath: /data
        resources:
          requests:
            cpu: 100m
            memory: 256Mi
          limits:
            cpu: 500m
            memory: 1Gi
      volumes:
      - name: conf
        configMap:
          name: hailan-redis-config
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 10Gi

---
apiVersion: v1
kind: Service
metadata:
  name: hailan-redis
  namespace: hailan-pro
spec:
  clusterIP: None
  selector:
    app: hailan-redis
  ports:
  - name: client
    port: 6379
    targetPort: 6379
  - name: gossip
    port: 16379
    targetPort: 16379
```

#### 3.10 Helm Chart 部署

**使用 Helm 部署：**

```yaml
# values.yaml
image:
  repository: registry.hailan.pro/hailan-frontend
  tag: v1.0.0
  pullPolicy: Always

imagePullSecrets:
  - name: docker-registry-secret

replicaCount: 3

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70
  targetMemoryUtilizationPercentage: 80

resources:
  requests:
    cpu: 100m
    memory: 128Mi
  limits:
    cpu: 500m
    memory: 512Mi

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: hailan.pro
      paths:
        - path: /
          pathType: Prefix
  tls:
    - secretName: hailan-tls
      hosts:
        - hailan.pro

config:
  apiUrl: https://api.hailan.pro
  logLevel: info

secrets:
  supabaseUrl: https://xxxxx.supabase.co
  supabaseAnonKey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**部署命令：**

```bash
# 添加 Helm 仓库
helm repo add hailan https://charts.hailan.pro
helm repo update

# 安装/升级
helm upgrade --install hailan-pro hailan/hailan-pro \
  --namespace hailan-pro \
  --create-namespace \
  --values values.yaml \
  --version 1.0.0

# 回滚
helm rollback hailan-pro 1 --namespace hailan-pro

# 卸载
helm uninstall hailan-pro --namespace hailan-pro
```

#### 3.11 监控与日志

**PodMonitor (Prometheus Operator)：**

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: hailan-frontend
  namespace: hailan-pro
spec:
  selector:
    matchLabels:
      app: hailan-frontend
  podMetricsEndpoints:
  - port: http
    path: /metrics
    interval: 30s
```

#### 3.12 灾难恢复

**备份与恢复策略：**

```bash
# etcd 备份
ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key

# etcd 恢复
ETCDCTL_API=3 etcdctl snapshot restore /backup/etcd-snapshot.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key
```

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
