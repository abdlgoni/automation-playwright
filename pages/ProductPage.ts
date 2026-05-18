import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
  private readonly productCard = this.page.locator(".single-products");
  private readonly addToCartButton = this.page.locator(
    ".product-overlay, .add-to-cart",
  );
  private readonly viewProductButton = this.page.getByRole("link", {
    name: "View Product",
  });

  private readonly searchProductInput = this.page.getByRole("textbox", {
    name: "Search Product",
  });
  private readonly searchButton = this.page.locator("#submit_search");
  private readonly searchResultSection = this.page.locator("#searched-product");

  private readonly modal = this.page.locator(".modal-dialog");
  private readonly viewCartLink = this.page.getByRole("link", {
    name: "View Cart",
  });
  private readonly continueShoppingButton = this.page.getByRole("button", {
    name: "Continue Shopping",
  });

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate("/products");
  }

  async addToCartByIndex(index: number = 0) {
    await this.addToCartButton.nth(index).click();
    await expect(this.modal).toBeVisible();
    await this.continueShoppingButton.click();
    await expect(this.modal).toBeHidden();
  }

  async addToCartAndViewCart(index: number = 0) {
    await this.addToCartButton.nth(index).click();
    await expect(this.modal).toBeVisible();
    await this.viewCartLink.click();
  }

  async addMultipleToCart(indexes: number[]) {
    for (const index of indexes) {
      await this.addToCartButton.nth(index).click();
      await expect(this.modal).toBeVisible();

      if (index !== indexes[indexes.length - 1]) {
        await this.continueShoppingButton.click();
        await expect(this.modal).toBeHidden();
      } else {
        await this.viewCartLink.click();
      }
    }
  }

  async clickViewProduct(index: number = 0) {
    await this.viewProductButton.click();
  }

  async searchProduct(productName: string) {
    await this.searchProductInput.fill(productName);
    await this.searchButton.click();
  }

  async expectProductResultVisible() {
    await expect(this.searchResultSection).toBeVisible();
  }

  async expectProductCountAttleast(count: number) {
    await expect(this.productCard).toHaveCount(count);
  }
}
