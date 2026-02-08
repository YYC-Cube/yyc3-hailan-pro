---
@file: 076-技术类型-WebSocket实时通信接口.md
@description: HaiLan Pro 实时聊天、消息推送等WebSocket接口的设计与调用规范
@author: YanYuCloudCube Team
@version: v1.0.0
@created: 2026-01-26
@updated: 2026-01-26
@status: published
@tags: [HaiLan-Pro-API文档],[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 076 技术类型-WebSocket实时通信接口

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-API文档-技术类型-WebSocket实时通信接口相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范技术类型-WebSocket实时通信接口相关的业务标准与技术落地要求
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

### 3. WebSocket实时通信接口

#### 3.1 接口概述

WebSocket实时通信接口为HaiLan Pro提供全双工、低延迟的实时通信能力，支持以下核心功能：

- **实时消息推送**：订单状态、物流信息、系统通知等实时推送
- **实时聊天**：用户与客服、用户与AI顾问的实时对话
- **在线状态管理**：实时同步用户在线状态
- **设备联动**：IoT设备的实时状态同步与控制
- **数据同步**：多端数据实时同步

#### 3.2 连接管理

##### 3.2.1 连接建立

**WebSocket连接端点**

```
wss://api.hailan-pro.com/ws/v1
```

**连接参数**

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| token | string | 是 | JWT认证令牌 |
| deviceId | string | 是 | 设备唯一标识 |
| platform | string | 是 | 平台类型：web/mobile/desktop |
| version | string | 是 | 客户端版本号 |

**连接示例**

```javascript
const ws = new WebSocket('wss://api.hailan-pro.com/ws/v1?token=xxx&deviceId=xxx&platform=web&version=1.0.0');

ws.onopen = () => {
  console.log('WebSocket连接已建立');
  // 发送连接确认
  ws.send(JSON.stringify({
    type: 'CONNECT',
    payload: {
      deviceId: 'device-123',
      platform: 'web',
      version: '1.0.0'
    }
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  handleMessage(message);
};

ws.onerror = (error) => {
  console.error('WebSocket错误:', error);
};

ws.onclose = () => {
  console.log('WebSocket连接已关闭');
  // 触发断线重连
  reconnect();
};
```

##### 3.2.2 连接认证

**连接认证流程**

```typescript
/**
 * WebSocket连接认证
 * @description 验证JWT令牌并建立WebSocket连接
 */
interface WSAuthRequest {
  type: 'AUTH';
  payload: {
    token: string;
    deviceId: string;
    timestamp: number;
    signature: string;
  };
}

interface WSAuthResponse {
  type: 'AUTH_SUCCESS' | 'AUTH_FAILED';
  payload: {
    sessionId: string;
    userId: string;
    expireTime: number;
    permissions: string[];
  };
}

/**
 * 生成认证签名
 */
function generateAuthSignature(token: string, deviceId: string, timestamp: number): string {
  const secret = process.env.WS_SECRET_KEY;
  const data = `${token}:${deviceId}:${timestamp}`;
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * WebSocket认证处理器
 */
class WSAuthHandler {
  async authenticate(request: WSAuthRequest): Promise<WSAuthResponse> {
    const { token, deviceId, timestamp, signature } = request.payload;
    
    // 验证时间戳（防止重放攻击）
    const now = Date.now();
    if (Math.abs(now - timestamp) > 30000) {
      return {
        type: 'AUTH_FAILED',
        payload: {
          sessionId: '',
          userId: '',
          expireTime: 0,
          permissions: []
        }
      };
    }
    
    // 验证签名
    const expectedSignature = generateAuthSignature(token, deviceId, timestamp);
    if (signature !== expectedSignature) {
      return {
        type: 'AUTH_FAILED',
        payload: {
          sessionId: '',
          userId: '',
          expireTime: 0,
          permissions: []
        }
      };
    }
    
    // 验证JWT令牌
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      return {
        type: 'AUTH_SUCCESS',
        payload: {
          sessionId: generateSessionId(),
          userId: decoded.userId,
          expireTime: decoded.exp * 1000,
          permissions: decoded.permissions || []
        }
      };
    } catch (error) {
      return {
        type: 'AUTH_FAILED',
        payload: {
          sessionId: '',
          userId: '',
          expireTime: 0,
          permissions: []
        }
      };
    }
  }
}
```

##### 3.2.3 连接心跳

**心跳机制**

```typescript
/**
 * WebSocket心跳保活
 * @description 定期发送心跳包保持连接活跃
 */
interface HeartbeatMessage {
  type: 'PING' | 'PONG';
  payload: {
    timestamp: number;
    sequence: number;
  };
}

/**
 * 心跳管理器
 */
class HeartbeatManager {
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private heartbeatTimeout: NodeJS.Timeout | null = null;
  private sequence = 0;
  private readonly HEARTBEAT_INTERVAL = 30000; // 30秒
  private readonly HEARTBEAT_TIMEOUT = 10000; // 10秒
  
  constructor(private ws: WebSocket) {}
  
  /**
   * 启动心跳
   */
  start() {
    this.heartbeatInterval = setInterval(() => {
      this.sendPing();
    }, this.HEARTBEAT_INTERVAL);
  }
  
  /**
   * 发送心跳
   */
  private sendPing() {
    this.sequence++;
    const ping: HeartbeatMessage = {
      type: 'PING',
      payload: {
        timestamp: Date.now(),
        sequence: this.sequence
      }
    };
    
    this.ws.send(JSON.stringify(ping));
    
    // 设置超时检测
    this.heartbeatTimeout = setTimeout(() => {
      console.error('心跳超时，关闭连接');
      this.ws.close();
    }, this.HEARTBEAT_TIMEOUT);
  }
  
  /**
   * 处理心跳响应
   */
  handlePong(pong: HeartbeatMessage) {
    if (this.heartbeatTimeout) {
      clearTimeout(this.heartbeatTimeout);
    }
    
    const latency = Date.now() - pong.payload.timestamp;
    console.log(`心跳延迟: ${latency}ms`);
  }
  
  /**
   * 停止心跳
   */
  stop() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    
    if (this.heartbeatTimeout) {
      clearTimeout(this.heartbeatTimeout);
      this.heartbeatTimeout = null;
    }
  }
}
```

##### 3.2.4 断线重连

**重连机制**

```typescript
/**
 * WebSocket断线重连
 * @description 自动重连机制，支持指数退避策略
 */
class ReconnectionManager {
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000;
  private maxReconnectDelay = 30000;
  private isReconnecting = false;
  
  constructor(
    private wsUrl: string,
    private onConnected: (ws: WebSocket) => void,
    private onDisconnected: () => void
  ) {}
  
  /**
   * 开始重连
   */
  startReconnect() {
    if (this.isReconnecting) {
      return;
    }
    
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('达到最大重连次数，停止重连');
      this.onDisconnected();
      return;
    }
    
    this.isReconnecting = true;
    this.reconnectAttempts++;
    
    const delay = Math.min(
      this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
      this.maxReconnectDelay
    );
    
    console.log(`${delay}ms后尝试第${this.reconnectAttempts}次重连...`);
    
    setTimeout(() => {
      this.connect();
    }, delay);
  }
  
  /**
   * 建立连接
   */
  private connect() {
    const ws = new WebSocket(this.wsUrl);
    
    ws.onopen = () => {
      console.log('重连成功');
      this.reconnectAttempts = 0;
      this.isReconnecting = false;
      this.onConnected(ws);
    };
    
    ws.onerror = (error) => {
      console.error('重连失败:', error);
      this.isReconnecting = false;
      this.startReconnect();
    };
    
    ws.onclose = () => {
      if (!this.isReconnecting) {
        this.startReconnect();
      }
    };
  }
  
  /**
   * 重置重连计数
   */
  reset() {
    this.reconnectAttempts = 0;
    this.isReconnecting = false;
  }
}
```

#### 3.3 消息类型

##### 3.3.1 消息格式

**统一消息格式**

```typescript
/**
 * WebSocket消息格式
 */
interface WSMessage {
  type: MessageType;
  messageId: string;
  timestamp: number;
  payload: any;
}

/**
 * 消息类型枚举
 */
enum MessageType {
  // 认证相关
  AUTH = 'AUTH',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAILED = 'AUTH_FAILED',
  
  // 心跳相关
  PING = 'PING',
  PONG = 'PONG',
  
  // 聊天相关
  CHAT_SEND = 'CHAT_SEND',
  CHAT_RECEIVE = 'CHAT_RECEIVE',
  CHAT_READ = 'CHAT_READ',
  CHAT_TYPING = 'CHAT_TYPING',
  
  // 通知相关
  NOTIFICATION = 'NOTIFICATION',
  NOTIFICATION_READ = 'NOTIFICATION_READ',
  
  // 订单相关
  ORDER_UPDATE = 'ORDER_UPDATE',
  
  // 物流相关
  SHIPPING_UPDATE = 'SHIPPING_UPDATE',
  
  // 在线状态
  ONLINE_STATUS = 'ONLINE_STATUS',
  
  // IoT设备
  IOT_DEVICE_STATUS = 'IOT_DEVICE_STATUS',
  IOT_DEVICE_CONTROL = 'IOT_DEVICE_CONTROL',
  
  // 错误
  ERROR = 'ERROR'
}
```

##### 3.3.2 聊天消息

**聊天消息格式**

```typescript
/**
 * 聊天消息
 */
interface ChatMessage {
  type: 'CHAT_SEND' | 'CHAT_RECEIVE';
  messageId: string;
  timestamp: number;
  payload: {
    conversationId: string;
    senderId: string;
    senderType: 'USER' | 'AI' | 'CUSTOMER_SERVICE';
    receiverId?: string;
    content: string;
    contentType: 'TEXT' | 'IMAGE' | 'AUDIO' | 'VIDEO';
    attachments?: Attachment[];
    replyTo?: string;
    metadata?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    };
  };
}

/**
 * 附件信息
 */
interface Attachment {
  id: string;
  type: 'IMAGE' | 'AUDIO' | 'VIDEO' | 'FILE';
  url: string;
  name: string;
  size: number;
  thumbnail?: string;
}

/**
 * 发送聊天消息
 */
function sendChatMessage(ws: WebSocket, message: ChatMessage) {
  ws.send(JSON.stringify(message));
}

/**
 * 接收聊天消息
 */
function handleChatMessage(message: ChatMessage) {
  const { conversationId, senderId, senderType, content, contentType } = message.payload;
  
  // 显示消息
  displayMessage(message);
  
  // 更新会话列表
  updateConversationList(conversationId, message);
  
  // 标记为已读
  markAsRead(message.messageId);
  
  // 播放提示音
  playNotificationSound();
}
```

##### 3.3.3 通知消息

**通知消息格式**

```typescript
/**
 * 通知消息
 */
interface NotificationMessage {
  type: 'NOTIFICATION';
  messageId: string;
  timestamp: number;
  payload: {
    notificationId: string;
    userId: string;
    type: 'ORDER' | 'SHIPPING' | 'SYSTEM' | 'PROMOTION' | 'AI';
    title: string;
    content: string;
    data?: {
      orderId?: string;
      shippingId?: string;
      productId?: string;
      actionUrl?: string;
    };
    priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
    read: boolean;
    createdAt: number;
  };
}

/**
 * 通知管理器
 */
class NotificationManager {
  private notifications: Map<string, NotificationMessage> = new Map();
  
  /**
   * 处理通知消息
   */
  handleNotification(message: NotificationMessage) {
    const { notificationId, type, title, content, priority } = message.payload;
    
    // 存储通知
    this.notifications.set(notificationId, message);
    
    // 显示通知
    this.showNotification(message);
    
    // 更新通知计数
    this.updateNotificationCount();
    
    // 根据优先级处理
    if (priority === 'URGENT' || priority === 'HIGH') {
      this.playAlertSound();
    }
  }
  
  /**
   * 显示通知
   */
  private showNotification(message: NotificationMessage) {
    const { title, content, data } = message.payload;
    
    // 显示系统通知
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body: content,
        icon: '/icon-192.png',
        data: data
      });
    }
    
    // 显示应用内通知
    showInAppNotification(message);
  }
  
  /**
   * 标记通知已读
   */
  markAsRead(notificationId: string) {
    const notification = this.notifications.get(notificationId);
    if (notification) {
      notification.payload.read = true;
      this.updateNotificationCount();
    }
  }
  
  /**
   * 获取未读通知数量
   */
  getUnreadCount(): number {
    let count = 0;
    this.notifications.forEach(notification => {
      if (!notification.payload.read) {
        count++;
      }
    });
    return count;
  }
}
```

##### 3.3.4 订单状态更新

**订单状态消息**

```typescript
/**
 * 订单状态更新消息
 */
interface OrderUpdateMessage {
  type: 'ORDER_UPDATE';
  messageId: string;
  timestamp: number;
  payload: {
    orderId: string;
    userId: string;
    status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
    statusText: string;
    updatedAt: number;
    metadata?: {
      trackingNumber?: string;
      shippingCarrier?: string;
      estimatedDelivery?: number;
    };
  };
}

/**
 * 订单状态管理器
 */
class OrderStatusManager {
  /**
   * 处理订单状态更新
   */
  handleOrderUpdate(message: OrderUpdateMessage) {
    const { orderId, status, statusText, metadata } = message.payload;
    
    // 更新本地订单状态
    updateLocalOrder(orderId, {
      status,
      statusText,
      updatedAt: message.payload.updatedAt,
      ...metadata
    });
    
    // 显示状态更新通知
    showOrderStatusNotification(message);
    
    // 刷新订单列表
    refreshOrderList();
    
    // 如果订单已发货，显示物流信息
    if (status === 'SHIPPED' && metadata?.trackingNumber) {
      showShippingInfo(orderId, metadata.trackingNumber);
    }
  }
  
  /**
   * 显示订单状态通知
   */
  private showOrderStatusNotification(message: OrderUpdateMessage) {
    const { orderId, statusText } = message.payload;
    
    showNotification({
      title: '订单状态更新',
      content: `订单 ${orderId} 已更新为：${statusText}`,
      type: 'ORDER',
      priority: 'NORMAL'
    });
  }
}
```

##### 3.3.5 物流状态更新

**物流状态消息**

```typescript
/**
 * 物流状态更新消息
 */
interface ShippingUpdateMessage {
  type: 'SHIPPING_UPDATE';
  messageId: string;
  timestamp: number;
  payload: {
    shippingId: string;
    orderId: string;
    userId: string;
    status: 'PENDING' | 'PICKED_UP' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'EXCEPTION';
    statusText: string;
    location?: {
      latitude: number;
      longitude: number;
      address: string;
    };
    estimatedDelivery?: number;
    trackingHistory: TrackingEvent[];
    updatedAt: number;
  };
}

/**
 * 物流事件
 */
interface TrackingEvent {
  time: number;
  status: string;
  location?: string;
  description: string;
}

/**
 * 物流状态管理器
 */
class ShippingStatusManager {
  /**
   * 处理物流状态更新
   */
  handleShippingUpdate(message: ShippingUpdateMessage) {
    const { shippingId, orderId, status, statusText, location, estimatedDelivery, trackingHistory } = message.payload;
    
    // 更新本地物流信息
    updateLocalShipping(shippingId, {
      status,
      statusText,
      location,
      estimatedDelivery,
      trackingHistory,
      updatedAt: message.payload.updatedAt
    });
    
    // 显示物流状态通知
    showShippingStatusNotification(message);
    
    // 如果有位置信息，更新地图
    if (location) {
      updateShippingMap(shippingId, location);
    }
    
    // 如果已送达，显示签收确认
    if (status === 'DELIVERED') {
      showDeliveryConfirmation(orderId);
    }
  }
  
  /**
   * 显示物流状态通知
   */
  private showShippingStatusNotification(message: ShippingUpdateMessage) {
    const { orderId, statusText, location } = message.payload;
    
    showNotification({
      title: '物流状态更新',
      content: `订单 ${orderId} ${statusText}${location ? ` - ${location.address}` : ''}`,
      type: 'SHIPPING',
      priority: 'NORMAL'
    });
  }
}
```

##### 3.3.6 在线状态

**在线状态消息**

```typescript
/**
 * 在线状态消息
 */
interface OnlineStatusMessage {
  type: 'ONLINE_STATUS';
  messageId: string;
  timestamp: number;
  payload: {
    userId: string;
    status: 'ONLINE' | 'OFFLINE' | 'AWAY' | 'BUSY';
    lastActive: number;
    deviceInfo?: {
      platform: string;
      version: string;
    };
  };
}

/**
 * 在线状态管理器
 */
class OnlineStatusManager {
  private onlineUsers: Map<string, OnlineStatusMessage> = new Map();
  
  /**
   * 处理在线状态更新
   */
  handleOnlineStatus(message: OnlineStatusMessage) {
    const { userId, status, lastActive } = message.payload;
    
    // 更新在线状态
    this.onlineUsers.set(userId, message);
    
    // 更新UI显示
    updateUserOnlineStatus(userId, status);
    
    // 如果是客服上线，显示提示
    if (status === 'ONLINE' && this.isCustomerService(userId)) {
      showCustomerServiceOnline(userId);
    }
  }
  
  /**
   * 获取用户在线状态
   */
  getUserStatus(userId: string): OnlineStatusMessage | undefined {
    return this.onlineUsers.get(userId);
  }
  
  /**
   * 获取所有在线用户
   */
  getOnlineUsers(): OnlineStatusMessage[] {
    return Array.from(this.onlineUsers.values()).filter(
      user => user.payload.status === 'ONLINE'
    );
  }
  
  /**
   * 检查是否为客服
   */
  private isCustomerService(userId: string): boolean {
    // 实现客服判断逻辑
    return userId.startsWith('cs_');
  }
}
```

##### 3.3.7 IoT设备状态

**IoT设备消息**

```typescript
/**
 * IoT设备状态消息
 */
interface IoTDeviceStatusMessage {
  type: 'IOT_DEVICE_STATUS';
  messageId: string;
  timestamp: number;
  payload: {
    deviceId: string;
    userId: string;
    deviceType: 'TOY' | 'Wearable' | 'Sensor' | 'Controller';
    status: 'ONLINE' | 'OFFLINE' | 'CONNECTING' | 'ERROR';
    battery?: number;
    signal?: number;
    data?: {
      temperature?: number;
      vibration?: number;
      pressure?: number;
      [key: string]: any;
    };
    lastActive: number;
  };
}

/**
 * IoT设备控制消息
 */
interface IoTDeviceControlMessage {
  type: 'IOT_DEVICE_CONTROL';
  messageId: string;
  timestamp: number;
  payload: {
    deviceId: string;
    userId: string;
    command: string;
    parameters?: {
      [key: string]: any;
    };
  };
}

/**
 * IoT设备管理器
 */
class IoTDeviceManager {
  private devices: Map<string, IoTDeviceStatusMessage> = new Map();
  
  /**
   * 处理设备状态更新
   */
  handleDeviceStatus(message: IoTDeviceStatusMessage) {
    const { deviceId, status, battery, signal, data } = message.payload;
    
    // 更新设备状态
    this.devices.set(deviceId, message);
    
    // 更新UI显示
    updateDeviceStatus(deviceId, status, battery, signal);
    
    // 如果有传感器数据，更新图表
    if (data) {
      updateDeviceData(deviceId, data);
    }
    
    // 如果设备离线，显示警告
    if (status === 'OFFLINE' || status === 'ERROR') {
      showDeviceOfflineWarning(deviceId);
    }
    
    // 如果电量低，显示警告
    if (battery !== undefined && battery < 20) {
      showLowBatteryWarning(deviceId, battery);
    }
  }
  
  /**
   * 控制设备
   */
  controlDevice(ws: WebSocket, message: IoTDeviceControlMessage) {
    ws.send(JSON.stringify(message));
  }
  
  /**
   * 获取设备状态
   */
  getDeviceStatus(deviceId: string): IoTDeviceStatusMessage | undefined {
    return this.devices.get(deviceId);
  }
  
  /**
   * 获取所有在线设备
   */
  getOnlineDevices(): IoTDeviceStatusMessage[] {
    return Array.from(this.devices.values()).filter(
      device => device.payload.status === 'ONLINE'
    );
  }
}
```

#### 3.4 消息安全

##### 3.4.1 消息加密

**端到端加密**

```typescript
/**
 * 消息加密
 * @description 使用AES-256-GCM对消息进行加密
 */
class MessageEncryptor {
  private algorithm = 'aes-256-gcm';
  
  /**
   * 生成密钥
   */
  async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256
      },
      true,
      ['encrypt', 'decrypt']
    );
  }
  
  /**
   * 加密消息
   */
  async encrypt(message: string, key: CryptoKey): Promise<EncryptedMessage> {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(message);
    
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encoded
    );
    
    return {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted)),
      authTag: Array.from(new Uint8Array(encrypted).slice(-16))
    };
  }
  
  /**
   * 解密消息
   */
  async decrypt(encrypted: EncryptedMessage, key: CryptoKey): Promise<string> {
    const iv = new Uint8Array(encrypted.iv);
    const data = new Uint8Array(encrypted.data);
    const authTag = new Uint8Array(encrypted.authTag);
    
    const combined = new Uint8Array(data.length + authTag.length);
    combined.set(data);
    combined.set(authTag, data.length);
    
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      combined
    );
    
    return new TextDecoder().decode(decrypted);
  }
}

/**
 * 加密消息格式
 */
interface EncryptedMessage {
  iv: number[];
  data: number[];
  authTag: number[];
}
```

##### 3.4.2 消息签名

**消息签名验证**

```typescript
/**
 * 消息签名
 * @description 使用HMAC-SHA256对消息进行签名
 */
class MessageSigner {
  /**
   * 生成签名
   */
  sign(message: WSMessage, secret: string): string {
    const messageStr = JSON.stringify(message);
    return crypto.createHmac('sha256', secret).update(messageStr).digest('hex');
  }
  
  /**
   * 验证签名
   */
  verify(message: WSMessage, signature: string, secret: string): boolean {
    const expectedSignature = this.sign(message, secret);
    return signature === expectedSignature;
  }
}
```

#### 3.5 消息持久化

##### 3.5.1 消息存储

**消息存储策略**

```typescript
/**
 * 消息存储
 * @description 将消息持久化到数据库
 */
interface StoredMessage {
  messageId: string;
  type: MessageType;
  senderId: string;
  receiverId?: string;
  conversationId?: string;
  content: string;
  contentType: string;
  encrypted: boolean;
  createdAt: Date;
  readAt?: Date;
  deliveredAt?: Date;
}

/**
 * 消息存储服务
 */
class MessageStorageService {
  /**
   * 存储消息
   */
  async storeMessage(message: WSMessage): Promise<void> {
    const storedMessage: StoredMessage = {
      messageId: message.messageId,
      type: message.type,
      senderId: message.payload.senderId,
      receiverId: message.payload.receiverId,
      conversationId: message.payload.conversationId,
      content: message.payload.content,
      contentType: message.payload.contentType,
      encrypted: true,
      createdAt: new Date(message.timestamp)
    };
    
    // 存储到数据库
    await this.db.messages.insert(storedMessage);
    
    // 存储到缓存（最近消息）
    await this.cache.set(
      `message:${message.messageId}`,
      storedMessage,
      3600
    );
  }
  
  /**
   * 获取会话消息
   */
  async getConversationMessages(conversationId: string, limit: number = 50, offset: number = 0): Promise<StoredMessage[]> {
    return await this.db.messages
      .find({ conversationId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();
  }
  
  /**
   * 标记消息已读
   */
  async markAsRead(messageId: string, userId: string): Promise<void> {
    await this.db.messages.update(
      { messageId },
      { $set: { readAt: new Date() } }
    );
    
    // 清除未读计数
    await this.clearUnreadCount(userId);
  }
}
```

##### 3.5.2 消息同步

**离线消息同步**

```typescript
/**
 * 消息同步服务
 */
class MessageSyncService {
  /**
   * 同步离线消息
   */
  async syncOfflineMessages(userId: string, lastSyncTime: number): Promise<WSMessage[]> {
    // 获取离线消息
    const messages = await this.getOfflineMessages(userId, lastSyncTime);
    
    // 标记消息已投递
    await this.markMessagesDelivered(messages.map(m => m.messageId));
    
    return messages;
  }
  
  /**
   * 获取离线消息
   */
  private async getOfflineMessages(userId: string, lastSyncTime: number): Promise<WSMessage[]> {
    return await this.db.messages.find({
      receiverId: userId,
      createdAt: { $gt: new Date(lastSyncTime) },
      deliveredAt: { $exists: false }
    }).toArray();
  }
  
  /**
   * 标记消息已投递
   */
  private async markMessagesDelivered(messageIds: string[]): Promise<void> {
    await this.db.messages.updateMany(
      { messageId: { $in: messageIds } },
      { $set: { deliveredAt: new Date() } }
    );
  }
}
```

#### 3.6 消息推送

##### 3.6.1 推送策略

**推送策略配置**

```typescript
/**
 * 推送策略
 */
interface PushStrategy {
  type: 'REALTIME' | 'BATCH' | 'DELAYED';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  channels: ('WEBSOCKET' | 'PUSH_NOTIFICATION' | 'EMAIL' | 'SMS')[];
  retry: {
    maxAttempts: number;
    interval: number;
  };
}

/**
 * 推送策略配置
 */
const PUSH_STRATEGIES: Record<string, PushStrategy> = {
  ORDER_UPDATE: {
    type: 'REALTIME',
    priority: 'HIGH',
    channels: ['WEBSOCKET', 'PUSH_NOTIFICATION'],
    retry: {
      maxAttempts: 3,
      interval: 5000
    }
  },
  SHIPPING_UPDATE: {
    type: 'REALTIME',
    priority: 'NORMAL',
    channels: ['WEBSOCKET', 'PUSH_NOTIFICATION'],
    retry: {
      maxAttempts: 3,
      interval: 5000
    }
  },
  CHAT_MESSAGE: {
    type: 'REALTIME',
    priority: 'NORMAL',
    channels: ['WEBSOCKET', 'PUSH_NOTIFICATION'],
    retry: {
      maxAttempts: 5,
      interval: 3000
    }
  },
  SYSTEM_NOTIFICATION: {
    type: 'BATCH',
    priority: 'LOW',
    channels: ['WEBSOCKET', 'PUSH_NOTIFICATION', 'EMAIL'],
    retry: {
      maxAttempts: 2,
      interval: 10000
    }
  },
  AI_RESPONSE: {
    type: 'REALTIME',
    priority: 'HIGH',
    channels: ['WEBSOCKET'],
    retry: {
      maxAttempts: 3,
      interval: 5000
    }
  }
};
```

##### 3.6.2 推送实现

**消息推送服务**

```typescript
/**
 * 消息推送服务
 */
class MessagePushService {
  private connectionManager: ConnectionManager;
  private pushNotificationService: PushNotificationService;
  
  /**
   * 推送消息
   */
  async pushMessage(userId: string, message: WSMessage, strategy: PushStrategy): Promise<void> {
    const connections = this.connectionManager.getUserConnections(userId);
    
    if (connections.length > 0 && strategy.channels.includes('WEBSOCKET')) {
      // WebSocket推送
      for (const connection of connections) {
        await this.pushToWebSocket(connection, message, strategy);
      }
    } else if (strategy.channels.includes('PUSH_NOTIFICATION')) {
      // 推送通知
      await this.pushNotificationService.send(userId, message);
    }
  }
  
  /**
   * 推送到WebSocket
   */
  private async pushToWebSocket(connection: WSConnection, message: WSMessage, strategy: PushStrategy): Promise<void> {
    let attempts = 0;
    const maxAttempts = strategy.retry.maxAttempts;
    const interval = strategy.retry.interval;
    
    while (attempts < maxAttempts) {
      try {
        connection.send(JSON.stringify(message));
        return;
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          console.error(`推送失败，已达到最大重试次数: ${message.messageId}`);
          throw error;
        }
        await this.sleep(interval);
      }
    }
  }
  
  /**
   * 延迟推送
   */
  async delayedPush(userId: string, message: WSMessage, delay: number): Promise<void> {
    setTimeout(async () => {
      await this.pushMessage(userId, message, PUSH_STRATEGIES.SYSTEM_NOTIFICATION);
    }, delay);
  }
  
  /**
   * 批量推送
   */
  async batchPush(userIds: string[], message: WSMessage, strategy: PushStrategy): Promise<void> {
    const batchSize = 100;
    
    for (let i = 0; i < userIds.length; i += batchSize) {
      const batch = userIds.slice(i, i + batchSize);
      await Promise.all(
        batch.map(userId => this.pushMessage(userId, message, strategy))
      );
    }
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

#### 3.7 性能优化

##### 3.7.1 消息压缩

**消息压缩**

```typescript
/**
 * 消息压缩器
 * @description 使用GZIP压缩大消息
 */
class MessageCompressor {
  /**
   * 压缩消息
   */
  async compress(message: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      zlib.gzip(message, (err, compressed) => {
        if (err) {
          reject(err);
        } else {
          resolve(compressed);
        }
      });
    });
  }
  
  /**
   * 解压消息
   */
  async decompress(compressed: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      zlib.gunzip(compressed, (err, decompressed) => {
        if (err) {
          reject(err);
        } else {
          resolve(decompressed.toString());
        }
      });
    });
  }
  
  /**
   * 判断是否需要压缩
   */
  shouldCompress(message: string): boolean {
    return Buffer.byteLength(message, 'utf8') > 1024; // 大于1KB则压缩
  }
}
```

##### 3.7.2 消息去重

**消息去重**

```typescript
/**
 * 消息去重器
 */
