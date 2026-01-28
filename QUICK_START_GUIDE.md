# 海蓝(HaiLan) 快速启动指南

> **版本**：v2.0 - 设计系统增强版  
> **更新日期**：2026-01-27  
> **适用人员**：开发者、设计师、产品经理

---

## 🚀 5分钟快速开始

### 1. 启动项目

```bash
# 安装依赖（首次运行）
npm install

# 启动开发服务器
npm run dev

# 访问应用
# 浏览器自动打开 http://localhost:5173
```

### 2. 查看新功能

访问演示页面查看第一阶段完成的所有新组件：

```
http://localhost:5173/design-system-demo
```

### 3. 立即使用

```tsx
// 导入新组件
import { Rating } from '@/app/components/ui/rating';
import { Stepper } from '@/app/components/ui/stepper';
import { PrivacyInput } from '@/app/components/ui/privacy-input';
import { StatusIndicator } from '@/app/components/ui/status-indicator';

// 使用组件
<Rating value={4.5} onChange={handleChange} />
<Stepper steps={steps} currentStep={1} />
<PrivacyInput privacyMode showPasswordStrength />
<StatusIndicator type="success">成功</StatusIndicator>
```

---

## 📚 新功能速览

### 🎨 Design Tokens（设计令牌）

**位置**：`/src/tokens/`

**包含**：
- `colors.json` - 颜色系统
- `spacing.json` - 间距系统
- `typography.json` - 字体系统
- `motion.json` - 动效系统

**快速使用**：
```tsx
// 在组件中使用Design Tokens
<div style={{ 
  color: 'var(--color-brand-primary)',
  padding: 'var(--spacing-4)',
  fontSize: 'var(--font-size-base)'
}}>
  使用Design Tokens
</div>
```

---

### ⚡ 动效系统

**位置**：`/src/styles/motion.css`

**快速使用**：
```tsx
// 过渡效果
<button className="transition-fast hover:bg-blue-600">
  快速过渡
</button>

// 动画效果
<div className="animate-fade-in">淡入动画</div>
<div className="animate-slide-in-up">滑入动画</div>
<div className="animate-shimmer">闪烁加载</div>
```

**可用动画**：
- `animate-fade-in` / `animate-fade-out` - 淡入淡出
- `animate-slide-in-up` / `animate-slide-in-down` - 滑入
- `animate-scale-in` / `animate-scale-out` - 缩放
- `animate-pulse` - 脉冲
- `animate-spin` - 旋转
- `animate-bounce` - 弹跳
- `animate-shake` - 摇晃
- `animate-shimmer` - 闪烁（骨架屏）
- `animate-blur-to-clean` - 隐私模糊切换

---

### ♿ 可访问性功能

**位置**：`/src/styles/accessibility.css`

**快速使用**：
```tsx
// 焦点环
<button className="focus-ring">
  自动焦点环按钮
</button>

// 屏幕阅读器文本
<span className="sr-only">
  仅屏幕阅读器可见的辅助文本
</span>

// 触摸目标（移动端友好）
<button className="touch-target">
  最小44x44px的按钮
</button>

// 跳过导航链接
<a href="#main-content" className="skip-link">
  跳转到主内容
</a>
```

---

### 🎯 新增组件

#### 1. Rating 评分组件 ⭐

```tsx
import { Rating, RatingDisplay } from '@/app/components/ui/rating';

// 可编辑评分
<Rating 
  value={4.5} 
  onChange={(value) => console.log(value)}
  showNumber
  size="lg"
/>

// 只读评分
<RatingDisplay value={4.5} size="sm" />

// 半星评分
<Rating value={3.5} allowHalf showNumber />
```

**特性**：
- ✅ 键盘导航（方向键、Home/End）
- ✅ ARIA标签完整
- ✅ 色盲友好
- ✅ 响应式大小

---

#### 2. Stepper 步骤指示器 📊

```tsx
import { Stepper, StepperProgress } from '@/app/components/ui/stepper';

// 水平步骤器
<Stepper
  steps={[
    { label: '选择商品', description: '浏览产品' },
    { label: '确认订单', description: '核对信息' },
    { label: '支付', description: '完成支付' },
  ]}
  currentStep={1}
  onStepClick={(step) => console.log(step)}
  clickable
  showDescription
/>

// 垂直步骤器
<Stepper
  steps={steps}
  currentStep={1}
  orientation="vertical"
/>

// 进度条样式
<StepperProgress current={2} total={5} />
```

