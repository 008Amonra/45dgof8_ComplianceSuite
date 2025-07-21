<?php
header('Content-Type: application/json');

$filename = __DIR__ . '/eva_memory.json';

// Falls die Datei fehlt, wird sie automatisch erstellt
if (!file_exists($filename)) {
    file_put_contents($filename, json_encode(new stdClass(), JSON_PRETTY_PRINT));
}

// Datei einlesen
$data = json_decode(file_get_contents($filename), true);
if (!is_array($data)) {
    $data = [];
}

$action = $_GET['action'] ?? '';

if ($action === 'read') {
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit;
}

if ($action === 'write') {
    $key = $_GET['key'] ?? '';
    $value = $_GET['value'] ?? '';
    if ($key !== '') {
        $data[$key] = $value;
        file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT));
        echo json_encode(['status' => 'ok', 'key' => $key, 'value' => $value]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Key fehlt']);
    }
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Ungültige Aktion']);

