<?php
/**
 * Dynamic XML sitemap — marketing pages + every published blog post.
 * Serve at /sitemap.xml via a root .htaccess rewrite (optional).
 *
 * Robust by design: the static marketing URLs are always emitted, so a
 * database outage degrades to a still-valid sitemap.
 */
ini_set('display_errors', '0');
require_once __DIR__ . '/../config.php';   // SITE_URL + DB_* constants

header('Content-Type: application/xml; charset=utf-8');

$base = public_base_url();                   // correct host even if env is missing

/* Stable marketing pages. */
$static = [
    ['/',                 '1.0', 'weekly'],
    ['/index.html',       '1.0', 'weekly'],
    ['/technology.html',  '0.9', 'monthly'],
    ['/our-story.html',   '0.8', 'monthly'],
    ['/contact-us.html',  '0.8', 'monthly'],
    ['/blog/',  '0.7', 'weekly'],
];

$urls = [];
foreach ($static as $s) {
    $urls[] = ['loc' => $base . $s[0], 'priority' => $s[1], 'changefreq' => $s[2], 'lastmod' => null];
}

function post_loc(string $base, string $slug): string {
    return $base . '/blog/post.html?slug=' . rawurlencode($slug);
}

/* Published posts from the database (if reachable). */
try {
    $dsn  = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
    $db   = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $rows = $db->query(
        "SELECT slug, published_at FROM posts WHERE status = 'published' ORDER BY published_at DESC"
    )->fetchAll();
    foreach ($rows as $r) {
        $urls[] = [
            'loc'        => post_loc($base, $r['slug']),
            'priority'   => '0.6',
            'changefreq' => 'monthly',
            'lastmod'    => !empty($r['published_at']) ? date('Y-m-d', strtotime($r['published_at'])) : null,
        ];
    }
} catch (Throwable $e) {
    error_log('sitemap.php: DB unavailable — ' . $e->getMessage());
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $u) {
    echo '  <url><loc>' . htmlspecialchars($u['loc'], ENT_XML1) . '</loc>';
    if (!empty($u['lastmod'])) echo '<lastmod>' . $u['lastmod'] . '</lastmod>';
    echo '<changefreq>' . $u['changefreq'] . '</changefreq>';
    echo '<priority>' . $u['priority'] . '</priority></url>' . "\n";
}
echo '</urlset>' . "\n";