**特性**：
- ✅ 水平/垂直方向
- ✅ 键盘导航
- ✅ 可点击步骤
- ✅ 移动端自适应

---

#### 3. PrivacyInput 隐私输入框 🔒

```tsx
import { PrivacyInput, PrivacySearchInput } from '@/app/components/ui/privacy-input';

// 隐私模式输入
<PrivacyInput
  privacyMode
  placeholder="输入敏感信息"
  privacyHint="您的信息将被加密存储"
/>

// 密码强度指示器
<PrivacyInput
  type="password"
  privacyMode
  showPasswordStrength
  placeholder="输入密码"
/>

// 隐私搜索框
<PrivacySearchInput
  privacyMode
  placeholder="搜索商品"
/>

// 错误状态
<PrivacyInput
  error="请输入有效的邮箱地址"
  placeholder="邮箱地址"
/>

// 成功状态
<PrivacyInput
  success="验证成功"
  placeholder="已验证邮箱"
/>
```

**特性**：
- ✅ 隐私模式指示
- ✅ 密码显示/隐藏
- ✅ 强度指示器（6级）
- ✅ 实时验证

---

#### 4. StatusIndicator 状态指示器 ✅

```tsx
import { StatusIndicator, Badge, Alert } from '@/app/components/ui/status-indicator';

// 状态指示器
<StatusIndicator type="success">订单已完成</StatusIndicator>
<StatusIndicator type="warning">等待支付</StatusIndicator>
<StatusIndicator type="error">支付失败</StatusIndicator>
<StatusIndicator type="info">物流已更新</StatusIndicator>
<StatusIndicator type="pending">审核中</StatusIndicator>
<StatusIndicator type="processing">处理中</StatusIndicator>

// 圆点样式
<StatusIndicator type="success" dot size="sm">在线</StatusIndicator>

// 徽章
<Badge variant="primary">主要</Badge>
<Badge variant="success">成功</Badge>
<Badge variant="primary" dot>新消息 5</Badge>

// 警告框
<Alert type="success" title="成功">
  操作已完成
</Alert>

<Alert type="warning" title="注意" closable>
  请在3天内完成支付
</Alert>

<Alert type="error" title="错误">
  操作失败，请重试
</Alert>
```

**特性**：
- ✅ 7种状态类型
- ✅ 颜色+图标双重指示（色盲友好）
- ✅ 3种尺寸
- ✅ ARIA标签完整

---

## 🎨 常见使用场景

### 场景1：注册/登录页面

```tsx
import { PrivacyInput } from '@/app/components/ui/privacy-input';
import { StatusIndicator } from '@/app/components/ui/status-indicator';

function RegisterPage() {
  return (
    <form className="space-y-4">
      {/* 邮箱输入 */}
      <PrivacyInput
        type="email"
        placeholder="邮箱地址"
        privacyHint="我们不会泄露您的邮箱"
      />
      
      {/* 密码输入（带强度指示） */}
      <PrivacyInput
        type="password"
        privacyMode
        showPasswordStrength
        placeholder="设置密码"
      />
      
      {/* 提交按钮 */}
      <button className="transition-fast hover:scale-105">
        注册
      </button>
      
      {/* 成功提示 */}
      <Alert type="success">注册成功！</Alert>
    </form>
  );
}
```

---

### 场景2：产品详情页

```tsx
import { Rating } from '@/app/components/ui/rating';
import { StatusIndicator } from '@/app/components/ui/status-indicator';

function ProductPage() {
  return (
    <div className="animate-fade-in">
      {/* 产品评分 */}
      <div className="mb-4">
        <RatingDisplay value={4.5} showNumber />
        <span className="text-sm text-text-secondary ml-2">
          (128条评价)
        </span>
      </div>
      
      {/* 库存状态 */}
      <StatusIndicator type="success" size="sm">
        现货供应
      </StatusIndicator>
      
      {/* 价格（使用数字字体） */}
      <div className="price-display text-3xl">
        ¥599
      </div>
    </div>
  );
}
```

---

### 场景3：结账流程

```tsx
import { Stepper } from '@/app/components/ui/stepper';
import { PrivacyInput } from '@/app/components/ui/privacy-input';

function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { label: '确认订单', description: '核对商品信息' },
    { label: '填写地址', description: '配送地址' },
    { label: '选择支付', description: '支付方式' },
    { label: '完成', description: '订单提交成功' },
  ];
  
  return (
    <div>
      {/* 步骤指示器 */}
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        clickable
      />
      
      {/* 隐私配送地址输入 */}
      {currentStep === 1 && (
        <PrivacyInput
          privacyMode
          placeholder="详细地址"
          privacyHint="地址信息加密传输"
        />
      )}
    </div>
  );
}
```

