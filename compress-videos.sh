#!/bin/bash
# ------------------------------------------------------------------
# compress-videos.sh (v2 — con subcarpetas por categoría)
#
# Recorre TODA la carpeta "originals" (incluyendo subcarpetas como
# originals/bodas/, originals/social-media/, etc.), comprime los
# videos manteniendo la misma estructura de carpetas dentro de
# public/media, genera un poster por video, y copia las imágenes
# tal cual (no necesitan compresión de este tipo).
#
# CÓMO USARLO:
#   1. Mové tu carpeta actual public/media a una llamada "originals"
#      (un solo comando, ver instrucciones abajo — mantiene todas
#      las subcarpetas intactas)
#   2. Corré en Git Bash:  bash compress-videos.sh
#   3. public/media queda recreada, liviana, con la misma estructura
# ------------------------------------------------------------------

INPUT_DIR="./originals"
OUTPUT_DIR="./public/media"

if [ ! -d "$INPUT_DIR" ]; then
  echo "No encuentro la carpeta '$INPUT_DIR'."
  echo "Primero movés tu carpeta actual: mv public/media originals"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

video_count=0
image_count=0

# Recorre TODOS los archivos dentro de originals/, en cualquier subcarpeta
find "$INPUT_DIR" -type f | while read -r f; do
  # ruta relativa dentro de originals (ej: bodas/boda-1.mp4)
  rel="${f#$INPUT_DIR/}"
  rel_dir=$(dirname "$rel")
  filename=$(basename "$f")
  name="${filename%.*}"
  ext="${filename##*.}"
  ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

  out_subdir="$OUTPUT_DIR/$rel_dir"
  mkdir -p "$out_subdir"

  if [[ "$ext_lower" == "mp4" || "$ext_lower" == "mov" ]]; then
    out_video="$out_subdir/${name}.mp4"
    out_poster="$out_subdir/${name}-poster.jpg"

    echo "→ Comprimiendo: $rel"

    ffmpeg -y -nostdin -i "$f" \
      -vf "scale='min(1920,iw)':-2" \
      -c:v libx264 -crf 26 -preset slower \
      -c:a aac -b:a 128k \
      -movflags +faststart \
      "$out_video" -loglevel error -stats

    ffmpeg -y -nostdin -i "$f" -ss 00:00:01 -vframes 1 "$out_poster" -loglevel error

    original_size=$(du -h "$f" | cut -f1)
    new_size=$(du -h "$out_video" | cut -f1)
    echo "  Listo: $original_size → $new_size"
    echo ""

  elif [[ "$ext_lower" =~ ^(jpg|jpeg|png|webp)$ ]]; then
    echo "→ Copiando imagen: $rel"
    cp "$f" "$out_subdir/$filename"
  fi
done

echo ""
echo "Todo listo. Revisá public/media — misma estructura de carpetas, mucho más liviana."
echo "Recordá actualizar las rutas en categories.js si cambiaron los nombres de archivo."