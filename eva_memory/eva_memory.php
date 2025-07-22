<?php
header('Content-Type: application/json');

// ---- Sicherheit ----
$token = $_GET['token'] ?? '';
if ($token !== 'EVA12345') {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

$filename = __DIR__ . '/eva_memory.json';
if (!file_exists($filename)) {
    file_put_contents($filename, json_encode(['memory'=>[], 'todos'=>[], 'logs'=>[]], JSON_PRETTY_PRINT));
}

// ---- Daten einlesen ----
$data = json_decode(file_get_contents($filename), true);
if (!is_array($data)) $data = ['memory'=>[], 'todos'=>[], 'logs'=>[]];

$action = $_GET['action'] ?? '';

// ---- Read ----
if ($action === 'read') {
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit;
}

// ---- Write ----
if ($action === 'write') {
    $key = $_GET['key'] ?? '';
    $value = $_GET['value'] ?? '';
    if ($key !== '') {
        $data['memory'][$key] = $value;
        file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(['status' => 'ok', 'key' => $key, 'value' => $value]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Key fehlt']);
    }
    exit;
}

// ---- Sync (Memory & Todos speichern) ----
if ($action === 'sync') {
    $raw = file_get_contents('php://input');
    $input = json_decode($raw, true);
    if (is_array($input)) {
        file_put_contents($filename, json_encode($input, JSON_PRETTY_PRINT));
        echo json_encode(['status' => 'ok', 'message' => 'Data synced']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid JSON']);
    }
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Ungültige Aktion']);
