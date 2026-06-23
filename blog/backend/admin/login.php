<?php
require_once __DIR__ . '/../includes/auth.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $pass  = $_POST['password'] ?? '';
    if (attemptLogin($email, $pass)) {
        header('Location: dashboard.php');
        exit;
    }
    $error = 'Invalid email or password.';
}

if (isLoggedIn()) {
    header('Location: dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Admin Login — Supershyft Blog</title>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@400;500;600&display=swap" rel="stylesheet"/>
  <meta name="robots" content="noindex, nofollow"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Sora', sans-serif; background: #eef3f2; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .card { background: #fff; border-radius: 16px; padding: 44px 40px; width: 100%; max-width: 400px; box-shadow: 0 8px 40px rgba(11,44,42,.12); border: 1px solid #dbe7e4; }
    .logo { font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600; color: #0b2c2a; margin-bottom: 32px; display: flex; align-items: center; gap: 8px; }
    .logo-dot { width: 8px; height: 8px; border-radius: 50%; background: #cc203b; }
    h1 { font-family: 'DM Sans', sans-serif; font-size: 1.3rem; font-weight: 600; color: #0b2c2a; margin-bottom: 6px; }
    p  { font-size: .86rem; color: #6b7d79; margin-bottom: 28px; }
    .form-group { margin-bottom: 18px; }
    label { display: block; font-size: .78rem; font-weight: 600; color: #2c3835; margin-bottom: 7px; letter-spacing: .02em; }
    input[type=email], input[type=password] { width: 100%; padding: 11px 14px; font-family: inherit; font-size: .9rem; border: 1.5px solid #dbe7e4; border-radius: 10px; color: #0b2c2a; outline: none; transition: border-color .2s; }
    input:focus { border-color: #0b2c2a; }
    .btn { width: 100%; padding: 12px; background: linear-gradient(135deg, #ff4b65 0%, #cc203b 100%); color: #fff; border: none; border-radius: 10px; font-family: inherit; font-size: .9rem; font-weight: 600; cursor: pointer; margin-top: 6px; transition: opacity .2s; }
    .btn:hover { opacity: .9; }
    .error { background: #FEF2F2; border: 1px solid #FCA5A5; color: #991B1B; padding: 10px 14px; border-radius: 8px; font-size: .84rem; margin-bottom: 18px; }
    .back { display: block; text-align: center; margin-top: 20px; font-size: .82rem; color: #6b7d79; text-decoration: none; }
    .back:hover { color: #0b2c2a; }
  </style>
</head>
<body>
<div class="card">
  <div class="logo"><span class="logo-dot"></span> Supershyft Blog</div>
  <h1>Admin Login</h1>
  <p>Blog management panel</p>
  <?php if ($error): ?>
    <div class="error"><?= htmlspecialchars($error) ?></div>
  <?php endif; ?>
  <form method="POST" autocomplete="on">
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" id="email" name="email" required autofocus value="<?= htmlspecialchars($_POST['email'] ?? '') ?>" placeholder="admin@supershyft.com"/>
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required placeholder="••••••••"/>
    </div>
    <button type="submit" class="btn">Sign In →</button>
  </form>
  <a href="/" class="back">← Back to website</a>
</div>
</body>
</html>
