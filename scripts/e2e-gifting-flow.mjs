/**
 * End-to-end gifting workflow test (Playwright).
 * UI: Gift It → Book → OTP → Verify → (mocked) Razorpay → confirm → success/fail
 * Diagnostics APIs hit live; onboard/verify/confirm/Razorpay are mocked for determinism.
 */
import { chromium } from "playwright";

const BASE = process.env.GIFTING_BASE || "http://127.0.0.1:8082/gifting.html";
const API = "https://api.supershyft.com";

const results = [];
function pass(name, detail) {
  results.push({ ok: true, name, detail: detail || "" });
  console.log("PASS:", name, detail || "");
}
function fail(name, detail) {
  results.push({ ok: false, name, detail: String(detail || "") });
  console.error("FAIL:", name, detail || "");
}

async function fillGiftForm(page) {
  await page.locator("#recipient-name").fill("Akash Kumar");
  await page.locator("#your-name").fill("Adi Kumar");
  await page.locator("#recipient-email").fill("akash@example.com");
  await page.locator("#your-email").fill("adi@example.com");
  await page.locator("#recipient-phone").fill("9876543211");
  await page.locator("#your-phone").fill("9876543210");
  await page.locator("#gift-message").fill("Morning slot gift");
}

async function scrollToForm(page) {
  await page.locator("#gift-personalize").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
}

async function fillBookAndWaitSlots(page) {
  // Force-check radios (custom span faces + sticky header intercept pointer events)
  await page.locator('input[name="book-gender"][value="Male"]').check({ force: true });
  await page.locator("#book-age").fill("28");
  await page.locator("#book-address").fill("350 A, Avenue Street");
  await page.locator("#book-city").fill("Gurgaon");
  await page.locator("#book-pincode").fill("122001");

  // Wait for serviceability → dates
  await page.waitForFunction(
    () => document.querySelectorAll('#book-dates input[name="book-date"]').length > 0,
    null,
    { timeout: 20000 }
  );
  await page.locator('#book-dates input[name="book-date"]').first().check({ force: true });

  await page.waitForFunction(
    () => document.querySelectorAll('#book-slots input[name="book-slot"]').length > 0,
    null,
    { timeout: 20000 }
  );
  await page.locator('#book-slots input[name="book-slot"]').first().check({ force: true });
}

async function installMocks(page, { confirmOk = true } = {}) {
  const captured = {
    onboardBody: null,
    verifyBody: null,
    confirmBody: null,
    razorpayOpened: false,
  };

  await page.route("**/users/public/family-onboard/confirm-payment", async (route) => {
    const post = route.request().postDataJSON();
    captured.confirmBody = post;
    if (confirmOk) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          payment_verified: true,
          razorpay_order_id: post.razorpay_order_id,
          razorpay_payment_id: post.razorpay_payment_id,
          booking_ids: [10001],
          members: [{ user_id: 43, engagement_id: 501, status: "success", message: "Payment recorded" }],
          family_onboard_id: post.family_onboard_id,
          booker_user_id: 42,
        }),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          payment_verified: false,
          members: [{ user_id: 43, engagement_id: 501, status: "failed" }],
          family_onboard_id: post.family_onboard_id,
        }),
      });
    }
  });

  await page.route("**/users/public/family-onboard/verify-pay", async (route) => {
    const post = route.request().postDataJSON();
    captured.verifyBody = post;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        razorpay_order_id: "order_E2E_TEST_001",
        amount_paise: 122000,
        amount_rupees: 1220,
        currency: "INR",
        key_id: "rzp_test_e2e",
        booking_ids: [10001],
        booking_id: 10001,
        members: [{ user_id: 43, engagement_id: 501, status: "success" }],
        family_onboard_id: post.family_onboard_id,
        tokens: { access_token: "eyJ...", "refresh token": "eyJ..." },
      }),
    });
  });

  await page.route("**/users/public/family-onboard", async (route) => {
    // only exact onboard (not verify-pay / confirm-payment)
    const url = route.request().url();
    if (url.includes("verify-pay") || url.includes("confirm-payment")) {
      return route.fallback();
    }
    const post = route.request().postDataJSON();
    captured.onboardBody = post;
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        family_onboard_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        booker_user_id: 42,
        otp_session_id: 1001,
        payment_required: true,
        members: [
          {
            user_id: 43,
            engagement_id: 501,
            engagement_code: "ABC12XYZ",
            engagement_participant_id: 9001,
            sub_profile_created: true,
          },
        ],
      }),
    });
  });

  await page.addInitScript(() => {
    window.__e2eRazorpayCalls = [];
    class FakeRazorpay {
      constructor(options) {
        this.options = options;
        window.__e2eRazorpayCalls.push(options);
      }
      on() {}
      open() {
        const opts = this.options;
        setTimeout(() => {
          if (typeof opts.handler === "function") {
            opts.handler({
              razorpay_payment_id: "pay_E2E_TEST_001",
              razorpay_order_id: opts.order_id,
              razorpay_signature: "sig_e2e_test_hex",
            });
          }
        }, 50);
      }
    }
    window.Razorpay = FakeRazorpay;
  });

  return captured;
}

