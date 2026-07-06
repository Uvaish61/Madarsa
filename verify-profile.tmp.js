const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1500, height: 1000 } });

  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(String(err)));

  // Seed the mock-auth localStorage session before the app boots so
  // ProtectedRoute doesn't bounce us to /login.
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "madarsa_user",
      JSON.stringify({ email: "uvaishkhan@gmail.com", name: "Uvaish Khan" })
    );
  });

  await page.goto("http://localhost:3000/dashboard/profile", { waitUntil: "networkidle" });
  try {
    await page.waitForSelector("text=Global Rank", { timeout: 15000 });
  } catch (e) {
    console.log("DID NOT FIND 'Global Rank'. Current URL:", page.url());
  }
  await page.waitForTimeout(1200); // let mount animations settle

  await page.screenshot({ path: "profile-full.png", fullPage: true });

  console.log("URL:", page.url());
  console.log("ERRORS:", JSON.stringify(errors, null, 2));

  await browser.close();
})();
