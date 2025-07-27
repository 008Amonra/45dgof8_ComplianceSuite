<?php
// =============================
// Eva Agent File API (for /eva_memory/)
// =============================

// --- CONFIG ---
$baseDir = __DIR__ . '/';  // This script will sit in /eva_memory/
$token = 'EVA12345';       // Security token

header('Content-Type: application/json');

// --- SECURITY CHECK ---
$reqToken = $_GET['token'] ?? '';
if ($reqToken !== $token) {
    echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
    exit;
}

// --- HELPER FUNCTIONS ---
function safePath($file) {
    global $baseDir;
    $file = basename($file); // Avoid directory traversal
    return $baseDir . $file;
}

// --- ACTIONS ---
$action = $_GET['action'] ?? '';

if ($action === 'list') {
    // List files in the baseDir
    $files = array_values(array_diff(scandir($baseDir), ['.', '..', 'agent_api.php']));
    echo json_encode(['status' => 'ok', 'files' => $files]);
    exit;
}

if ($action === 'read') {
    $file = $_GET['file'] ?? '';
    if ($file === '') {
        echo json_encode(['status' => 'error', 'message' => 'No file specified']);
        exit;
    }
    $path = safePath($file);
    if (!file_exists($path)) {
        echo json_encode(['status' => 'error', 'message' => 'File not found']);
        exit;
    }
    echo json_encode(['status' => 'ok', 'file' => $file, 'content' => file_get_contents($path)]);
    exit;
}

if ($action === 'write') {
    $file = $_GET['file'] ?? '';
    if ($file === '') {
        echo json_encode(['status' => 'error', 'message' => 'No file specified']);
        exit;
    }
    $path = safePath($file);
    $input = file_get_contents('php://input');
    if ($input === '') {
        echo json_encode(['status' => 'error', 'message' => 'No data to write']);
        exit;
    }
    file_put_contents($path, $input);
    echo json_encode(['status' => 'ok', 'message' => 'File saved', 'file' => $file]);
    exit;
}

if ($action === 'delete') {
    $file = $_GET['file'] ?? '';
    if ($file === '') {
        echo json_encode(['status' => 'error', 'message' => 'No file specified']);
        exit;
    }
    $path = safePath($file);
    if (!file_exists($path)) {
        echo json_encode(['status' => 'error', 'message' => 'File not found']);
        exit;
    }
    unlink($path);
    echo json_encode(['status' => 'ok', 'message' => 'File deleted', 'file' => $file]);
    exit;
}

// --- Backup Action ---
if ($action === 'backup') {
    $source = safePath('eva_memory.json');
    if (!file_exists($source)) {
        echo json_encode(['status' => 'error', 'message' => 'eva_memory.json not found']);
        exit;
    }
    $backupName = 'eva_memory_backup_' . date('Ymd_His') . '.json';
    $target = safePath($backupName);
    copy($source, $target);
    echo json_encode(['status' => 'ok', 'message' => 'Backup created', 'backup_file' => $backupName]);
    exit;
}

echo json_encode(['status' => 'error', 'message' => 'Unknown action']);
exit;
?>
