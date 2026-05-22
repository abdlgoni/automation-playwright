import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

type PageFixtures = {
  homepage: HomePage;
  loginpage: LoginPage;
  registerpage: RegisterPage;
  productpage: ProductPage;
  cartpage: CartPage;
};

export const test = base.extend<PageFixtures>({
  homepage: async ({ page }, use) => {
    const homepage = new HomePage(page);
    await homepage.navigate();
    await use(homepage);
  },

  loginpage: async ({ page }, use) => {
    const loginpage = new LoginPage(page);
    await use(loginpage);
  },
  registerpage: async ({ page }, use) => {
    const registerpage = new RegisterPage(page);
    await use(registerpage);
  },
  productpage: async ({ page }, use) => {
    const productpage = new ProductPage(page);
    await use(productpage);
  },

  cartpage: async ({ page }, use) => {
    const cartpage = new CartPage(page);
    await use(cartpage);
    await cartpage.clearCart();
  },
});

export { expect } from "@playwright/test";
