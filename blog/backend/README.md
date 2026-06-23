# Supershyft Blog — Backend

A small, dependency-free PHP + MySQL blog engine: REST-ish JSON API, an admin
panel (post editor with Quill + image upload), a contacts/CRM inbox, and
RSS/sitemap generators. Adapted from the CodimAI blog system and re-skinned for
Supershyft (DM Sans / DM Serif Text / Sora, green + rose palette).

## Front-end pages (live at site root)
- `blog/index.html` — listing page (search, category filters, pagination). Fetches
  `blog/backend/api/posts.php`; if the API is unreachable it falls back to a built-in
  static post list, so the page still renders on static hosting.
- `blog/post.html` — client-rendered single-post page; reads `?slug=`, fetches `backend/api/post.php`, falls back to a built-in sample post (works on static hosting).

## Requirements
- PHP 8.1+ (uses `never` return type, `str_contains`, enums in SQL)
- MySQL / MariaDB
- A PHP-capable host (e.g. Hostinger, cPanel, a VPS).
  **Note:** Firebase Hosting serves static files only and will not run the PHP
  backend. Deploy `blog/backend/` + `blog/post.html` to a PHP host, or point the
  blog at a subdomain that runs PHP. `blog/index.html` still works as a static
  page via its fallback list.

## Setup
1. Create a MySQL database and a user with access to it.
2. Copy `.env.example` to `.env.production` (or `.env.local` for dev) and fill in:
   - `DB_*` credentials
   - `SITE_URL` / `FRONTEND_URL` (e.g. `https://www.supershyft.com`)
   - `ADMIN_EMAIL` / `ADMIN_PASS` (these *are* the admin login — no users table)
   - `SMTP_*` + `CONTACT_TO` if you want contact-form emails
3. Visit `/blog/backend/setup/install.php` to create the tables + categories.
4. (Optional) Visit `/blog/backend/setup/seed.php` to insert demo posts.
5. Log in at `/blog/backend/admin/login.php`.
6. **Delete or protect** `setup/install.php` and `setup/seed.php` afterwards.

## API
| Endpoint | Method | Notes |
|---|---|---|
| `api/posts.php` | GET | list (`?status=&category=&search=&page=&limit=`) |
| `api/posts.php` | POST/PUT/DELETE | create/update/delete (admin session + CSRF) |
| `api/post.php?slug=` | GET | single post + related |
| `api/categories.php` | GET | category list |
| `api/upload.php` | POST | image upload (admin) |
| `api/contact.php` | POST | save a contact lead + email notification |
| `api/rss.php` | GET | RSS 2.0 feed |
| `api/sitemap.php` | GET | XML sitemap |

## Security notes
- `.env*` files and `includes/` are blocked by `.htaccess` (Apache). On Nginx,
  add equivalent rules to deny `.env*` and `/blog/backend/includes/`.
- Admin auth is a single email/password from the env file, with CSRF tokens on
  all mutating requests and a session cookie scoped `HttpOnly` + `SameSite=Strict`.
- Post content is trusted admin HTML (authored in the Quill editor).

## Categories
Precision Nutrition · Bio AI · Metabolic Health · Lifestyle · Research
(match the filter pills in `blog/index.html`).
