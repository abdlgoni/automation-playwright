import { test, expect } from "../../utils/fixtures";
import { validUser, invalidUser } from "../../utils/testData";

test.describe("Authentication", () => {
  test("Login with valid credentials", async ({ homepage, loginpage }) => {
    await homepage.clickSignupLoginButton();
    await loginpage.login(validUser.email, validUser.password);
    await homepage.expectLoginSuccess();
  });
  test("Login with invalid credentials", async ({ homepage, loginpage }) => {
    await homepage.clickSignupLoginButton();
    await loginpage.login(invalidUser.email, validUser.password);
    await loginpage.expectLoginFailed();
  });
});
