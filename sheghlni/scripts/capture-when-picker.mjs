import { chromium } from "playwright";
import path from "node:path";

const URL = "http://localhost:3000/Sheghlni/";
const OUT = path.join(process.cwd(), "screenshots", "when-picker.png");

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);

const whenBtn = page.locator("text=When").locator("..").locator("button").first();
await whenBtn.scrollIntoViewIfNeeded();
await whenBtn.click();
await page.getByText("Quick picks").waitFor({ state: "visible", timeout: 10000 });
await page.waitForTimeout(300);

await page.screenshot({ path: OUT, fullPage: false });
console.log("Saved", OUT);
await browser.close();
