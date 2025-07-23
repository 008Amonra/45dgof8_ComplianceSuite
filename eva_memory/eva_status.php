<?php
header('Content-Type: application/json');

// Funktion, um einen Shell-Befehl sicher auszuführen
function runCommand($command) {
    $output = shell_exec($command);
    return trim($output);
}

// --- n8n Status ---
$n8nStatus = runCommand("docker ps --filter 'name=n8n' --format '{{.Status}}'");
$n8n = $n8nStatus ? "OK" : "Down";

// --- Cloudflared Status ---
$cloudStatus = runCommand("systemctl is-active cloudflared-n8n.service 2>/dev/null");
$cloudflared = ($cloudStatus === "active") ? "OK" : "Down";

// --- Ergebnis ---
$result = [
    "n8n" => $n8n,
    "cloudflared" => $cloudflared,
    "last_check" => date("Y-m-d H:i:s")
];

echo json_encode($result, JSON_PRETTY_PRINT);
