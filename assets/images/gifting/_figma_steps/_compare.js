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

  // Land firmly inside step 02 (index 1)
  await p.evaluate(() => {
    const el = document.getElementById("gift-steps");
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + window.innerHeight * 1.55);
  });
  await p.waitForTimeout(1200);

  // Force only step 02 visible (kill transition ghost)
  await p.evaluate(() => {
    document.querySelectorAll(".g-steps__panel").forEach((panel, i) => {
      panel.classList.toggle("is-active", i === 1);
      panel.style.transition = "none";
    });
  });
  await p.waitForTimeout(100);

  const out = path.join(__dirname, "live-step02.png");
  await p.screenshot({ path: out });

  const figmaPath = path.join(__dirname, "figma-856-10842-1440.png");
  const figma = fs.readFileSync(figmaPath).toString("base64");
  const live = fs.readFileSync(out).toString("base64");

  const page2 = await b.newPage({ viewport: { width: 1440, height: 1054 } });
  await page2.setContent(`<!doctype html>
    <canvas id="c" width="1440" height="1054"></canvas>
    <script>
      window.__figma = "data:image/png;base64,${figma}";
      window.__live = "data:image/png;base64,${live}";
    </script>`);

  const diff = await page2.evaluate(async () => {
    function load(src) {
      return new Promise((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = src;
      });
    }
    const a = await load(window.__figma);
    const b = await load(window.__live);
    const c = document.getElementById("c");
    const ctx = c.getContext("2d");
    ctx.drawImage(a, 0, 0, 1440, 1054);
    const A = ctx.getImageData(0, 0, 1440, 1054).data;
    ctx.drawImage(b, 0, 0, 1440, 1054);
    const B = ctx.getImageData(0, 0, 1440, 1054).data;
    // Diff map (ignore top nav strip 0-80)
    let sum = 0;
    let n = 0;
    let big = 0;
    const out = ctx.createImageData(1440, 1054);
    for (let y = 0; y < 1054; y++) {
      for (let x = 0; x < 1440; x++) {
        const i = (y * 1440 + x) * 4;
        const dr = Math.abs(A[i] - B[i]);
        const dg = Math.abs(A[i + 1] - B[i + 1]);
        const db = Math.abs(A[i + 2] - B[i + 2]);
        const d = (dr + dg + db) / 3;
        if (y > 80) {
          sum += d;
          n++;
          if (d > 35) big++;
        }
        out.data[i] = d > 35 ? 255 : 0;
        out.data[i + 1] = d > 35 ? 40 : B[i + 1];
        out.data[i + 2] = d > 35 ? 40 : B[i + 2];
        out.data[i + 3] = 255;
      }
    }
    ctx.putImageData(out, 0, 0);
    return {
      avg: Math.round(sum / n),
      pctHot: Math.round((1000 * big) / n) / 10,
      dataUrl: c.toDataURL("image/png"),
    };
  });

  const diffBuf = Buffer.from(diff.dataUrl.split(",")[1], "base64");
  fs.writeFileSync(path.join(__dirname, "diff-hotspot.png"), diffBuf);
  console.log({ avg: diff.avg, pctHot: diff.pctHot });
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
