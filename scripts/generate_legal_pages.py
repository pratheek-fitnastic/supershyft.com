# -*- coding: utf-8 -*-
"""Generate SuperShyft / CURA legal pages from structured HTML bodies."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HEADER = """  <header class="bs-header fixed-top" id="header">
    <nav id="navbar" class="navbar navbar-expand-md " aria-label="Offcanvas navbar large">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img class="img-fluid" src="assets/images/logo.png" alt="SuperShyft logo">
        </a>
        <button class="navbar-toggler px-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2"
          aria-controls="offcanvasNavbar2">
          <span class="icon icon-menu"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar2">
          <div class="offcanvas-header">
            <a class="navbar-brand" href="index.html"><img src="assets/images/logo.png" alt="SuperShyft logo" class="img-fluid"></a>
            <button type="button" class="btn-close " data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1">
              <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
              <li class="nav-item dropdown custom-dropdown"><a class="nav-link" href="technology.html">Our Tech</a></li>
              <li class="nav-item"><a class="nav-link" href="our-story.html">Our Story</a></li>
              <li class="nav-item"><a class="nav-link" href="gifting.html">Gifting</a></li>
              <li class="nav-item"><a class="nav-link" href="contact-us.html">Contact Us</a></li>
              <li class="nav-item"><a class="nav-link" href="https://blog.supershyft.com/" target="_blank" rel="noopener noreferrer">Blogs</a></li>
              <li class="nav-item">
                <a class="bs-btn login-btn" href="https://app.supershyft.com/login" style="font-size:16px;padding:6px 16px;line-height:1.2;margin-top:4px;">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>"""

FOOTER = """  <footer class="bs-footer">
    <div class="container">
      <div class="top-footer">
        <div class="logo">
          <a href="index.html">
            <img src="assets/images/footer-logo.png" class="img-fluid" alt="footer-logo">
          </a>
        </div>
        <ul class="list">
          <li><a href="index.html">Home</a></li>
          <li><a href="technology.html">Our Tech</a></li>
          <li><a href="our-story.html">Our Story</a></li>
          <li><a href="gifting.html">Gifting</a></li>
          <li><a href="contact-us.html">Contact us</a></li>
          <li><a href="https://blog.supershyft.com/" target="_blank" rel="noopener noreferrer">Blogs</a></li>
        </ul>
        <div class="social-media">
          <p>Follow us</p>
          <a href="https://www.instagram.com/supershyft?igsh=bjFlZzZsbDdhaTdy" target="_blank" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="color:#fff;">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.266-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.646-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/fitnasticindia/" target="_blank" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="color:#fff;">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
      <div class="d-lg-flex d-md-flex justify-content-between">
        <div class="copywrite">© 2025 Supershyft. All rights reserved.</div>
      </div>
    </div>
  </footer>"""


def page(title, description, canonical, eyebrow, h1, effective, updated, nav_links, body_html):
    nav = "\n".join(
        f'            <a href="{href}">{label}</a>' for href, label in nav_links
    )
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{canonical}">
  <meta property="og:site_name" content="Supershyft">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{canonical}">
  <link rel="stylesheet" type="text/css" href="assets/css/custom.css">
  <link rel="stylesheet" type="text/css" href="assets/css/legal.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Sora:wght@100..800&display=swap" rel="stylesheet">
  <link rel="apple-touch-icon" sizes="57x57" href="assets/images/fav.png">
  <link rel="icon" type="image/png" sizes="192x192" href="assets/images/fav.png">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-NGCC7R99GH"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-NGCC7R99GH');
  </script>
</head>
<body class="legal-page">
{HEADER}

  <main>
    <div class="legal-wrap">
      <article class="legal-card">
        <div class="legal-eyebrow">{eyebrow}</div>
        <h1>{h1}</h1>
        <p class="legal-meta"><span>Effective Date: {effective}</span><span>Last Updated: {updated}</span></p>
        <nav class="legal-nav" aria-label="Related policies">
{nav}
        </nav>
        <div class="legal-body">
{body_html}
        </div>
      </article>
    </div>
  </main>

{FOOTER}

  <script src="assets/js/vendor.js" defer></script>
  <script src="assets/js/custom.js" defer></script>
</body>
</html>
"""


def load_body(name: str) -> str:
    return (Path(__file__).parent / "legal_bodies" / name).read_text(encoding="utf-8")


def main():
    bodies = Path(__file__).parent / "legal_bodies"
    pages = [
        (
            "terms.html",
            page(
                "Terms & Conditions | SuperShyft",
                "Read the SuperShyft Terms and Conditions governing use of the SuperShyft app and services operated by Fitnastic Health Pvt. Ltd.",
                "https://www.supershyft.com/terms",
                "SuperShyft Legal",
                "Terms & Conditions",
                "05/11/2026",
                "05/11/2026",
                [
                    ("privacy-policy.html", "Privacy Policy"),
                    ("cura-terms.html", "CURA Terms"),
                    ("cura-privacy-policy.html", "CURA Privacy"),
                ],
                load_body("ss_terms.html"),
            ),
        ),
        (
            "privacy-policy.html",
            page(
                "Privacy Policy | SuperShyft",
                "Learn how SuperShyft collects, uses, stores and protects personal and health-related information.",
                "https://www.supershyft.com/privacy-policy",
                "SuperShyft Legal",
                "Privacy Policy",
                "05/11/2026",
                "05/11/2026",
                [
                    ("terms.html", "Terms & Conditions"),
                    ("cura-terms.html", "CURA Terms"),
                    ("cura-privacy-policy.html", "CURA Privacy"),
                ],
                load_body("ss_privacy.html"),
            ),
        ),
        (
            "cura-terms.html",
            page(
                "CURA Terms & Conditions | SuperShyft",
                "Terms of Use for CURA, SuperShyft's AI-powered health information and report interpretation chatbot.",
                "https://www.supershyft.com/cura-terms",
                "CURA Legal",
                "CURA Terms & Conditions",
                "12-11-2026",
                "12-11-2026",
                [
                    ("cura-privacy-policy.html", "CURA Privacy Policy"),
                    ("terms.html", "SuperShyft Terms"),
                    ("privacy-policy.html", "SuperShyft Privacy"),
                ],
                load_body("cura_terms.html"),
            ),
        ),
        (
            "cura-privacy-policy.html",
            page(
                "CURA Privacy Policy | SuperShyft",
                "Privacy Policy for CURA explaining how SuperShyft processes personal and health information through the AI chatbot.",
                "https://www.supershyft.com/cura-privacy-policy",
                "CURA Legal",
                "CURA Privacy Policy",
                "12-11-2026",
                "12-11-2026",
                [
                    ("cura-terms.html", "CURA Terms & Conditions"),
                    ("terms.html", "SuperShyft Terms"),
                    ("privacy-policy.html", "SuperShyft Privacy"),
                ],
                load_body("cura_privacy.html"),
            ),
        ),
    ]

    for filename, html in pages:
        path = ROOT / filename
        path.write_text(html, encoding="utf-8")
        print(f"Wrote {filename} ({len(html)} chars)")


if __name__ == "__main__":
    main()