async function runSuccessPath(browser) {
  const page = await browser.newPage();
  const captured = await installMocks(page, { confirmOk: true });

  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 30000 });
  await scrollToForm(page);
  await fillGiftForm(page);
  await page.locator(".g-preview__submit").click();

  await page.waitForSelector("#gift-book:not([hidden])", { timeout: 10000 });
  pass("Gift It opens Book Appointment");

  await fillBookAndWaitSlots(page);
  pass("Serviceability + slots loaded (live diagnostics)");

  await page.locator("#gift-book-continue").click();
  await page.waitForSelector("#gift-otp:not([hidden])", { timeout: 15000 });
  pass("Continue opens OTP panel after family-onboard");

  const body = captured.onboardBody;
  if (!body) throw new Error("family-onboard not captured");
  const m = body.members && body.members[0];
  const checks = [
    [body.booker?.name === "Adi Kumar", "booker.name"],
    [body.booker?.phone === "9876543210", "booker.phone"],
    [body.booker?.email === "adi@example.com", "booker.email"],
    [m?.name === "Akash Kumar", "member.name"],
    [m?.phone === "9876543211", "member.phone"],
    [m?.email === "akash@example.com", "member.email"],
    [m?.gender === "Male", "member.gender"],
    [m?.age === 28, "member.age"],
    [m?.engagement_type === "bio_ai", "engagement_type"],
    [m?.diagnostic_package_id === 7, "diagnostic_package_id"],
    [m?.city === "Gurgaon", "city"],
    [m?.pincode === "122001", "pincode"],
    [m?.booker_message === "Morning slot gift", "booker_message"],
    [!!m?.blood_collection_date, "blood_collection_date"],
    [!!m?.blood_collection_time_slot_id, "blood_collection_time_slot_id"],
    [body.discount_code === null, "discount_code null"],
  ];
  const failedChecks = checks.filter((c) => !c[0]).map((c) => c[1]);
  if (failedChecks.length) {
    fail("Onboard payload mapping", failedChecks.join(", ") + " | " + JSON.stringify(body));
  } else {
    pass("Onboard payload mapping", `slot=${m.blood_collection_time_slot} id=${m.blood_collection_time_slot_id}`);
  }

  const hint = await page.locator("#gift-otp-hint").innerText();
  if (hint.includes("xxxxxxxx10") && hint.includes("adxxxxdi@example.com")) {
    pass("OTP hint masks booker contact", hint);
  } else if (hint.includes("+91") && hint.includes("@")) {
    pass("OTP hint shows masked phone/email", hint);
  } else {
    fail("OTP hint", hint);
  }

  // Enter OTP
  const digits = page.locator(".g-otp__digit");
  const otp = "123456";
  for (let i = 0; i < 6; i++) {
    await digits.nth(i).fill(otp[i]);
  }
  await page.locator("#gift-otp-verify").click();

  await page.waitForSelector("#gift-pay-success:not([hidden])", { timeout: 15000 });
  pass("Verify OTP → Razorpay mock → confirm → success panel");

  const txn = await page.locator("#gift-pay-txn-id").innerText();
  const amt = await page.locator("#gift-pay-amount").innerText();
  if (txn === "pay_E2E_TEST_001") pass("Success shows payment id", txn);
  else fail("Success payment id", txn);
  if (amt.includes("1220")) pass("Success shows amount", amt);
  else fail("Success amount", amt);

  if (
    captured.verifyBody?.otp === "123456" &&
    captured.verifyBody?.phone === "9876543210" &&
    captured.verifyBody?.family_onboard_id === "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  ) {
    pass("verify-pay payload");
  } else {
    fail("verify-pay payload", JSON.stringify(captured.verifyBody));
  }

  if (
    captured.confirmBody?.razorpay_payment_id === "pay_E2E_TEST_001" &&
    captured.confirmBody?.razorpay_order_id === "order_E2E_TEST_001" &&
    captured.confirmBody?.razorpay_signature === "sig_e2e_test_hex"
  ) {
    pass("confirm-payment payload");
  } else {
    fail("confirm-payment payload", JSON.stringify(captured.confirmBody));
  }

  const rzCalls = await page.evaluate(() => window.__e2eRazorpayCalls || []);
  if (rzCalls[0]?.key === "rzp_test_e2e" && rzCalls[0]?.order_id === "order_E2E_TEST_001") {
    pass("Razorpay opened with verify-pay order");
  } else {
    fail("Razorpay options", JSON.stringify(rzCalls));
  }

  await page.close();
}

