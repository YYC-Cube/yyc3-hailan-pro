// 海蓝 (HaiLan) - 系统全局配置
// 用于管理私有 NAS 连接、环境变量及功能开关

export const AppConfig = {
  // --- 后端连接配置 ---
  api: {
    // 您的 NAS 私有云 API 地址
    // 示例: "http://192.168.1.100:3000/api" 或 "https://hailan.your-nas.com/api"
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
    
    // 超时设置 (毫秒)
    timeout: 10000,
    
    // 是否启用真实 API 连接
    // true: 尝试连接 NAS 后端
    // false: 使用前端本地模拟数据 (演示/离线模式)
    useRealBackend: false,
  },

  // --- 安全配置 ---
  security: {
    // WebAuthn 生物识别配置
    webAuthn: {
      rpName: "HaiLan Private Health",
      rpId: window.location.hostname, // 在生产环境中应为固定域名
      timeout: 60000,
    },
    // 自动锁定时间 (秒)
    autoLockTimeout: 300, 
  },

  // --- 隐私配置 ---
  privacy: {
    // 数据本地存储键前缀，防止与其他应用冲突
    storagePrefix: "hailan_secure_",
    // 默认数据保留天数
    defaultRetentionDays: 30,
  },
  
  // --- 版本信息 ---
  version: "1.2.0-beta",
};
