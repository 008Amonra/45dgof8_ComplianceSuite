<?php
header('Content-Type: application/json');

$file = __DIR__ . '/eva_memory.json';

if (!file_exists($file)) {
    file_put_contents($file, json_encode([], JSON_PRETTY_PRINT));
}

$data = json_decode(file_get_contents($file), true);

$action = $_GET['action'] ?? '';
$key = $_GET['key'] ?? '';
$value = $_GET['value'] ?? '';

switch ($action) {
    case 'read':
        if ($key && isset($data[$key])) {
            echo json_encode([$key => $data[$key]]);
        } else {
            echo json_encode($data);
        }
        break;

    case 'write':
        if ($key && $value) {
            $data[$key] = $value;
            file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
            echo json_encode(['success' => true, 'updated' => [$key => $value]]);
        } else {
            echo json_encode(['error' => 'Missing key or value']);
        }
        break;

    default:
        echo json_encode(['info' => 'Use ?action=read or ?action=write&key=...&value=...']);
        break;
}
?>
