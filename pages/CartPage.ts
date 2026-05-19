import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export interface CartItemsDetail {
  name: string;
  price: string;
  quantity: string;
}

export class CartPage extends BasePage {
  private readonly shoppingCartTitle = this.page.getByText("Shopping Cart");
  private readonly checkoutButton = this.page.getByText("Proceed To Checkout");
  private readonly cartTable = this.page.locator("#cart_info");
  private readonly cartEmpty = this.page.getByText(
    "Cart is empty! Click here to buy products.",
  );

  private cartRow = (productName: string) =>
    this.cartTable.getByRole("row").filter({ hasText: productName });

  private productImage = (productName: string) =>
    this.cartRow(productName).getByRole("link", { name: "Product Image" });

  private productDesc = (productName: string) =>
    this.cartRow(productName).getByRole("link", { name: productName });

  private productPrice = (productName: string) =>
    this.cartRow(productName).locator(".cart_price p");

  private productQuantity = (productName: string) =>
    this.cartRow(productName).locator(".cart_quantity button");

  private productTotal = (productName: string) =>
    this.cartRow(productName).locator(".cart_total_price");

  private deleteButton = (productName: string) =>
    this.cartRow(productName).locator(".cart_quantity_delete");

  private allDeleteButton = this.cartTable.locator(".cart_quantity_delete");

  async getCartRow(productName: string) {
    return this.cartRow(productName);
  }

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate("/view_cart");
  }

  async verifyProductInCart(productName: string) {
    await expect(this.cartRow(productName)).toBeVisible();
  }

  async getProductPrice(productName: string): Promise<string | null> {
    return this.productPrice(productName).textContent();
  }

  async getProductQuantity(productName: string) {
    return this.productQuantity(productName).textContent();
  }

  async deleteProduct(productName: string) {
    await this.deleteButton(productName).click();
    await expect(this.cartRow(productName)).not.toBeVisible();
  }

  async verifyCartrow(
    productName: string,
    expectedPrice: string,
    expectedQuantity: string,
  ) {
    await expect(this.productDesc(productName)).toBeVisible();
    await expect(this.productPrice(productName)).toContainText(expectedPrice);
    await expect(this.productQuantity(productName)).toHaveText(
      expectedQuantity,
    );
  }

  async verifyCartRows(items: CartItemsDetail[]) {
    for (const item of items) {
      await expect(this.productDesc(item.name)).toBeVisible();
      await expect(this.productPrice(item.price)).toContainText(item.price);
      await expect(this.productQuantity(item.quantity)).toHaveText(
        item.quantity,
      );
    }
  }

  async verifyCartCount(expectedCount: number) {
    await expect(this.allDeleteButton).toHaveCount(expectedCount);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async verifyCartEmpty() {
    await expect(this.cartEmpty).toBeVisible();
  }
}
