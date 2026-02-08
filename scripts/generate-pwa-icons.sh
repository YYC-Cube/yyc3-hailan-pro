#!/bin/bash

# PWA 图标生成脚本
# 自动生成所有需要的 PWA 图标尺寸

set -e

# 配置
SOURCE_ICON="${1:-./public/icon.png}"
OUTPUT_DIR="./public/icons"
SCREENSHOT_DIR="./public/screenshots"

# 颜色配置
PRIMARY_COLOR="#0056b3"
SECONDARY_COLOR="#9333EA"

# 图标尺寸列表
declare -a ICON_SIZES=(
    "72:72"
    "96:96"
    "128:128"
    "144:144"
    "152:152"
    "192:192"
    "384:384"
    "512:512"
)

# 快捷方式图标
declare -a SHORTCUT_ICONS=(
    "search:96"
    "order:96"
    "cart:96"
)

# 屏幕截图尺寸
declare -a SCREENSHOT_SIZES=(
    "1080:1920:narrow"
    "1920:1080:wide"
)

echo "🎨 PWA 图标生成工具"
echo "===================="

# 检查依赖
check_dependencies() {
    echo "📦 检查依赖..."
    
    if ! command -v convert &> /dev/null; then
        echo "❌ ImageMagick 未安装"
        echo "   macOS: brew install imagemagick"
        echo "   Ubuntu: sudo apt-get install imagemagick"
        exit 1
    fi
    
    if ! command -v optipng &> /dev/null; then
        echo "⚠️  optipng 未安装（可选，用于优化 PNG）"
        echo "   macOS: brew install optipng"
        echo "   Ubuntu: sudo apt-get install optipng"
    fi
    
    echo "✅ 依赖检查完成"
}

# 创建目录
create_directories() {
    echo "📁 创建输出目录..."
    mkdir -p "$OUTPUT_DIR"
    mkdir -p "$SCREENSHOT_DIR"
    echo "✅ 目录创建完成"
}

# 生成应用图标
generate_app_icons() {
    echo "🎯 生成应用图标..."
    
    if [ ! -f "$SOURCE_ICON" ]; then
        echo "❌ 源图标不存在: $SOURCE_ICON"
        exit 1
    fi
    
    for size_info in "${ICON_SIZES[@]}"; do
        IFS=':' read -r width height <<< "$size_info"
        output_file="$OUTPUT_DIR/icon-${width}x${height}.png"
        
        echo "   生成 ${width}x${height}..."
        convert "$SOURCE_ICON" \
            -resize "${width}x${height}" \
            -background transparent \
            -gravity center \
            -extent "${width}x${height}" \
            "$output_file"
        
        # 优化 PNG
        if command -v optipng &> /dev/null; then
            optipng -o2 -quiet "$output_file"
        fi
    done
    
    echo "✅ 应用图标生成完成"
}

# 生成快捷方式图标
generate_shortcut_icons() {
    echo "⚡ 生成快捷方式图标..."
    
    for icon_info in "${SHORTCUT_ICONS[@]}"; do
        IFS=':' read -r name size <<< "$icon_info"
        output_file="$OUTPUT_DIR/${name}-${size}x${size}.png"
        
        # 创建带背景的快捷方式图标
        convert "$SOURCE_ICON" \
            -resize "${size}x${size}" \
            -background "$PRIMARY_COLOR" \
            -gravity center \
            -extent "${size}x${size}" \
            "$output_file"
        
        # 添加图标标签（可选）
        if [ -f "./public/icons/${name}-label.png" ]; then
            convert "$output_file" \
                "./public/icons/${name}-label.png" \
                -gravity southeast \
                -composite "$output_file"
        fi
        
        # 优化 PNG
        if command -v optipng &> /dev/null; then
            optipng -o2 -quiet "$output_file"
        fi
        
        echo "   生成 ${name} 图标..."
    done
    
    echo "✅ 快捷方式图标生成完成"
}

# 生成 Favicon
generate_favicon() {
    echo "🌐 生成 Favicon..."
    
    # 生成 16x16 favicon
    convert "$SOURCE_ICON" \
        -resize 16x16 \
        -background transparent \
        -gravity center \
        -extent 16x16 \
        "$OUTPUT_DIR/favicon-16x16.png"
    
    # 生成 32x32 favicon
    convert "$SOURCE_ICON" \
        -resize 32x32 \
        -background transparent \
        -gravity center \
        -extent 32x32 \
        "$OUTPUT_DIR/favicon-32x32.png"
    
    # 生成 ICO 文件
    convert "$OUTPUT_DIR/favicon-16x16.png" \
            "$OUTPUT_DIR/favicon-32x32.png" \
            "$OUTPUT_DIR/favicon.ico"
    
    echo "✅ Favicon 生成完成"
}

