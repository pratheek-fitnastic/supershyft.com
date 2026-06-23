
# Supershyft Blog — Setup & Integration Guide

The blog is a small PHP + MySQL app that lives at **`/blog/`** with a static
JavaScript fallback, so the listing and articles still render even when the PHP
backend is unavailable (e.g. pure static hosting).

```
blog/
├── index.html        # Listing: hero, search, category filters, grid, pagination
├── post.html         # Single article: SEO + JSON-LD, TOC, author bio, related, CTA
└── backend/          # PHP API + admin panel
    ├── config.php        # Reads .env.local / .env.production
    ├── api/              # posts.php, post.php, categories.php, upload.php, rss.php, sitemap.php, contact.php
    ├── admin/            # login, dashboard, editor, delete, contacts, logout
    ├── includes/         # db, auth, helpers, mailer
    ├── setup/            # install.php, seed.php  (DELETE after install)
    └── uploads/          # user-uploaded post images
```

---

## 1. Prerequisites

- PHP 8.1+ (uses `str_contains`, typed returns, `never`)
- MySQL / MariaDB
- Apache with `mod_rewrite` + `mod_alias` (Hostinger has both)

---

## 2. Configure environment

Copy the example env and fill in real values. **Local** uses `.env.local`,
**production** uses `.env.production` (config.php prefers `.env.local` if present).

```bash
cd blog/backend
cp .env.example .env.local      # local dev
# or: cp .env.example .env.production   # on the server
```

Key values:

| Var | Purpose |
|-----|---------|
| `DB_HOST/NAME/USER/PASS` | MySQL connection |
| `SITE_URL`, `FRONTEND_URL` | Absolute site URL; used for CORS, sitemap, RSS, upload URLs |
| `ADMIN_EMAIL`, `ADMIN_PASS` | Admin panel login |
| `SMTP_*`, `MAIL_FROM*`, `CONTACT_TO` | Contact-form email delivery (optional) |
| `DEBUG` | `true` only while debugging |

> `.env.local` / `.env.production` are git-ignored — never commit credentials.

---

## 3. Create tables & seed demo content

Run the two setup pages **once**, then delete them.

1. Open `https://<your-site>/blog/backend/setup/install.php`
   → creates the `posts` + `categories` tables and seeds the 5 categories.
2. Open `https://<your-site>/blog/backend/setup/seed.php`
   → inserts the 6 demo posts (same slugs the static fallback uses).
3. **Delete `setup/install.php` and `setup/seed.php`** (or block them) — they are
   destructive and must not stay public.

### Local dev without a web server

```bash
cd blog/backend       # so the API base resolves
php -S localhost:8000 -t ../..      # serve the whole site from repo root
# visit http://localhost:8000/blog/
```

---

## 4. Admin panel

- URL: `/blog/backend/admin/login.php`
- Credentials: `ADMIN_EMAIL` / `ADMIN_PASS` from the env file.
- From the dashboard you can create/edit/delete posts and view contact leads.
- A published post shows a "Published / Draft" edit chip in its hero that links
  straight to `editor.php?id=<id>` (visible because `post.php` returns the `id`).

---

## 5. How the frontend talks to the backend

- `index.html` → `GET backend/api/posts.php?status=published&limit=100`
- `post.html`  → `GET backend/api/post.php?slug=<slug>` (returns the post + `related[]`)
- If either request fails, both pages fall back to the in-file `SAMPLE_POSTS`,
  so the blog never shows a blank page. **Keep `SAMPLE_POSTS` in `index.html` and
  `post.html` in sync** (same slugs) so fallback links never 404.

---

## 6. Site integration (already wired)

Every page now links to the internal blog instead of the old external subdomain:

- Nav + footer "Blogs" links on `index.html`, `technology.html`, `our-story.html`,
  `contact-us.html`, and the shared `view/header.html` / `view/footer.html`
  → `href="blog/index.html"` (same tab). The old
  `https://blog.supershyft.com` (target=_blank) links were removed.
- The legacy `/blogs.html` page is now a redirect to `/blog/`
  (meta-refresh + JS, with `<link rel="canonical">` → `/blog/`).
- Root `.htaccess` issues a **301** `/blogs.html → /blog/` server-side and
  normalizes `/blog` → `/blog/`.

---

## 7. Deploy checklist (Hostinger)

- [ ] Upload the repo; ensure `.htaccess` (root) and `blog/backend/.htaccess` are present.
- [ ] Create `blog/backend/.env.production` with live DB + SMTP creds.
- [ ] Run `install.php` then `seed.php`, then **delete both**.
- [ ] Set `blog/backend/uploads/` writable (755).
- [ ] Change `ADMIN_PASS` from the default.
- [ ] Verify: `/blog/`, an article, `/blogs.html` (should 301 to `/blog/`),
      and `backend/api/sitemap.php` / `rss.php`.
