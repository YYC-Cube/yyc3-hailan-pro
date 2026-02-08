---
file: 058-Web-Bluetooth集成设计.md
description: HaiLan Pro 智能硬件设备通过Web Bluetooth API连接与控制的详细设计
author: YanYuCloudCube Team
version: v1.0.0
created: 2026-01-26
updated: 2026-01-26
status: published
tags:
  - HaiLan-Pro-详细设计,[]
---

> ***YanYuCloudCube***
> **标语**：言启象限 | 语枢未来
> ***Words Initiate Quadrants, Language Serves as Core for the Future***
> **标语**：万象归元于云枢 | 深栈智启新纪元
> ***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***

---

# 058 Web Bluetooth集成设计

## 概述

本文档详细描述HaiLan Pro-HaiLan-Pro-详细设计-Web Bluetooth集成设计相关内容，确保项目按照YYC³标准规范进行开发和实施。

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
- 规范Web Bluetooth集成设计相关的业务标准与技术落地要求
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

### 3. Web Bluetooth集成设计

#### 3.1 Web Bluetooth架构

##### 3.1.1 BLE设备通信架构

```typescript
// Web Bluetooth架构定义
interface WebBluetoothArchitecture {
  // 浏览器与BLE设备通信
  communication: {
    browser: {
      api: 'Web Bluetooth API';
      requirement: 'HTTPS环境';
      supportCheck: 'navigator.bluetooth'
    };
    device: {
      protocol: 'BLE (Bluetooth Low Energy)';
      version: 'BLE 4.0+';
      pairing: '配对后自动连接'
    };
    security: {
      encryption: 'AES-CCM';
      bonding: '设备绑定';
      authorization: '用户授权'
    };
  };

  // GATT (Generic Attribute Profile) 层级
  gatt: {
    device: 'BLE设备';
    services: '服务集合';
    characteristics: '特征值集合';
    descriptors: '描述符';
  };

  // 通信流程
  flow: [
    '1. 检查浏览器支持',
    '2. 请求设备扫描',
    '3. 选择设备连接',
    '4. 发现GATT服务',
    '5. 获取特征值',
    '6. 读写/通知数据',
    '7. 断开连接'
  ];
}
```

##### 3.1.2 支持的设备类型

```typescript
// 支持的IoT设备类型
interface SupportedIoTDevices {
  // 智能按摩设备
  massageDevices: {
    category: '按摩仪';
    examples: ['颈椎按摩仪', '足部按摩器', '眼部按摩仪'];
    services: {
      control: '按摩控制服务',
      status: '状态反馈服务',
      battery: '电池服务',
      deviceInfo: '设备信息服务'
    };
  };

  // 健康监测设备
  healthDevices: {
    category: '健康监测';
    examples: ['智能手环', '健康监测仪', '体脂秤'];
    services: {
      heartRate: '心率服务',
      bloodPressure: '血压服务',
      bodyComposition: '体组成服务',
      activity: '运动数据服务'
    };
  };

  // 智能玩具
  smartToys: {
    category: '智能硬件';
    examples: ['互动玩具', '控制设备'];
    services: {
      control: '控制服务',
      vibration: '振动模式服务',
      sensor: '传感器数据服务'
    };
  };
}
```

#### 3.2 设备连接实现

##### 3.2.1 蓝牙设备服务

