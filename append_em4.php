<?php
$secret = "1more_of_those_passwords!"; // <- Replace with your private key
if ($_POST['key'] !== $secret) {
    http_response_code(403);
    die("Unauthorized.");
}
$data = $_POST['entry'];
$timestamp = date("Y-m-d H:i:s");
$entry = "\n\n## Entry: $timestamp\n$data\n";
file_put_contents("em4.md", $entry, FILE_APPEND | LOCK_EX);
echo "Entry added.";
?>