class MessageDeduplicator {
  private messageCache: Map<string, number> = new Map();
  private readonly CACHE_TTL = 60000; // 1分钟
  
  /**
   * 检查消息是否重复
   */
  isDuplicate(messageId: string): boolean {
    const timestamp = this.messageCache.get(messageId);
    if (!timestamp) {
      return false;
    }
    
    const now = Date.now();
    return (now - timestamp) < this.CACHE_TTL;
  }
  
  /**
   * 记录消息
   */
  recordMessage(messageId: string): void {
    this.messageCache.set(messageId, Date.now());
    
    // 清理过期记录
    this.cleanup();
  }
  
  /**
   * 清理过期记录
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [messageId, timestamp] of this.messageCache.entries()) {
      if ((now - timestamp) > this.CACHE_TTL) {
        this.messageCache.delete(messageId);
      }
    }
  }
}
```

#### 3.8 监控与日志

##### 3.8.1 连接监控

**连接监控指标**

```typescript
/**
 * 连接监控器
 */
class ConnectionMonitor {
  private metrics = {
    totalConnections: 0,
    activeConnections: 0,
    peakConnections: 0,
    messagesSent: 0,
    messagesReceived: 0,
    errors: 0
  };
  
  /**
   * 记录连接建立
   */
  recordConnection(): void {
    this.metrics.totalConnections++;
    this.metrics.activeConnections++;
    
    if (this.metrics.activeConnections > this.metrics.peakConnections) {
      this.metrics.peakConnections = this.metrics.activeConnections;
    }
  }
  