```typescript
// Web Bluetooth服务实现
// src/core/services/bluetooth.service.ts
import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

@Injectable()
export class BluetoothService extends EventEmitter {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private characteristics: Map<string, BluetoothRemoteGATTCharacteristic> = new Map();

  /**
   * 检查浏览器支持
   */
  isSupported(): boolean {
    return 'bluetooth' in navigator;
  }

  /**
   * 扫描并连接设备
   */
  async connect(options: ConnectOptions): Promise<BluetoothDevice> {
    if (!this.isSupported()) {
      throw new Error('浏览器不支持Web Bluetooth API');
    }

    try {
      // 1. 请求设备
      this.device = await navigator.bluetooth.requestDevice({
        filters: options.filters || [],
        optionalServices: options.optionalServices || [],
        acceptAllDevices: options.acceptAllDevices || false
      });

      console.log('设备已选择:', this.device.name);

      // 2. 监听设备断开事件
      this.device.addEventListener('gattserverdisconnected', this.handleDisconnect.bind(this));

      // 3. 连接GATT服务器
      this.server = await this.device.gatt!.connect();
      console.log('GATT服务器已连接');

      // 4. 发现服务
      await this.discoverServices(options.services || []);

      // 5. 获取特征值
      await this.getCharacteristics(options.characteristics || []);

      this.emit('connected', this.device);
      return this.device;

    } catch (error) {
      console.error('设备连接失败:', error);
      throw error;
    }
  }

  /**
   * 断开设备连接
   */
  async disconnect(): Promise<void> {
    if (this.device && this.device.gatt?.connected) {
      await this.device.gatt.disconnect();
      this.device = null;
      this.server = null;
      this.characteristics.clear();
      this.emit('disconnected');
    }
  }

  /**
   * 发现服务
   */
  private async discoverServices(serviceUuids: string[]): Promise<void> {
    if (!this.server) {
      throw new Error('GATT服务器未连接');
    }

    const services = await this.server.getPrimaryServices();

    console.log('发现服务数量:', services.length);

    for (const service of services) {
      console.log('服务UUID:', service.uuid);
    }
  }

  /**
   * 获取特征值
   */
  private async getCharacteristics(characteristicConfigs: CharacteristicConfig[]): Promise<void> {
    for (const config of characteristicConfigs) {
      const service = await this.server!.getPrimaryService(config.service);
      const characteristic = await service.getCharacteristic(config.uuid);

      this.characteristics.set(config.name, characteristic);

      // 如果需要通知，启用通知
      if (config.notify) {
        await characteristic.startNotifications();
        characteristic.addEventListener('characteristicvaluechanged', (event: any) => {
          this.handleCharacteristicChanged(config.name, event.target.value);
        });
      }
    }
  }

  /**
   * 读取特征值
   */
  async readCharacteristic(name: string): Promise<DataView> {
    const characteristic = this.characteristics.get(name);
    if (!characteristic) {
      throw new Error(`特征值 ${name} 不存在`);
    }

    const value = await characteristic.readValue();
    return value;
  }

  /**
   * 写入特征值
   */
  async writeCharacteristic(name: string, value: BufferSource): Promise<void> {
    const characteristic = this.characteristics.get(name);
    if (!characteristic) {
      throw new Error(`特征值 ${name} 不存在`);
    }

    await characteristic.writeValue(value);
  }

  /**
   * 处理特征值变化
   */
  private handleCharacteristicChanged(name: string, value: DataView): void {
    this.emit('characteristicChanged', {
      characteristic: name,
      value: value,
      timestamp: Date.now()
    });
  }

  /**
   * 处理设备断开
   */
  private handleDisconnect(): void {
    console.log('设备已断开');
    this.emit('disconnected');
    this.device = null;
    this.server = null;
    this.characteristics.clear();
  }
}

// 类型定义
interface ConnectOptions {
  filters?: BluetoothLEScanFilter[];
  optionalServices?: string[];
  services?: string[];
  characteristics?: CharacteristicConfig[];
  acceptAllDevices?: boolean;
}

interface CharacteristicConfig {
  name: string;
  service: string;
  uuid: string;
  notify?: boolean;
}
```

##### 3.2.2 设备控制服务

```typescript
// IoT设备控制服务
// src/platforms/h5/services/iot-device.service.ts
import { Injectable } from '@angular/core';
import { BluetoothService } from './bluetooth.service';

@Injectable()
export class IoTDeviceService {
  constructor(private bluetooth: BluetoothService) {}

  /**
   * 连接按摩仪
   */
  async connectMassageDevice(): Promise<void> {
    await this.bluetooth.connect({
      filters: [{ namePrefix: 'HailanMassage' }],
      optionalServices: ['massage_service', 'battery_service', 'device_info'],
      services: ['massage_service', 'battery_service'],
      characteristics: [
        { name: 'control', service: 'massage_service', uuid: '0xA001', notify: true },
        { name: 'status', service: 'massage_service', uuid: '0xA002', notify: true },
        { name: 'battery', service: 'battery_service', uuid: '0xB001', notify: true }
      ]
    });
  }

  /**
   * 控制按摩仪
   */
  async controlMassage(options: MassageControlOptions): Promise<void> {
    const command = this.buildMassageCommand(options);
    await this.bluetooth.writeCharacteristic('control', command);
  }

  /**
   * 读取设备状态
   */
  async getDeviceStatus(): Promise<DeviceStatus> {
    const value = await this.bluetooth.readCharacteristic('status');
    return this.parseStatus(value);
  }

  /**
   * 读取电池电量
   */
  async getBatteryLevel(): Promise<number> {
    const value = await this.bluetooth.readCharacteristic('battery');
    return value.getUint8(0);
  }

  /**
   * 构建控制命令
   */
  private buildMassageCommand(options: MassageControlOptions): Uint8Array {
    const buffer = new ArrayBuffer(6);
    const view = new DataView(buffer);

    view.setUint8(0, 0xAA);      // 帧头
    view.setUint8(1, options.mode);    // 模式
    view.setUint8(2, options.level);   // 强度 0-10
    view.setUint16(3, options.duration); // 时长(分钟)
    view.setUint8(5, 0x55);      // 校验和

    return new Uint8Array(buffer);
  }

  /**
   * 解析设备状态
   */
  private parseStatus(value: DataView): DeviceStatus {
    return {
      power: value.getUint8(0) === 0x01,
      mode: value.getUint8(1),
      level: value.getUint8(2),
      duration: value.getUint16(3),
      temperature: value.getUint8(5) / 10
    };
  }
}

// 类型定义
interface MassageControlOptions {
  mode: number;      // 模式 0-5
  level: number;     // 强度 0-10
  duration: number;  // 时长(分钟)
}

interface DeviceStatus {
  power: boolean;
  mode: number;
  level: number;
  duration: number;
  temperature: number;
}
```