# 生成启动屏幕
generate_splash_screens() {
    echo "📱 生成启动屏幕..."
    
    # iOS 启动屏幕
    for size in 1136 1334 2208 2436; do
        output_file="$OUTPUT_DIR/splash-${size}.png"
        convert "$SOURCE_ICON" \
            -resize "${size}x${size}" \
            -background "$PRIMARY_COLOR" \
            -gravity center \
            -extent "${size}x${size}" \
            "$output_file"
    done
    
    echo "✅ 启动屏幕生成完成"
}

# 生成掩码图标
generate_maskable_icons() {
    echo "🎭 生成掩码图标..."
    
    for size_info in "${ICON_SIZES[@]}"; do
        IFS=':' read -r width height <<< "$size_info"
        output_file="$OUTPUT_DIR/icon-maskable-${width}x${height}.png"
        
        # 创建圆形掩码
        convert "$SOURCE_ICON" \
            -resize "${width}x${height}" \
            \( -size "${width}x${height}" xc:transparent \
               -fill white \
               -draw "circle ${width}/2,${height}/2 ${width}/2,${height}/2" \) \
            -compose copy-in \
            -composite "$output_file"
        
        # 优化 PNG
        if command -v optipng &> /dev/null; then
            optipng -o2 -quiet "$output_file"
        fi
    done
    
    echo "✅ 掩码图标生成完成"
}

# 生成图标统计报告
generate_report() {
    echo ""
    echo "📊 生成报告"
    echo "===================="
    
    total_icons=$(find "$OUTPUT_DIR" -name "*.png" | wc -l)
    total_size=$(du -sh "$OUTPUT_DIR" | cut -f1)
    
    echo "生成的图标总数: $total_icons"
    echo "总大小: $total_size"
    echo ""
    echo "生成的图标文件:"
    ls -lh "$OUTPUT_DIR"/*.png 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}'
    
    # 生成 HTML 预览
    cat > "$OUTPUT_DIR/preview.html" << 'EOF'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PWA 图标预览</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            padding: 20px;
            margin: 0;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card img {
            max-width: 100%;
            height: auto;
            margin-bottom: 10px;
        }
        .card h3 {
            margin: 10px 0 5px;
            color: #333;
            font-size: 16px;
        }
        .card p {
            margin: 0;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <h1>PWA 图标预览</h1>
    <div class="grid" id="grid"></div>
    <script>
        const icons = [
            { name: 'icon-72x72.png', size: '72x72', type: '应用图标' },
            { name: 'icon-96x96.png', size: '96x96', type: '应用图标' },
            { name: 'icon-128x128.png', size: '128x128', type: '应用图标' },
            { name: 'icon-144x144.png', size: '144x144', type: '应用图标' },
            { name: 'icon-152x152.png', size: '152x152', type: '应用图标' },
            { name: 'icon-192x192.png', size: '192x192', type: '应用图标' },
            { name: 'icon-384x384.png', size: '384x384', type: '应用图标' },
            { name: 'icon-512x512.png', size: '512x512', type: '应用图标' },
            { name: 'search-96x96.png', size: '96x96', type: '快捷方式' },
            { name: 'order-96x96.png', size: '96x96', type: '快捷方式' },
            { name: 'cart-96x96.png', size: '96x96', type: '快捷方式' },
        ];
        
        const grid = document.getElementById('grid');
        icons.forEach(icon => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${icon.name}" alt="${icon.name}">
                <h3>${icon.name}</h3>
                <p>${icon.size} - ${icon.type}</p>
            `;
            grid.appendChild(card);
        });
    </script>
</body>
</html>
EOF
    
    echo ""
    echo "📄 预览页面: $OUTPUT_DIR/preview.html"
}

# 主函数
main() {
    check_dependencies
    create_directories
    
    if [ "$1" = "--all" ]; then
        generate_app_icons
        generate_shortcut_icons
        generate_favicon
        generate_splash_screens
        generate_maskable_icons
    elif [ "$1" = "--app" ]; then
        generate_app_icons
    elif [ "$1" = "--shortcuts" ]; then
        generate_shortcut_icons
    elif [ "$1" = "--favicon" ]; then
        generate_favicon
    elif [ "$1" = "--splash" ]; then
        generate_splash_screens
    elif [ "$1" = "--maskable" ]; then
        generate_maskable_icons
    else
        echo "用法: $0 [选项]"
        echo ""
        echo "选项:"
        echo "  --all        生成所有图标（默认）"
        echo "  --app        仅生成应用图标"
        echo "  --shortcuts  仅生成快捷方式图标"
        echo "  --favicon    仅生成 Favicon"
        echo "  --splash     仅生成启动屏幕"
        echo "  --maskable   仅生成掩码图标"
        echo ""
        echo "示例:"
        echo "  $0 --all"
        echo "  $0 --app"
        echo "  $0 ./custom-icon.png --all"
        exit 0
    fi
    
    generate_report
}

# 执行主函数
main "$@"
