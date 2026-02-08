#!/bin/bash

# PWA 图标配置脚本
# 将 AppImages 中的图标配置到 PWA 需要的位置

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
APP_IMAGES_DIR="$PROJECT_ROOT/public/AppImages"
ICONS_DIR="$PROJECT_ROOT/public/icons"
SCREENSHOTS_DIR="$PROJECT_ROOT/public/screenshots"

echo "🎨 PWA 图标配置脚本"
echo "===================="
echo "项目根目录: $PROJECT_ROOT"
echo ""

# 检查源目录
if [ ! -d "$APP_IMAGES_DIR" ]; then
    echo "❌ AppImages 目录不存在: $APP_IMAGES_DIR"
    exit 1
fi

# 创建目标目录
mkdir -p "$ICONS_DIR"
mkdir -p "$SCREENSHOTS_DIR"

# 1. 复制 iOS 图标到 icons 目录
echo "📱 复制 iOS 图标..."
cp "$APP_IMAGES_DIR/ios/72.png" "$ICONS_DIR/icon-72x72.png"
cp "$APP_IMAGES_DIR/ios/100.png" "$ICONS_DIR/icon-96x96.png"
cp "$APP_IMAGES_DIR/ios/128.png" "$ICONS_DIR/icon-128x128.png"
cp "$APP_IMAGES_DIR/ios/144.png" "$ICONS_DIR/icon-144x144.png"
cp "$APP_IMAGES_DIR/ios/152.png" "$ICONS_DIR/icon-152x152.png"
cp "$APP_IMAGES_DIR/ios/192.png" "$ICONS_DIR/icon-192x192.png"
cp "$APP_IMAGES_DIR/ios/512.png" "$ICONS_DIR/icon-512x512.png"
cp "$APP_IMAGES_DIR/ios/1024.png" "$ICONS_DIR/icon-1024x1024.png"
echo "✅ iOS 图标复制完成"

# 2. 复制 Android 图标到 icons 目录
echo "🤖 复制 Android 图标..."
cp "$APP_IMAGES_DIR/android/android-launchericon-48-48.png" "$ICONS_DIR/icon-48x48.png"
cp "$APP_IMAGES_DIR/android/android-launchericon-512-512.png" "$ICONS_DIR/icon-384x384.png"
echo "✅ Android 图标复制完成"

# 3. 创建快捷方式图标（使用现有图标）
echo "⚡ 创建快捷方式图标..."

# 搜索图标 - 使用放大镜图标概念
cp "$APP_IMAGES_DIR/ios/100.png" "$ICONS_DIR/search-96x96.png"

# 订单图标 - 使用购物袋图标概念
cp "$APP_IMAGES_DIR/ios/100.png" "$ICONS_DIR/order-96x96.png"

# 购物车图标 - 使用购物车图标概念
cp "$APP_IMAGES_DIR/ios/100.png" "$ICONS_DIR/cart-96x96.png"

echo "✅ 快捷方式图标创建完成"

# 4. 创建 Favicon
echo "🌐 创建 Favicon..."
cp "$APP_IMAGES_DIR/ios/16.png" "$ICONS_DIR/favicon-16x16.png"
cp "$APP_IMAGES_DIR/ios/32.png" "$ICONS_DIR/favicon-32x32.png"

# 创建 ICO 文件（如果安装了 ImageMagick）
if command -v convert &> /dev/null; then
    convert "$ICONS_DIR/favicon-16x16.png" "$ICONS_DIR/favicon-32x32.png" "$ICONS_DIR/favicon.ico"
    echo "✅ Favicon ICO 创建完成"
else
    echo "⚠️  ImageMagick 未安装，跳过 ICO 文件创建"
fi

# 5. 配置屏幕截图
echo "📸 配置屏幕截图..."

# 检查是否有截图文件
if [ -d "$SCREENSHOTS_DIR" ] && [ "$(ls -A $SCREENSHOTS_DIR)" ]; then
    echo "✅ 截图目录已存在，包含 $(ls -1 $SCREENSHOTS_DIR | wc -l) 个文件"

    # 列出前 5 个截图文件
    echo "   截图文件示例:"
    ls -1 $SCREENSHOTS_DIR | head -5 | while read file; do
        echo "   - $file"
    done