  /**
   * 记录连接关闭
   */
  recordDisconnection(): void {
    this.metrics.activeConnections--;
  }
  
  /**
   * 记录消息发送
   */
  recordMessageSent(): void {
    this.metrics.messagesSent++;
  }
  
  /**
   * 记录消息接收
   */
  recordMessageReceived(): void {
    this.metrics.messagesReceived++;
  }
  
  /**
   * 记录错误
   */
  recordError(): void {
    this.metrics.errors++;
  }
  
  /**
   * 获取指标
   */
  getMetrics() {
    return { ...this.metrics };
  }
}
```

##### 3.8.2 消息追踪

**消息追踪**

```typescript
/**
 * 消息追踪器
 */
class MessageTracer {
  /**
   * 追踪消息
   */
  trace(message: WSMessage, stage: string): void {
    const trace = {
      messageId: message.messageId,
      type: message.type,
      stage: stage,
      timestamp: Date.now(),
      userId: message.payload.userId
    };
    
    // 记录到日志
    console.log(`[MessageTrace] ${JSON.stringify(trace)}`);
    
    // 发送到监控系统
    this.sendToMonitoring(trace);
  }
  
  /**
   * 发送到监控系统
   */
  private sendToMonitoring(trace: any): void {
    // 实现发送到监控系统的逻辑
  }
}
```

### 4. 接口示例

#### 4.1 完整连接示例

```javascript
/**
 * WebSocket完整连接示例
 */
class HaiLanWebSocket {
  constructor(config) {
    this.config = config;
    this.ws = null;
    this.reconnectManager = null;
    this.heartbeatManager = null;
    this.messageHandlers = new Map();
  }
  
