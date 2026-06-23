<?php
/**
 * RSS 2.0 feed of published blog posts.
 * Serve at /sitemap.rss via a root .htaccess rewrite (optional).
 * Degrades to an empty (but valid) channel if the database is unavailable.
 */
ini_set('display_errors', '0');
require_once __DIR__ . '/../config.php';   // SITE_URL + DB_* constants

header('Content-Type: application/rss+xml; charset=utf-8');

$base = public_base_url();           // correct host even if env is missing

function post_link(string $base, string $slug): string {
    return $base . '/blog/post.html?slug=' . rawurlencode($slug);
}

$rows = [];
try {
    $dsn  = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
    $db   = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $rows = $db->query(
        "SELECT p.title, p.slug, p.excerpt, p.published_at, c.name AS category
         FROM posts p
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.status = 'published'
         ORDER BY p.published_at DESC
         LIMIT 50"
    )->fetchAll();
} catch (Throwable $e) {
    error_log('rss.php: DB unavailable — ' . $e->getMessage());
}

$lastBuild = !empty($rows[0]['published_at'])
    ? date('r', strtotime($rows[0]['published_at']))
    : date('r');

function cdata(string $s): string {
    return '<![CDATA[' . str_replace(']]>', ']]]]><![CDATA[>', $s) . ']]>';
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">' . "\n";
echo '  <channel>' . "\n";
echo '    <title>Supershyft Blog</title>' . "\n";
echo '    <link>' . htmlspecialchars($base . '/blog/', ENT_XML1) . '</link>' . "\n";
echo '    <atom:link href="' . htmlspecialchars($base . '/sitemap.rss', ENT_XML1) . '" rel="self" type="application/rss+xml" />' . "\n";
echo '    <description>Insights on precision nutrition, metabolic health, and Bio AI from Supershyft.</description>' . "\n";
echo '    <language>en</language>' . "\n";
echo '    <lastBuildDate>' . $lastBuild . '</lastBuildDate>' . "\n";

foreach ($rows as $r) {
    $link = post_link($base, $r['slug']);
    echo '    <item>' . "\n";
    echo '      <title>' . cdata($r['title'] ?? '') . '</title>' . "\n";
    echo '      <link>' . htmlspecialchars($link, ENT_XML1) . '</link>' . "\n";
    echo '      <guid isPermaLink="true">' . htmlspecialchars($link, ENT_XML1) . '</guid>' . "\n";
    if (!empty($r['published_at'])) {
        echo '      <pubDate>' . date('r', strtotime($r['published_at'])) . '</pubDate>' . "\n";
    }
    if (!empty($r['category'])) {
        echo '      <category>' . cdata($r['category']) . '</category>' . "\n";
    }
    echo '      <description>' . cdata($r['excerpt'] ?? '') . '</description>' . "\n";
    echo '    </item>' . "\n";
}

echo '  </channel>' . "\n";
echo '</rss>' . "\n";
