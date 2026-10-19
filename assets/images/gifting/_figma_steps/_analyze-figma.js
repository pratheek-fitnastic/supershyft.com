const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 1054 } });
  const b64 = fs
    .readFileSync(path.join(__dirname, "figma-856-10842-1440.png"))
    .toString("base64");
  await p.setContent(`<!doctype html><img id="i" src="data:image/png;base64,${b64}">`);
  await p.waitForTimeout(200);
  const bands = await p.evaluate(() => {
    const img = document.getElementById("i");
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height);
    const rows = [];
    for (let y = 0; y < height; y++) {
      let gold = 0;
      let white = 0;
      for (let x = Math.floor(width * 0.42); x < width - 10; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 200 && g > 200 && b > 200) white++;
        else if (r > 200 && g > 140 && b < 120) gold++;
      }
      if (gold > 15 || white > 20) rows.push({ y, gold, white });
    }
    const bands = [];
    let cur = null;
    for (const r of rows) {
      if (!cur || r.y - cur.end > 8) {
        cur = { start: r.y, end: r.y, gold: r.gold, white: r.white };
        bands.push(cur);
      } else {
        cur.end = r.y;
        cur.gold = Math.max(cur.gold, r.gold);
        cur.white = Math.max(cur.white, r.white);
      }
    }
    return {
      w: width,
      h: height,
      bands: bands.map((b) => ({
        ...b,
        kind: b.gold > b.white ? "gold" : "white",
        mid: Math.round((b.start + b.end) / 2),
      })),
    };
  });
  console.log(JSON.stringify(bands, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
