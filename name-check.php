<?php
// name-check.php
$baseDir = __DIR__;
$correct = "45dgof8–DNS-Manager-GPT"; // EN DASH (U+2013)
$incorrect = "45dgof8 - DNS-Manager-GPT"; // regular hyphen with spaces
$files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($baseDir));
$results = [];

foreach ($files as $file) {
    if ($file->isFile() && preg_match('/\.(json|txt|sh|py|php)$/', $file->getFilename())) {
        $contents = file_get_contents($file->getPathname());
        $lineNum = 0;
        foreach (explode("\n", $contents) as $line) {
            $lineNum++;
            if (strpos($line, $correct) !== false || strpos($line, $incorrect) !== false) {
                $results[] = [
                    'file' => $file->getPathname(),
                    'line' => $lineNum,
                    'text' => trim($line)
                ];
            }
        }
    }
}

// Output as HTML
echo "<h2>🔍 45dgof8 Name Variant Scan</h2>";
if (count($results) === 0) {
    echo "<p>✅ No issues found. You're using consistent naming.</p>";
} else {
    echo "<p>⚠️ Found " . count($results) . " potential mismatches:</p>";
    echo "<ul>";
    foreach ($results as $hit) {
        echo "<li><strong>{$hit['file']}</strong> (Line {$hit['line']}):<br><code>{$hit['text']}</code></li>";
    }
    echo "</ul>";
}
?>
