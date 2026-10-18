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
  const result = await p.evaluate(() => {
    const img = document.getElementById("i");
    const c = document.createElement("canvas");
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height);
    // Find diya flame (bright yellow) on left third
    let flame = { x: 0, y: 0, max: 0 };
    for (let y = 200; y < 800; y++) {
      for (let x = 0; x < 400; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const score = r + g - b * 2;
        if (r > 220 && g > 160 && b < 100 && score > flame.max) {
          flame = { x, y, max: score };
        }
      }
    }
    // Find step-num gold #c59b63-ish in text column
    const rows = [];
    for (let y = 300; y < 750; y++) {
      let n = 0;
      for (let x = 600; x < 900; x++) {
        const i = (y * width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 170 && r < 220 && g > 130 && g < 180 && b > 70 && b < 130) n++;
      }
      if (n > 10) rows.push({ y, n });
    }
    return { flame, numRows: rows.slice(0, 40), numRowCount: rows.length };
  });
  console.log(JSON.stringify(result, null, 2));
  await b.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