  /**
   * 连接
   */
  connect() {
    const wsUrl = `${this.config.wsUrl}?token=${this.config.token}&deviceId=${this.config.deviceId}&platform=${this.config.platform}&version=${this.config.version}`;
    
    this.ws = new WebSocket(wsUrl);
    
    this.ws.onopen = () => {
      console.log('WebSocket连接已建立');
      this.heartbeatManager = new HeartbeatManager(this.ws);
      this.heartbeatManager.start();
      this.reconnectManager?.reset();
    };
    
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket错误:', error);
    };
    
    this.ws.onclose = () => {
      console.log('WebSocket连接已关闭');
      this.heartbeatManager?.stop();
      this.reconnectManager?.startReconnect();
    };
    
    // 初始化重连管理器
    this.reconnectManager = new ReconnectionManager(
      wsUrl,
      (ws) => {
        this.ws = ws;
        this.setupEventHandlers();
      },
      () => {
        console.error('无法重连，请检查网络连接');
      }
    );
  }
  
  /**
   * 设置事件处理器
   */
  setupEventHandlers() {
    this.ws.onopen = () => {
      console.log('WebSocket连接已建立');
      this.heartbeatManager = new HeartbeatManager(this.ws);
      this.heartbeatManager.start();
      this.reconnectManager?.reset();
    };
    
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket错误:', error);
    };
    
