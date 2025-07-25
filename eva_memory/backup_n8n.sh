#!/bin/bash
# backup_n8n.sh – Erstellt Backups der n8n-Datenbank und pflegt Rotation

SECRETS="/home/jace/eva_memory/secrets.json"
BACKUP_DIR=$(jq -r '.backups.backup_path' $SECRETS)
N8N_CONTAINER=$(jq -r '.n8n.container_name' $SECRETS)
ROTATION_DAYS=$(jq -r '.backups.rotation_days' $SECRETS)

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="${BACKUP_DIR}/n8n_backup_${TIMESTAMP}.tar.gz"

mkdir -p "$BACKUP_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starte Backup..."

# Backup aus Docker-Container holen
docker exec $N8N_CONTAINER tar czf - /home/node/.n8n/database.sqlite > "$BACKUP_FILE"

if [[ $? -eq 0 ]]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup erfolgreich: $BACKUP_FILE"
  
  # Alte Backups löschen
  find "$BACKUP_DIR" -type f -mtime +$ROTATION_DAYS -delete
  
  # Update von secrets.json (lastBackup)
  jq --arg time "$(date '+%Y-%m-%d %H:%M:%S')" '.n8n.lastBackup = $time' $SECRETS > ${SECRETS}.tmp && mv ${SECRETS}.tmp $SECRETS
else
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] FEHLER beim Backup!"
fi