#### 3.3 设备控制界面

##### 3.3.1 设备列表页

```
┌─────────────────────────────────────────────────────────────────┐
│  ← 我的设备                                    [+ 添加设备]      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  已绑定设备 (2)                                                  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ┌─────────────────────────────────────────────────────┐   │  │
│  │  │ 📱 智能颈椎按摩仪 HL-001                           │   │  │
│  │  │                                                     │   │  │
│  │  │  电量: 85% | 状态: 已连接 | 信号: 强                 │   │  │
│  │  │                                                     │   │  │
│  │  │  [控制] [设置] [解绑]                              │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ┌─────────────────────────────────────────────────────┐   │  │
│  │  │ ⌚ 智能健康监测手环 HL-002                          │   │  │
│  │  │                                                     │   │  │
│  │  │  电量: 45% | 状态: 已连接 | 信号: 中                 │   │  │
│  │  │                                                     │   │  │
│  │  │  [数据] [设置] [解绑]                              │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  其他设备                                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ┌─────────────────────────────────────────────────────┐   │  │
│  │  │ 🔍 搜索附近的设备...                                │   │  │
│  │  │                                                     │   │  │
│  │  │  [开始扫描]                                         │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│  🏠 首页    📂 分类    🤖 AI助手    🛒 购物车    👤 我的       │
└─────────────────────────────────────────────────────────────────┘
```

##### 3.3.2 设备控制页

```
┌─────────────────────────────────────────────────────────────────┐
│  ← 智能颈椎按摩仪 HL-001                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  ⚡ 电量: 85%                                        │  │  │
│  │  │  连接状态: ● 已连接                                 │  │  │
│  │  │                                                     │  │  │
│  │  │  当前模式: 按摩模式                                  │  │  │
│  │  │  当前强度: 5档                                      │  │  │
│  │  │  剩余时间: 15分钟                                    │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  模式选择                                                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │  按摩    │ │ 敲打    │ │ 揉揉    │ │ 自动    │          │
│  │  模式     │ │ 模式     │ │ 模式     │ │ 模式     │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  强度调节                                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ─────────────────────────────────────────────────────── │  │
│  │  1        2        3        4        5                   │  │
│  │  ━━━━━━━━●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │  │
│  │  弱 ────────────────────────────────────────────── 强    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  定时设置                                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  时长: [15▼] 分钟                                         │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐              │  │  │
│  │  │  │  5  │  │ 10  │  │ 15  │  │ 20  │              │  │  │
│  │  │  │ 分  │  │ 分  │  │ 分  │  │ 分  │              │  │  │
│  │  │  └─────┘  └─────┘  └─────┘  └─────┘              │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  加热功能                                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ○ 开启加热  ● 关闭加热                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                                                  │
│  ┌───────────────┐  ┌───────────────┐                          │
│  │     暂停       │  │     启动       │                          │
│  └───────────────┘  └───────────────┘                          │
│                                                                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [定时预约]  [使用记录]  [设备设置]                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### 3.4 数据同步实现

##### 3.4.1 数据同步服务

```typescript
// 设备数据同步服务
// src/core/services/device-sync.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeviceSyncService {
  private syncQueue: SyncItem[] = [];

  /**
   * 添加同步任务
   */
  addSyncTask(deviceId: string, data: any): void {
    this.syncQueue.push({
      deviceId,
      data,
      timestamp: Date.now(),
      synced: false
    });
  }

  /**
   * 执行同步
   */
  async sync(): Promise<void> {
    const pendingItems = this.syncQueue.filter(item => !item.synced);

    for (const item of pendingItems) {
      try {
        await this.syncToDevice(item);
        await this.syncToCloud(item);
        item.synced = true;
      } catch (error) {
        console.error('同步失败:', error);
        item.retryCount = (item.retryCount || 0) + 1;
      }
    }

    // 清理已同步项目
    this.syncQueue = this.syncQueue.filter(item => !item.synced || item.retryCount < 3);
  }

  /**
   * 同步到设备
   */
  private async syncToDevice(item: SyncItem): Promise<void> {
    // 发送数据到设备
    const command = this.buildSyncCommand(item.data);
    await this.bluetooth.writeCharacteristic('sync', command);
  }

  /**
   * 同步到云端
   */
  private async syncToCloud(item: SyncItem): Promise<void> {
    const response = await fetch('/api/iot/device-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      },
      body: JSON.stringify({
        deviceId: item.deviceId,
        data: item.data,
        timestamp: item.timestamp
      })
    });

    if (!response.ok) {
      throw new Error('云端同步失败');
    }
  }
}

