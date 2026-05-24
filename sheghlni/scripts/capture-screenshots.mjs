import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const URL = "http://localhost:3000/Sheghlni/";
const OUT = path.join(process.cwd(), "screenshots");

const shots = [
  { name: "01-hero-desktop", width: 1280, height: 900, fullPage: false },
  { name: "02-hero-mobile", width: 390, height: 844, fullPage: false },
  { name: "03-full-desktop", width: 1280, height: 900, fullPage: true },
  { name: "04-featured-desktop", width: 1280, height: 900, fullPage: false, scrollY: 900 },
  { name: "05-featured-mobile", width: 390, height: 844, fullPage: false, scrollY: 700 },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage();

for (const shot of shots) {
  await page.setViewportSize({ width: shot.width, height: shot.height });
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector("header.sticky, header[class*='sticky']", {
    timeout: 30000,
  }).catch(() => page.waitForTimeout(2000));
  await page.waitForFunction(
    () => getComputedStyle(document.body).fontFamily.includes("Inter") ||
      getComputedStyle(document.querySelector("h1") ?? document.body).fontSize !== "32px" ||
      document.querySelector("header")?.className.includes("sticky"),
    { timeout: 15000 },
  ).catch(() => page.waitForTimeout(3000));
  if (shot.scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), shot.scrollY);
    await page.waitForTimeout(500);
  }
  const file = path.join(OUT, `${shot.name}.png`);
  await page.screenshot({ path: file, fullPage: shot.fullPage });
  console.log("Saved", file);
}

await browser.close();
