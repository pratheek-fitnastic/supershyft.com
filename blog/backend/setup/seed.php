<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Supershyft Blog — Seed</title>
  <meta name="robots" content="noindex, nofollow"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@400;500&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Sora', sans-serif; background: #eef3f2; min-height: 100vh; display: flex; align-items: flex-start; justify-content: center; padding: 40px 24px; }
    .card { background: #fff; border-radius: 16px; padding: 44px 40px; max-width: 640px; width: 100%; box-shadow: 0 4px 24px rgba(11,44,42,.1); border: 1px solid #dbe7e4; }
    .logo { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 1rem; color: #0b2c2a; margin-bottom: 28px; display: flex; align-items: center; gap: 8px; }
    .logo-dot { width: 8px; height: 8px; border-radius: 50%; background: #cc203b; flex-shrink: 0; }
    h1 { font-family: 'DM Sans', sans-serif; font-size: 1.4rem; color: #0b2c2a; margin-bottom: 8px; font-weight: 600; }
    p  { color: #6b7d79; font-size: .9rem; margin-bottom: 24px; line-height: 1.7; }
    .step { display: flex; gap: 14px; margin-bottom: 10px; padding: 13px 16px; border-radius: 10px; background: #f4f7f6; border: 1px solid #dbe7e4; }
    .step-icon { width: 26px; height: 26px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: .82rem; flex-shrink: 0; }
    .ok  { background: #D1FAE5; color: #065F46; }
    .err { background: rgba(204,32,59,.1); color: #cc203b; }
    .skip { background: rgba(107,125,121,.12); color: #6b7d79; }
    .step-text strong { display: block; font-size: .86rem; color: #0b2c2a; margin-bottom: 2px; }
    .step-text span   { font-size: .78rem; color: #6b7d79; }
    .btn { display: inline-block; margin-top: 24px; padding: 12px 24px; background: linear-gradient(135deg, #ff4b65 0%, #cc203b 100%); color: #fff; border-radius: 10px; font-family: inherit; font-size: .9rem; font-weight: 600; text-decoration: none; transition: opacity .2s; }
    .btn:hover { opacity: .9; }
    .btn-outline { background: transparent; color: #0b2c2a; border: 1.5px solid #0b2c2a; margin-left: 10px; }
    .warn { background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 12px 16px; font-size: .82rem; color: #92400E; margin-top: 20px; }
  </style>
</head>
<body>
<?php
/* ── Bootstrap env ───────────────────────────────────────── */
$envFile = file_exists(__DIR__ . '/../.env.local')
    ? __DIR__ . '/../.env.local'
    : __DIR__ . '/../.env.production';

if (is_file($envFile)) {
    foreach (file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        if ($line[0] === '#' || !str_contains($line, '=')) continue;
        [$k, $v] = explode('=', $line, 2);
        $_ENV[trim($k)] = trim($v);
    }
}

$DB_HOST = $_ENV['DB_HOST'] ?? 'localhost';
$DB_NAME = $_ENV['DB_NAME'] ?? 'supershyft_blog';
$DB_USER = $_ENV['DB_USER'] ?? 'root';
$DB_PASS = $_ENV['DB_PASS'] ?? '';

$steps   = [];
$success = true;
$pdo     = null;

/* ── Step 1: Create database if missing ─────────────────── */
try {
    $root = new PDO(
        "mysql:host=$DB_HOST;charset=utf8mb4",
        $DB_USER, $DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $root->exec("CREATE DATABASE IF NOT EXISTS `$DB_NAME` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $steps[] = ['ok', 'Database ready', "`$DB_NAME` exists or was created"];
} catch (Throwable $e) {
    $steps[] = ['err', 'Create database', $e->getMessage()];
    $success = false;
}

/* ── Step 2: Connect + create tables ────────────────────── */
if ($success) {
    try {
        $pdo = new PDO(
            "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
            $DB_USER, $DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );

        $pdo->exec("CREATE TABLE IF NOT EXISTS categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            slug VARCHAR(100) NOT NULL UNIQUE,
            color VARCHAR(20) DEFAULT '#0b2c2a',
            sort_order INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

        $pdo->exec("CREATE TABLE IF NOT EXISTS posts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) NOT NULL UNIQUE,
            content LONGTEXT,
            excerpt TEXT,
            thumbnail_url VARCHAR(500),
            category_id INT DEFAULT NULL,
            author_name VARCHAR(100) DEFAULT 'The Supershyft Team',
            author_role VARCHAR(150),
            author_bio TEXT,
            status ENUM('draft','published') DEFAULT 'draft',
            meta_title VARCHAR(255),
            meta_description TEXT,
            tags TEXT,
            read_time INT DEFAULT 5,
            published_at DATETIME DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
            INDEX idx_slug (slug), INDEX idx_status (status), INDEX idx_pubat (published_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

        $steps[] = ['ok', 'Tables ready', 'posts, categories'];
    } catch (Throwable $e) {
        $steps[] = ['err', 'Create tables', $e->getMessage()];
        $success = false;
    }
}

/* ── Step 3: Categories ─────────────────────────────────── */
$catId = [];
if ($success) {
    $cats = [
        ['Precision Nutrition', 'precision-nutrition', '#cc203b', 1],
        ['Bio AI',              'bio-ai',              '#0f473f', 2],
        ['Metabolic Health',    'metabolic-health',    '#0f473f', 3],
        ['Lifestyle',           'lifestyle',           '#0f473f', 4],
        ['Research',            'research',            '#0f473f', 5],
    ];
    $ins = $pdo->prepare("INSERT IGNORE INTO categories (name,slug,color,sort_order) VALUES (?,?,?,?)");
    foreach ($cats as $c) $ins->execute($c);
    foreach ($pdo->query("SELECT id,name FROM categories") as $row) $catId[$row['name']] = (int)$row['id'];
    $steps[] = ['ok', 'Categories seeded', implode(', ', array_keys($catId))];
}

/* ── Step 4: Demo posts ─────────────────────────────────── */
if ($success) {
    $posts = [
        [
            'title'    => 'Precision Nutrition vs Personalized Nutrition',
            'slug'     => 'precision-vs-personalized-nutrition',
            'category' => 'Precision Nutrition',
            'excerpt'  => "What's the difference — and why it matters for your health journey. Two philosophies, one smarter way to eat.",
            'tags'     => 'Precision Nutrition, Personalized Nutrition, Bio AI',
            'content'  => '<p>If you’re exploring nutrition options through Supershyft you may wonder: what’s the difference between <strong>precision nutrition</strong> and <strong>personalized nutrition</strong>? While the terms are often used interchangeably, they represent different philosophies and methods.</p>'
                . '<h2>What is precision nutrition?</h2>'
                . '<p>Precision nutrition goes beyond broad dietary guidelines. It uses detailed biological data — blood biomarkers, hormones, lipids — to tailor guidance to your unique metabolic profile.</p>'
                . '<h2>What is personalized nutrition?</h2>'
                . '<p>Personalized nutrition tailors recommendations around your preferences, goals, and lifestyle. It often uses dietary history and habits, but relies less on in-depth biological measurements.</p>'
                . '<h2>How Supershyft blends both</h2>'
                . '<p>Supershyft is a hybrid model: precision for deep insights, personalization for real-life sustainability. Bio AI reads 88+ biomarkers, forecasts metabolic risk, and turns that into a plan you can actually live with.</p>',
        ],
        [
            'title'    => 'How Bio AI reads 88+ biomarkers to map your metabolism',
            'slug'     => 'bio-ai-reads-88-biomarkers',
            'category' => 'Bio AI',
            'excerpt'  => 'Inside the engine that turns a single blood test into a personalized, predictive picture of your metabolic health.',
            'tags'     => 'Bio AI, Biomarkers, Metabolism',
            'content'  => '<p>A single comprehensive blood test contains a surprising amount of signal. Supershyft’s Bio AI analyses 88+ biomarkers to build a predictive picture of your metabolism.</p>'
                . '<h2>From data to insight</h2>'
                . '<p>Algorithms assess risk across a dozen-plus metabolic conditions, then translate the findings into clear, actionable guidance.</p>',
        ],
        [
            'title'    => 'Metabolic risk forecasting: catching problems before they start',
            'slug'     => 'metabolic-risk-forecasting',
            'category' => 'Metabolic Health',
            'excerpt'  => 'Why predicting metabolic conditions years in advance is the most powerful lever in preventive health.',
            'tags'     => 'Metabolic Health, Prevention, Forecasting',
            'content'  => '<p>The most powerful moment in health is the one before a condition takes hold. Forecasting metabolic risk lets you act early — with food, movement, and habits — while change is still easy.</p>',
        ],
        [
            'title'    => 'Habits that stick: behavior change beyond the meal plan',
            'slug'     => 'habits-that-stick',
            'category' => 'Lifestyle',
            'excerpt'  => 'A precision plan only works if you follow it. Here is how Supershyft blends data with real-world coaching.',
            'tags'     => 'Lifestyle, Coaching, Behavior Change',
            'content'  => '<p>A perfect plan you don’t follow changes nothing. Supershyft pairs precision insight with human coaching and habit design so progress is sustainable.</p>',
        ],
        [
            'title'    => 'From biomarkers to action: building a plan around your data',
            'slug'     => 'biomarkers-to-action',
            'category' => 'Precision Nutrition',
            'excerpt'  => 'Translating biological insight into food, movement, and recovery decisions you can actually live with.',
            'tags'     => 'Precision Nutrition, Planning',
            'content'  => '<p>Insight only matters when it becomes action. Here’s how we turn your biomarker profile into specific, livable decisions about food, training, and recovery.</p>',
        ],
        [
            'title'    => 'Why 92% accuracy in metabolic assessment matters',
            'slug'     => 'why-92-percent-accuracy-matters',
            'category' => 'Research',
            'excerpt'  => 'Accuracy on a test set is the beginning of the conversation, not the end. What it takes to earn trust in health AI.',
            'tags'     => 'Research, Accuracy, Trust',
            'content'  => '<p>Reported accuracy is only meaningful with the right population, validation, and calibration. We unpack what 92% really means — and why trust in health AI is earned, not claimed.</p>',
        ],
    ];

    $stmt = $pdo->prepare("INSERT INTO posts
        (title, slug, content, excerpt, category_id, author_name, status, meta_title, meta_description, tags, read_time, published_at)
        VALUES (:title,:slug,:content,:excerpt,:cat,:author,'published',:mtitle,:mdesc,:tags,:rt,:pub)
        ON DUPLICATE KEY UPDATE title=VALUES(title)");

    $added = 0; $skipped = 0; $day = 0;
    foreach ($posts as $p) {
        $exists = $pdo->prepare("SELECT id FROM posts WHERE slug=?");
        $exists->execute([$p['slug']]);
        if ($exists->fetchColumn()) { $skipped++; continue; }

        $words = str_word_count(strip_tags($p['content']));
        $stmt->execute([
            ':title'  => $p['title'],
            ':slug'   => $p['slug'],
            ':content'=> $p['content'],
            ':excerpt'=> $p['excerpt'],
            ':cat'    => $catId[$p['category']] ?? null,
            ':author' => 'The Supershyft Team',
            ':mtitle' => $p['title'] . ' | Supershyft',
            ':mdesc'  => $p['excerpt'],
            ':tags'   => $p['tags'],
            ':rt'     => max(1, (int)ceil($words / 200)),
            ':pub'    => date('Y-m-d H:i:s', strtotime("-{$day} days")),
        ]);
        $added++; $day += 12;
    }
    $steps[] = $added
        ? ['ok',   'Demo posts inserted', "$added added, $skipped already present"]
        : ['skip', 'Demo posts', "All already present ($skipped skipped)"];
}
?>

<div class="card">
  <div class="logo"><span class="logo-dot"></span> Supershyft Blog Seed</div>
  <h1><?= $success ? 'Seed complete.' : 'Seed failed.' ?></h1>
  <p><?= $success
    ? 'Your blog now has demo content. Open the blog or sign in to the admin panel.'
    : 'Check your .env database credentials and try again.' ?></p>

  <?php foreach ($steps as [$status, $title, $detail]): ?>
    <div class="step">
      <div class="step-icon <?= $status ?>"><?= $status === 'ok' ? '✓' : ($status === 'err' ? '✗' : '–') ?></div>
      <div class="step-text">
        <strong><?= htmlspecialchars($title) ?></strong>
        <span><?= htmlspecialchars($detail) ?></span>
      </div>
    </div>
  <?php endforeach; ?>

  <?php if ($success): ?>
    <a href="/blog/" class="btn">View the blog →</a>
    <a href="../admin/login.php" class="btn btn-outline">Admin Panel</a>
    <div class="warn"><strong>Security:</strong> Delete <code>setup/seed.php</code> and <code>setup/install.php</code> after seeding.</div>
  <?php else: ?>
    <a href="seed.php" class="btn">Retry</a>
  <?php endif; ?>
</div>

</body>
</html>