interface SyncItem {
  deviceId: string;
  data: any;
  timestamp: number;
  synced: boolean;
  retryCount?: number;
}
```

#### 3.5 兼容性处理

##### 3.5.1 浏览器兼容性

```typescript
// 浏览器兼容性检测
interface BluetoothCompatibility {
  // 支持的浏览器
  supported: {
    chrome: {
      version: '56+',
      status: '完全支持',
      features: ['scan', 'connect', 'notify', 'write']
    };
    edge: {
      version: '79+',
      status: '完全支持',
      features: ['scan', 'connect', 'notify', 'write']
    };
    opera: {
      version: '43+',
      status: '完全支持',
      features: ['scan', 'connect', 'notify', 'write']
    };
    firefox: {
      version: '部分支持',
      status: '需要开启标志',
      flags: 'dom.webbluetooth.enabled'
    };
    safari: {
      version: '不支持',
      status: '不支持',
      alternative: '使用原生App'
    };
  };

  // 功能降级
  fallback: {
    unsupported: {
      action: '提示用户使用支持的浏览器',
      message: '您的浏览器不支持Web Bluetooth，请使用Chrome/Edge/Opera浏览器'
    };
    noBluetooth: {
      action: '提供手动控制模式',
      features: ['手动选择设置', '保存配置到设备']
    };
  };
}

// 兼容性检测函数
export function checkBluetoothSupport(): BluetoothSupportResult {
  const isSupported = 'bluetooth' in navigator;

  if (!isSupported) {
    return {
      supported: false,
      message: getUnsupportedMessage(),
      alternative: getAlternativeMethod()
    };
  }

  // 检查具体功能支持
  const canScan = 'requestDevice' in (navigator as any).bluetooth;
  const canConnect = 'getAvailability' in navigator.bluetooth;

  return {
    supported: true,
    canScan,
    canConnect,
    recommendedBrowser: getRecommendedBrowser()
  };
}

function getUnsupportedMessage(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Safari') && !ua.includes('Chrome')) {
    return 'Safari暂不支持Web Bluetooth，请使用Chrome或Edge浏览器';
  }
  if (ua.includes('Firefox')) {
    return 'Firefox需要开启实验性功能，建议使用Chrome或Edge浏览器';
  }
  return '您的浏览器不支持Web Bluetooth，请使用Chrome或Edge浏览器';
}
```

---

## 附录

### A. BLE服务UUID列表

### B. 设备通信协议

### C. 错误处理机制

### D. 术语表

| 术语 | 说明 |
|-----|------|
| **BLE** | Bluetooth Low Energy，低功耗蓝牙 |
| **GATT** | Generic Attribute Profile，通用属性配置文件 |
| **UUID** | Universally Unique Identifier，通用唯一标识符 |

### E. 修订历史

| 版本 | 日期 | 修订人 | 修订内容 |
|-----|------|-------|---------|
| v1.0.0 | 2026-01-26 | YanYuCloudCube Team | 初始版本创建 |

---

> 「***YanYuCloudCube***」
> 「***<admin@0379.email>***」
> 「***Words Initiate Quadrants, Language Serves as Core for the Future***」
> 「***All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence***」