---

### 场景4：评价功能

```tsx
import { Rating } from '@/app/components/ui/rating';
import { Alert } from '@/app/components/ui/status-indicator';

function ReviewForm() {
  const [rating, setRating] = useState(0);
  
  return (
    <form className="space-y-6">
      {/* 评分 */}
      <div>
        <label className="block text-sm font-medium mb-2">
          商品评分
        </label>
        <Rating 
          value={rating}
          onChange={setRating}
          showNumber
          size="lg"
        />
      </div>
      
      {/* 提交成功提示 */}
      <Alert type="success" title="感谢您的评价">
        您的评价已提交，审核通过后将显示
      </Alert>
    </form>
  );
}
```

---

## 🎯 最佳实践

### 1. 使用动效系统

```tsx
// ✅ 好的做法 - 使用预定义的类
<button className="transition-fast hover:bg-blue-600">
  点击我
</button>

// ❌ 避免 - 手动写transition
<button style={{ transition: 'all 0.2s ease' }}>
  点击我
</button>
```

### 2. 使用可访问性功能

```tsx
// ✅ 好的做法 - 添加焦点环
<button className="focus-ring">
  可访问按钮
</button>

// ✅ 好的做法 - 屏幕阅读器文本
<button aria-label="删除商品">
  <TrashIcon />
  <span className="sr-only">删除</span>
</button>

// ❌ 避免 - 纯图标无说明
<button>
  <TrashIcon />
</button>
```

### 3. 使用状态指示

```tsx
// ✅ 好的做法 - 颜色+图标
<StatusIndicator type="success">
  操作成功
</StatusIndicator>

// ❌ 避免 - 仅用颜色
<span className="text-green-600">
  操作成功
</span>
```

### 4. 使用Design Tokens

```tsx
// ✅ 好的做法 - 使用CSS变量
<div className="text-[var(--color-brand-primary)]">
  品牌色文本
</div>

// ❌ 避免 - 硬编码颜色
<div className="text-[#0056b3]">
  蓝色文本
</div>
```

---

## 📖 更多资源

### 文档

- **综合审核报告**：`PROJECT_COMPREHENSIVE_AUDIT.md`
- **实施报告**：`DESIGN_SYSTEM_ENHANCEMENT_PHASE1.md`
- **完成总结**：`PHASE1_COMPLETION_SUMMARY.md`
- **当前状态**：`CURRENT_STATUS_REPORT.md`
- **交接文档**：`COMPLETION_HANDOVER.md`

### 演示

访问 `/design-system-demo` 查看所有组件的交互式演示

### 代码示例

查看演示页面源码：
```
/src/app/pages/demo/DesignSystemDemo.tsx
```

---

## 🐛 常见问题

### Q1: 如何导入新组件？

```tsx
// 从对应文件导入
import { Rating } from '@/app/components/ui/rating';
import { Stepper } from '@/app/components/ui/stepper';
import { PrivacyInput } from '@/app/components/ui/privacy-input';
import { StatusIndicator } from '@/app/components/ui/status-indicator';
```

### Q2: 动效不生效？

确保已导入动效CSS：
```tsx
// /src/styles/index.css 中应包含
@import './motion.css';
```

### Q3: 焦点环不显示？

确保已导入可访问性CSS：
```tsx
// /src/styles/index.css 中应包含
@import './accessibility.css';
```

### Q4: 如何自定义颜色？

编辑Design Tokens文件：
```json
// /src/tokens/colors.json
{
  "color": {
    "brand": {
      "primary": { "value": "#YOUR_COLOR" }
    }
  }
}
```

---

## ✅ 检查清单

开始使用前，请确认：

- [ ] 已安装依赖（`npm install`）
- [ ] 开发服务器正常运行（`npm run dev`）
- [ ] 可以访问演示页面（`/design-system-demo`）
- [ ] 已阅读相关文档
- [ ] 了解新组件的使用方法

---

## 🎉 开始创建！

现在您已经了解了所有新功能，可以开始在项目中使用它们了！

**建议**：
1. 先访问演示页面，熟悉各个组件
2. 阅读组件源码，了解实现细节
3. 在实际页面中逐步应用
4. 遇到问题查看文档或联系团队

祝您开发愉快！🚀

---

**YanYuCloudCube**  
**admin@0379.email**  
**Words Initiate Quadrants, Language Serves as Core for the Future**
