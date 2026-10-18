const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 1054 } });
  await p.goto("http://127.0.0.1:8082/gifting.html?v=" + Date.now(), {
    waitUntil: "networkidle",
  });
  await p.waitForTimeout(400);
  await p.evaluate(() => {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  await p.evaluate(() => {
    const el = document.getElementById("gift-steps");
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + 2);
  });
  await p.waitForTimeout(800);

  // Match Figma step-02 frame: show panel 1, mandala at rest (0deg), hide site chrome
  await p.evaluate(() => {
    document.querySelectorAll(".g-steps__panel").forEach((panel, i) => {
      panel.classList.toggle("is-active", i === 1);
      panel.style.transition = "none";
    });
    const img = document.getElementById("steps-mandala");
    if (img && window.gsap) {
      gsap.set(img, { rotation: 0, scale: 1.42, transformOrigin: "50% 50%" });
    }
    const nav = document.querySelector("nav, .navbar, header, .site-header, .n-header");
    if (nav) nav.style.display = "none";
    document.querySelectorAll("header, .header, #header").forEach((el) => {
      el.style.display = "none";
    });
  });
  await p.waitForTimeout(200);

  const livePath = path.join(__dirname, "live-step02-clean.png");
  await p.screenshot({ path: livePath });

  const metrics = await p.evaluate(() => {
    const q = (s) => document.querySelector(s).getBoundingClientRect();
    const r = (b) => ({
      l: Math.round(b.left),
      t: Math.round(b.top),
      w: Math.round(b.width),
      h: Math.round(b.height),
    });
    return {
      mandala: r(q(".g-steps__mandala")),
      diya: r(q(".g-steps__diya")),
      content: r(q(".g-steps__content")),
      eyebrow: r(q(".g-steps__eyebrow")),
      headline: r(q(".g-steps__headline")),
      title: r(q(".g-steps__panel.is-active .g-steps__title")),
      desc: r(q(".g-steps__panel.is-active .g-steps__desc")),
      num: r(q(".g-steps__panel.is-active .g-steps__num")),
    };
  });

  // Figma absolute targets at 1440×1054
  const figma = {
    mandala: { l: -511, t: -62, w: 1057, h: 1178 },
    diya: { l: -166, t: 394, w: 335, h: 264 },
    content: { l: 566, t: 195, w: 821, h: 663 },
  };

  const delta = {};
  for (const k of Object.keys(figma)) {
    delta[k] = {
      dl: metrics[k].l - figma[k].l,
      dt: metrics[k].t - figma[k].t,
      dw: metrics[k].w - figma[k].w,
      dh: metrics[k].h - figma[k].h,
    };
  }

  console.log(JSON.stringify({ metrics, delta }, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