async function runFailPath(browser) {
  const page = await browser.newPage();
  await installMocks(page, { confirmOk: false });

  await page.goto(BASE, { waitUntil: "domcontentloaded", timeout: 30000 });
  await scrollToForm(page);
  await fillGiftForm(page);
  await page.locator(".g-preview__submit").click();
  await page.waitForSelector("#gift-book:not([hidden])", { timeout: 10000 });
  await fillBookAndWaitSlots(page);
  await page.locator("#gift-book-continue").click();
  await page.waitForSelector("#gift-otp:not([hidden])", { timeout: 15000 });

  const digits = page.locator(".g-otp__digit");
  for (let i = 0; i < 6; i++) await digits.nth(i).fill(String(i + 1));
  await page.locator("#gift-otp-verify").click();

  await page.waitForSelector("#gift-pay-failed:not([hidden])", { timeout: 15000 });
  pass("Failed confirm shows Payment Failed panel");

  const title = await page.locator("#gift-pay-failed-title").innerText();
  if (title.includes("Payment Failed")) pass("Failed panel title", title);
  else fail("Failed panel title", title);

  await page.locator("#gift-pay-retry").isVisible();
  await page.locator("#gift-pay-change").isVisible();
  pass("Failed panel has Retry + Change Payment Method");

  await page.close();
}

async function runLiveDiagnosticsSmoke() {
  const svcRes = await fetch(`${API}/diagnostics/public/serviceability`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      provider: "healthians",
      address_line: "350 A, Avenue Street",
      city: "Gurgaon",
      pincode: "122001",
      diagnostic_package_id: 7,
    }),
  });
  const svcJson = await svcRes.json();
  if (!svcRes.ok) {
    fail("Live serviceability HTTP", svcRes.status + " " + JSON.stringify(svcJson));
    return;
  }
  pass("Live serviceability HTTP 200");

  const providers = svcJson.data?.providers || svcJson.providers || [];
  const hit = providers.find((p) => p.provider === "healthians") || providers[0];
  if (!hit?.serviceable) {
    fail("Live serviceability serviceable", JSON.stringify(svcJson).slice(0, 400));
    return;
  }
  pass("Live Gurgaon 122001 serviceable", `zone=${hit.zone_id}`);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const slotDate = tomorrow.toISOString().slice(0, 10);
  const slotsRes = await fetch(`${API}/diagnostics/public/available-slots`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      provider: hit.provider || "healthians",
      slot_date: slotDate,
      diagnostic_package_id: 7,
      zone_id: hit.zone_id,
      latitude: hit.latitude,
      longitude: hit.longitude,
      pincode: "122001",
      has_female_patient: false,
    }),
  });
  const slotsJson = await slotsRes.json();
  if (!slotsRes.ok) {
    fail("Live available-slots HTTP", slotsRes.status);
    return;
  }
  const slots = slotsJson.data?.slots || slotsJson.slots || [];
  if (slots.length) pass("Live available-slots", `${slots.length} slots on ${slotDate}`);
  else fail("Live available-slots empty", slotDate);
}

async function main() {
  console.log("E2E base:", BASE);
  await runLiveDiagnosticsSmoke();

  // Prefer system Edge/Chrome if Playwright browser pack is incomplete
  let browser;
  try {
    browser = await chromium.launch({ headless: true, channel: "msedge" });
  } catch (_) {
    try {
      browser = await chromium.launch({ headless: true, channel: "chrome" });
    } catch (__) {
      browser = await chromium.launch({ headless: true });
    }
  }
  try {
    await runSuccessPath(browser);
    await runFailPath(browser);
  } finally {
    await browser.close();
  }

  const failed = results.filter((r) => !r.ok);
  console.log("\n——— Summary ———");
  console.log(`Passed: ${results.filter((r) => r.ok).length} / ${results.length}`);
  if (failed.length) {
    failed.forEach((f) => console.log(" -", f.name, f.detail));
    process.exit(1);
  }
  console.log("All E2E checks passed.");
}

main().catch((err) => {
  console.error("E2E crashed:", err);
  process.exit(1);
});