    this.ws.onclose = () => {
      console.log('WebSocket连接已关闭');
      this.heartbeatManager?.stop();
      this.reconnectManager?.startReconnect();
    };
  }
  
  /**
   * 处理消息
   */
  handleMessage(message) {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
    }
  }
  
  /**
   * 注册消息处理器
   */
  on(messageType, handler) {
    this.messageHandlers.set(messageType, handler);
  }
  
  /**
   * 发送消息
   */
  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
  
  /**
   * 断开连接
   */
  disconnect() {
    this.heartbeatManager?.stop();
    this.reconnectManager?.reset();
    this.ws?.close();
  }
}

// 使用示例
const ws = new HaiLanWebSocket({
  wsUrl: 'wss://api.hailan-pro.com/ws/v1',
  token: 'your-jwt-token',
  deviceId: 'device-123',
  platform: 'web',
  version: '1.0.0'
});

// 注册消息处理器
ws.on('CHAT_RECEIVE', (message) => {
  console.log('收到聊天消息:', message);
  displayChatMessage(message);
});

ws.on('NOTIFICATION', (message) => {
  console.log('收到通知:', message);
  showNotification(message);
});

ws.on('ORDER_UPDATE', (message) => {
  console.log('订单状态更新:', message);
  updateOrderStatus(message);
});

