#!/bin/bash
# Run from: /Users/lysyshaky/Documents/Projects/lyqx-website
set -e

IMG="images"
OPT="images/opt"

echo "Compressing hero images..."
cwebp -q 46 -alpha_q 38 -resize 480 0  "$IMG/bg-hero.png" -o "$IMG/bg-hero-480.webp"  -quiet
cwebp -q 48 -alpha_q 42 -resize 768 0  "$IMG/bg-hero.png" -o "$IMG/bg-hero-768.webp"  -quiet
cwebp -q 50 -alpha_q 46 -resize 1100 0 "$IMG/bg-hero.png" -o "$IMG/bg-hero-1100.webp" -quiet

echo "Compressing project images..."
cwebp -q 38 -resize 700 0 "$OPT/../opt/si0GZfTzw.jpg"  -o "$OPT/si0GZfTzw.webp"  -quiet 2>/dev/null || \
cwebp -q 38 -resize 700 0 "$OPT/si0GZfTzw.webp"        -o "$OPT/si0GZfTzw.webp"  -quiet

cwebp -q 40              "$OPT/MSFjBSoFe.webp"  -o "$OPT/MSFjBSoFe.webp"  -quiet

echo "Sizes after:"
ls -lh "$IMG"/bg-hero-{480,768,1100}.webp "$OPT/si0GZfTzw.webp" "$OPT/MSFjBSoFe.webp"
