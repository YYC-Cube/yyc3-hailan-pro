#!/bin/bash

# PWA 截图配置脚本
# 从现有的截图文件中选择合适的文件并重命名

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SCREENSHOTS_DIR="$PROJECT_ROOT/public/screenshots"

echo "📸 PWA 截图配置脚本"
echo "===================="

# 检查截图目录
if [ ! -d "$SCREENSHOTS_DIR" ]; then
    echo "❌ 截图目录不存在: $SCREENSHOTS_DIR"
    exit 1
fi

# 统计截图数量
total_screenshots=$(ls -1 "$SCREENSHOTS_DIR"/*.png 2>/dev/null | wc -l)
echo "找到 $total_screenshots 个截图文件"

# 如果已经有正确的文件名，询问是否覆盖
if [ -f "$SCREENSHOTS_DIR/home.png" ] || [ -f "$SCREENSHOTS_DIR/product.png" ] || [ -f "$SCREENSHOTS_DIR/home-wide.png" ]; then
    echo "⚠️  已存在以下文件:"
    [ -f "$SCREENSHOTS_DIR/home.png" ] && echo "  - home.png"
    [ -f "$SCREENSHOTS_DIR/product.png" ] && echo "  - product.png"
    [ -f "$SCREENSHOTS_DIR/home-wide.png" ] && echo "  - home-wide.png"
    echo ""
    echo "将创建备份并覆盖现有文件"
fi

# 创建备份目录
BACKUP_DIR="$SCREENSHOTS_DIR/.backup"
mkdir -p "$BACKUP_DIR"

# 备份现有文件
if [ -f "$SCREENSHOTS_DIR/home.png" ]; then
    cp "$SCREENSHOTS_DIR/home.png" "$BACKUP_DIR/home.png"
fi
if [ -f "$SCREENSHOTS_DIR/product.png" ]; then
    cp "$SCREENSHOTS_DIR/product.png" "$BACKUP_DIR/product.png"
fi
if [ -f "$SCREENSHOTS_DIR/home-wide.png" ]; then
    cp "$SCREENSHOTS_DIR/home-wide.png" "$BACKUP_DIR/home-wide.png"
fi

# 选择首页截图（narrow - 1080x1920）
echo ""
echo "📱 选择首页截图（1080x1920）..."

# 查找第一个截图作为首页
first_screenshot=$(ls -1 "$SCREENSHOTS_DIR"/*.png 2>/dev/null | head -1)
if [ -n "$first_screenshot" ]; then
    cp "$first_screenshot" "$SCREENSHOTS_DIR/home.png"
    echo "✅ 首页截图: $(basename $first_screenshot)"
else
    echo "❌ 未找到合适的首页截图"
fi

# 选择商品详情截图（narrow - 1080x1920）
echo ""
echo "🛍️  选择商品详情截图（1080x1920）..."

# 查找第二个截图作为商品详情
second_screenshot=$(ls -1 "$SCREENSHOTS_DIR"/*.png 2>/dev/null | head -2 | tail -1)
if [ -n "$second_screenshot" ]; then
    cp "$second_screenshot" "$SCREENSHOTS_DIR/product.png"
    echo "✅ 商品详情截图: $(basename $second_screenshot)"
else
    echo "❌ 未找到合适的商品详情截图"
fi

# 选择桌面首页截图（wide - 1920x1080）
echo ""
echo "💻 选择桌面首页截图（1920x1080）..."

# 使用第一个截图作为桌面首页（假设是横向的）
# 如果没有横向截图，使用第一个截图
wide_screenshot=$(ls -1 "$SCREENSHOTS_DIR"/*.png 2>/dev/null | head -3 | tail -1)
if [ -n "$wide_screenshot" ]; then
    cp "$wide_screenshot" "$SCREENSHOTS_DIR/home-wide.png"
    echo "✅ 桌面首页截图: $(basename $wide_screenshot)"
else
    echo "❌ 未找到合适的桌面首页截图"
fi

# 生成截图信息
echo ""
echo "📊 截图配置完成报告"
echo "===================="

if [ -f "$SCREENSHOTS_DIR/home.png" ]; then
    size=$(file "$SCREENSHOTS_DIR/home.png" | grep -oP '\d+x\d+' || echo "未知")
    file_size=$(ls -lh "$SCREENSHOTS_DIR/home.png" | awk '{print $5}')
    echo "首页截图: home.png ($size, $file_size)"
fi

if [ -f "$SCREENSHOTS_DIR/product.png" ]; then
    size=$(file "$SCREENSHOTS_DIR/product.png" | grep -oP '\d+x\d+' || echo "未知")
    file_size=$(ls -lh "$SCREENSHOTS_DIR/product.png" | awk '{print $5}')
    echo "商品详情截图: product.png ($size, $file_size)"
fi

if [ -f "$SCREENSHOTS_DIR/home-wide.png" ]; then
    size=$(file "$SCREENSHOTS_DIR/home-wide.png" | grep -oP '\d+x\d+' || echo "未知")
    file_size=$(ls -lh "$SCREENSHOTS_DIR/home-wide.png" | awk '{print $5}')
    echo "桌面首页截图: home-wide.png ($size, $file_size)"
fi

echo ""
echo "📁 备份位置: $BACKUP_DIR"
echo ""
echo "✅ PWA 截图配置完成！"
echo ""
echo "提示："
echo "1. 如果截图不合适，可以从备份目录恢复"
echo "2. 可以手动选择更合适的截图文件"
echo "3. 建议使用专业的截图工具重新截图"
