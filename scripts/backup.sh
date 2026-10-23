#!/usr/bin/env bash
# Sichert Datenbank und Bilder. Liegt nach dem Deploy in <DEPLOY_PATH>/backup.sh.
#
# Täglich per Cron-Job (Infomaniak Manager → Cron-Jobs), z. B. 03:15 Uhr:
#   cd <DEPLOY_PATH> && ./backup.sh daily
#
# Behält 14 Tage. Für echte Sicherheit zusätzlich ausser Haus kopieren
# (z. B. Infomaniak Swiss Backup oder kDrive).
set -euo pipefail

cd "$(dirname "$0")"
LABEL="${1:-manual}"
STAMP="$(date +%Y%m%d-%H%M%S)"
DB="shared/data/payload.db"
OUT="backups/$STAMP-$LABEL"

mkdir -p "$OUT"

if [ -f "$DB" ]; then
  if command -v sqlite3 >/dev/null 2>&1; then
    sqlite3 "$DB" ".backup '$OUT/payload.db'"   # konsistente Kopie im laufenden Betrieb
  else
    cp "$DB" "$OUT/payload.db"
  fi
fi

if [ -d shared/media ]; then
  tar -czf "$OUT/media.tar.gz" -C shared media
fi

echo "Backup erstellt: $OUT"

# Alte Backups aufräumen
find backups -mindepth 1 -maxdepth 1 -type d -mtime +14 -exec rm -rf {} +