// 连接
ws.connect();
```

#### 4.2 聊天示例

```javascript
/**
 * 发送聊天消息
 */
function sendChatMessage(conversationId, content) {
  const message = {
    type: 'CHAT_SEND',
    messageId: generateMessageId(),
    timestamp: Date.now(),
    payload: {
      conversationId: conversationId,
      senderId: 'user-123',
      senderType: 'USER',
      content: content,
      contentType: 'TEXT'
    }
  };
  
  ws.send(message);
}

/**
 * 接收聊天消息
 */
ws.on('CHAT_RECEIVE', (message) => {
  const { conversationId, senderId, senderType, content } = message.payload;
  
  // 显示消息
  displayMessage(message);
  
  // 标记已读
  markAsRead(message.messageId);
});

// 发送消息
sendChatMessage('conv-123', '你好，我想咨询一下产品信息');
```

#### 4.3 IoT设备控制示例

```javascript
/**
 * 控制IoT设备
 */
function controlDevice(deviceId, command, parameters = {}) {
  const message = {
    type: 'IOT_DEVICE_CONTROL',
    messageId: generateMessageId(),
    timestamp: Date.now(),
    payload: {
      deviceId: deviceId,
      userId: 'user-123',
      command: command,
      parameters: parameters
    }
  };
  
  ws.send(message);
}