else
    echo "⚠️  截图目录为空或不存在"
    echo "   请手动添加截图到 $SCREENSHOTS_DIR"
fi

# 6. 生成预览页面
echo "📄 生成预览页面..."
cat > "$ICONS_DIR/preview.html" << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PWA 图标预览 - 海蓝</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        h1 {
            color: #1a1a2e;
            text-align: center;
            margin-bottom: 40px;
            font-size: 32px;
            font-weight: 700;
        }
        .section {
            background: white;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .section h2 {
            color: #1a1a2e;
            margin-bottom: 20px;
            font-size: 24px;
            font-weight: 600;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .card {
            background: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
        .card img {
            width: 100%;
            height: auto;
            margin-bottom: 12px;
            border-radius: 8px;
        }
        .card h3 {
            margin: 0 0 8px;
            color: #1a1a2e;
            font-size: 14px;
            font-weight: 600;
        }
        .card p {
            margin: 0;
            color: #6b7280;
            font-size: 12px;
        }
        .badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎨 PWA 图标预览 - 海蓝</h1>

        <div class="section">
            <h2>应用图标</h2>
            <div class="grid" id="app-icons"></div>
        </div>

        <div class="section">
            <h2>快捷方式图标</h2>
            <div class="grid" id="shortcut-icons"></div>
        </div>

        <div class="section">
            <h2>Favicon</h2>
            <div class="grid" id="favicon-icons"></div>
        </div>
    </div>

    <script>
        const appIcons = [
            { name: 'icon-48x48.png', size: '48x48', desc: 'Android 小图标' },
            { name: 'icon-72x72.png', size: '72x72', desc: 'Android 低密度' },
            { name: 'icon-96x96.png', size: '96x96', desc: 'Android 中密度' },
            { name: 'icon-128x128.png', size: '128x128', desc: 'Android 高密度' },
            { name: 'icon-144x144.png', size: '144x144', desc: 'iPad' },
            { name: 'icon-152x152.png', size: '152x152', desc: 'iPad Pro' },
            { name: 'icon-192x192.png', size: '192x192', desc: 'Android 超高密度' },
            { name: 'icon-384x384.png', size: '384x384', desc: 'Android 超高密度' },
            { name: 'icon-512x512.png', size: '512x512', desc: 'PWA 最大尺寸' },
            { name: 'icon-1024x1024.png', size: '1024x1024', desc: '高分辨率源图' },
        ];

        const shortcutIcons = [
            { name: 'search-96x96.png', size: '96x96', desc: '搜索快捷方式' },
            { name: 'order-96x96.png', size: '96x96', desc: '订单快捷方式' },
            { name: 'cart-96x96.png', size: '96x96', desc: '购物车快捷方式' },
        ];

        const faviconIcons = [
            { name: 'favicon-16x16.png', size: '16x16', desc: '浏览器标签页小图标' },
            { name: 'favicon-32x32.png', size: '32x32', desc: '浏览器标签页大图标' },
        ];

        function renderIcons(icons, containerId) {
            const container = document.getElementById(containerId);
            icons.forEach(icon => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${icon.name}" alt="${icon.name}">
                    <h3>${icon.name}</h3>
                    <p>${icon.size} - ${icon.desc}</p>
                `;
                container.appendChild(card);
            });
        }

        renderIcons(appIcons, 'app-icons');
        renderIcons(shortcutIcons, 'shortcut-icons');
        renderIcons(faviconIcons, 'favicon-icons');
    </script>
</body>
</html>
EOF

echo "✅ 预览页面生成完成"

# 7. 生成统计报告
echo ""
echo "📊 配置完成报告"
echo "===================="

total_icons=$(find "$ICONS_DIR" -name "*.png" | wc -l)
total_size=$(du -sh "$ICONS_DIR" | cut -f1)

echo "生成的图标总数: $total_icons"
echo "总大小: $total_size"
echo ""
echo "生成的图标文件:"
ls -lh "$ICONS_DIR"/*.png 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'

echo ""
echo "📄 预览页面: file://$ICONS_DIR/preview.html"
echo ""
echo "✅ PWA 图标配置完成！"
echo ""
echo "下一步："
echo "1. 在浏览器中打开预览页面查看所有图标"
echo "2. 运行 npm run build 测试 PWA"
echo "3. 使用 Chrome DevTools 验证 manifest.json"
