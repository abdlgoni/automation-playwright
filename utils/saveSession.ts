import { chromium, FullConfig } from "@playwright/test";
import { validUser } from "./testData";

async function saveSession(config: FullConfig) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://automationexercise.com/login");

  await page
    .locator("form")
    .filter({ hasText: "Login" })
    .getByPlaceholder("Email Address")
    .fill(validUser.email);
  await page.getByPlaceholder("Password").fill(validUser.password);
  await page.getByRole("button", { name: "login" }).click();

  await page.waitForURL("https://automationexercise.com/");

  await page.context().storageState({ path: "auth.json" });
  console.log("session saved");

  await browser.close();
}
export default saveSession;