// 监听设备状态
ws.on('IOT_DEVICE_STATUS', (message) => {
  const { deviceId, status, battery, data } = message.payload;
  
  console.log(`设备 ${deviceId} 状态: ${status}`);
  console.log(`电量: ${battery}%`);
  
  if (data) {
    console.log('传感器数据:', data);
  }
});

// 控制设备
controlDevice('device-456', 'VIBRATE', {
  intensity: 80,
  duration: 5000
});
```

### 5. 最佳实践

#### 5.1 连接管理

- **连接复用**：避免频繁创建和关闭连接
- **心跳保活**：定期发送心跳包保持连接活跃
- **断线重连**：实现自动重连机制，使用指数退避策略
- **连接池**：对于需要多连接的场景，使用连接池管理

#### 5.2 消息处理

- **消息去重**：避免重复处理相同消息
- **消息压缩**：对大消息进行压缩，减少传输数据量
- **消息加密**：对敏感消息进行加密传输
- **消息签名**：验证消息完整性和来源

#### 5.3 性能优化

- **批量处理**：对批量消息进行合并处理
- **异步处理**：使用异步方式处理消息，避免阻塞
- **缓存策略**：对频繁访问的数据进行缓存
- **限流控制**：控制消息发送频率，避免过载

#### 5.4 安全考虑

- **认证授权**：所有连接必须通过认证
- **数据加密**：敏感数据必须加密传输
- **输入验证**：验证所有输入数据，防止注入攻击
- **访问控制**：实现细粒度的访问控制

### 6. 故障处理

#### 6.1 常见问题

**连接失败**

- 检查网络连接
- 验证认证令牌是否有效
- 检查服务器状态
- 查看错误日志

**消息丢失**

- 检查网络稳定性
- 验证消息发送状态
- 实现消息确认机制
- 启用消息持久化

**性能问题**

- 监控连接数和消息量
- 优化消息处理逻辑
- 启用消息压缩
- 扩展服务器资源

#### 6.2 错误处理

```typescript
/**
 * 错误处理
 */
