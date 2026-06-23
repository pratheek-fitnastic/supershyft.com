<?php
require_once __DIR__ . '/../includes/helpers.php';
require_once __DIR__ . '/../includes/db.php';
require_once __DIR__ . '/../includes/mailer.php';

setCors();
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { jsonError('Method not allowed', 405); }

/* Honeypot — bots fill the website field */
if (!empty($_POST['website'])) { jsonOut(['success' => true]); }

$name     = trim($_POST['name']      ?? '');
$email    = trim($_POST['email']     ?? '');
$company  = trim($_POST['company']   ?? '');
$teamSize = trim($_POST['team_size'] ?? '');
$interest = trim($_POST['interest']  ?? '');
$message  = trim($_POST['message']   ?? '');

if (!$name)                          { jsonError('Name is required'); }
if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) { jsonError('Valid email is required'); }
if (!$interest)                      { jsonError('Please select an interest'); }

$db = getDb();

/* Ensure table exists (safe to call repeatedly) */
$db->exec("CREATE TABLE IF NOT EXISTS contacts (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(150)  NOT NULL,
    email      VARCHAR(255)  NOT NULL,
    company    VARCHAR(150)  DEFAULT '',
    team_size  VARCHAR(30)   DEFAULT '',
    interest   VARCHAR(100)  NOT NULL,
    message    TEXT,
    notes      TEXT,
    status     ENUM('new','in_progress','responded') NOT NULL DEFAULT 'new',
    created_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_email  (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

$stmt = $db->prepare(
    "INSERT INTO contacts (name, email, company, team_size, interest, message)
     VALUES (:name, :email, :company, :team_size, :interest, :message)"
);
$stmt->execute([
    ':name'      => $name,
    ':email'     => $email,
    ':company'   => $company,
    ':team_size' => $teamSize,
    ':interest'  => $interest,
    ':message'   => $message,
]);

/* ── Notify the team + acknowledge the sender ────────────────
   Best-effort: the lead is already saved, so a mail failure is
   logged but does not fail the request. */
$teamTo = CONTACT_TO !== '' ? CONTACT_TO : (SMTP_USER !== '' ? SMTP_USER : ADMIN_EMAIL);

$rows = [
    'Name'      => $name,
    'Email'     => $email,
    'Company'   => $company !== ''  ? $company  : '',
    'Team size' => $teamSize !== '' ? $teamSize : '',
    'Interest'  => $interest,
    'Message'   => $message !== ''  ? $message  : '',
];

$rowsHtml = '';
foreach ($rows as $label => $value) {
    $rowsHtml .=
        '<tr>'
        . '<td style="padding:8px 16px 8px 0;color:#6b7d79;font:13px/1.5 Arial,sans-serif;vertical-align:top;white-space:nowrap;">'
        . htmlspecialchars($label, ENT_QUOTES, 'UTF-8') . '</td>'
        . '<td style="padding:8px 0;color:#0b2c2a;font:14px/1.6 Arial,sans-serif;">'
        . nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8')) . '</td>'
        . '</tr>';
}

$teamHtml =
    '<div style="background:#f4f7f6;padding:32px;">'
    . '<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #dbe7e4;border-radius:10px;padding:32px;">'
    . '<p style="margin:0 0 4px;font:12px/1.4 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#cc203b;">New enquiry</p>'
    . '<h1 style="margin:0 0 24px;font:400 22px/1.3 Georgia,serif;color:#0b2c2a;">' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ' wants to talk.</h1>'
    . '<table style="width:100%;border-collapse:collapse;">' . $rowsHtml . '</table>'
    . '<p style="margin:24px 0 0;font:12px/1.5 Arial,sans-serif;color:#6b7d79;">Reply directly to this email to reach ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '.</p>'
    . '</div></div>';

sendMail(
    $teamTo, 'Supershyft',
    'New enquiry — ' . $interest . ' (' . $name . ')',
    $teamHtml, '',
    $email, $name              // Reply-To the submitter
);

/* Courtesy acknowledgement to the person who filled the form. */
$ackHtml =
    '<div style="background:#f4f7f6;padding:32px;">'
    . '<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #dbe7e4;border-radius:10px;padding:32px;">'
    . '<h1 style="margin:0 0 16px;font:400 22px/1.3 Georgia,serif;color:#0b2c2a;">Thank you, ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '.</h1>'
    . '<p style="margin:0 0 16px;font:15px/1.7 Arial,sans-serif;color:#3a4b47;">We’ve received your message. A member of the Supershyft team will be in touch within one business day.</p>'
    . '<p style="margin:0;font:15px/1.7 Arial,sans-serif;color:#3a4b47;">— The Supershyft Team</p>'
    . '</div></div>';

sendMail($email, $name, 'We received your message — Supershyft', $ackHtml);

jsonOut(['success' => true, 'message' => 'Thank you — we will be in touch shortly.']);
