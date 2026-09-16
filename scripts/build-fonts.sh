#!/usr/bin/env bash
#
# Regenerate the web fonts in `public/fonts/` from the original TTF in `fonts-src/`.
#
# Why: Mantou Sans is a ~2.7 MB CJK font. We ship two WOFF2 builds instead —
#   1. a tiny subset covering only the characters used in `src/`
#      (preloaded, so first paint needs ~12 KB instead of 2.7 MB), and
#   2. the full font as a lazy fallback (`unicode-range` on the subset makes the
#      browser fetch this one only when an uncovered character appears).
#
# Requires Python fontTools. One-time setup:
#   python3 -m venv .venv && .venv/bin/pip install "fonttools[woff]" brotli
#
# Usage (from the repo root):
#   ./scripts/build-fonts.sh
# Re-run it whenever the site copy changes so the subset keeps covering every glyph.
#
# Afterwards, paste the new `unicode-range` value that the script prints into
# `src/styles/global.css`.

set -euo pipefail

cd "$(dirname "$0")/.."

SRC="${1:-fonts-src/MantouSans-Regular.ttf}"
PYFTSUBSET="${PYFTSUBSET:-pyftsubset}"

[[ -f "$SRC" ]] || {
    echo "error: source font not found: $SRC" >&2
    echo "       put MantouSans-Regular.ttf in fonts-src/ (or pass a path as \$1)" >&2
    exit 1
}

command -v "$PYFTSUBSET" >/dev/null ||
    {
        echo "error: $PYFTSUBSET not found; install fontTools (see header)" >&2
        exit 1
    }

mkdir -p public/fonts fonts-src

# Collect every character that appears in the site source, so the subset covers it.
python3 - "$SRC" <<'PY'
import pathlib, sys

chars = {chr(c) for c in range(0x20, 0x7F)}  # printable ASCII
for path in pathlib.Path("src").rglob("*"):
    if path.is_file():
        try:
            chars.update(path.read_text(encoding="utf-8"))
        except (UnicodeDecodeError, OSError):
            pass

pathlib.Path("/tmp/mantou-chars.txt").write_text("".join(sorted(chars)), encoding="utf-8")
print(f"collected {len(chars)} characters from src/", file=sys.stderr)
PY

"$PYFTSUBSET" "$SRC" \
    --text-file=/tmp/mantou-chars.txt \
    --flavor=woff2 \
    --layout-features='*' \
    --no-hinting \
    --desubroutinize \
    --output-file=public/fonts/mantou-sans-subset.woff2

"$PYFTSUBSET" "$SRC" \
    --unicodes='*' \
    --flavor=woff2 \
    --layout-features='*' \
    --no-hinting \
    --desubroutinize \
    --output-file=public/fonts/mantou-sans.woff2

ls -lh public/fonts

# Emit the matching unicode-range for the subset. Copy the printed value into
# `src/styles/global.css` (otherwise the browser may download the fallback).
python3 - <<'PY'
try:
    from fontTools.ttLib import TTFont
except ImportError:  # pragma: no cover
    raise SystemExit

codepoints = sorted(TTFont("public/fonts/mantou-sans-subset.woff2").getBestCmap())
ranges, start, prev = [], None, None
for cp in codepoints:
    if start is None:
        start = prev = cp
    elif cp == prev + 1:
        prev = cp
    else:
        ranges.append((start, prev))
        start = prev = cp
ranges.append((start, prev))


def fmt(a, b):
    return f"U+{a:X}" if a == b else f"U+{a:X}-{b:X}"


print("\nunicode-range (paste into src/styles/global.css):")
print("    " + ", ".join(fmt(a, b) for a, b in ranges) + ";")
PY