class ErrorHandler {
  /**
   * 处理WebSocket错误
   */
  handleWSError(error: Error): void {
    console.error('WebSocket错误:', error);
    
    // 记录错误日志
    this.logError(error);
    
    // 发送错误报告
    this.reportError(error);
    
    // 尝试恢复
    this.attemptRecovery();
  }
  
  /**
   * 记录错误日志
   */
  private logError(error: Error): void {
    // 实现错误日志记录
  }
  
  /**
   * 发送错误报告
   */
  private reportError(error: Error): void {
    // 实现错误报告发送
  }
  
  /**
   * 尝试恢复
   */
  private attemptRecovery(): void {
    // 实现恢复逻辑
  }
}
```

### 7. 附录

#### 7.1 错误码

| 错误码 | 说明 |
|--------|------|
| WS_001 | 连接认证失败 |
| WS_002 | 令牌过期 |
| WS_003 | 签名验证失败 |
| WS_004 | 消息格式错误 |
| WS_005 | 消息类型不支持 |
| WS_006 | 权限不足 |
| WS_007 | 连接超时 |
| WS_008 | 心跳超时 |
| WS_009 | 消息发送失败 |
| WS_010 | 消息接收失败 |

#### 7.2 配置参数

| 参数名 | 默认值 | 说明 |
|--------|--------|------|
| HEARTBEAT_INTERVAL | 30000 | 心跳间隔（毫秒） |
| HEARTBEAT_TIMEOUT | 10000 | 心跳超时（毫秒） |
| MAX_RECONNECT_ATTEMPTS | 10 | 最大重连次数 |
| RECONNECT_DELAY | 1000 | 重连延迟（毫秒） |
| MAX_RECONNECT_DELAY | 30000 | 最大重连延迟（毫秒） |
| MESSAGE_COMPRESSION_THRESHOLD | 1024 | 消息压缩阈值（字节） |
| MESSAGE_CACHE_TTL | 60000 | 消息缓存TTL（毫秒） |

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
