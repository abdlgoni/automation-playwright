import { Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export interface ProductDetail {
  name: string;
  price: string;
}

export class ProductPage extends BasePage {
  // ── Locators ──────────────────────────────────────────────────────────────

  // Static — dipakai di lebih dari satu method
  private readonly modal = this.page.locator(".modal-dialog");
  private readonly viewCartLink = this.page.getByRole("link", {
    name: "View Cart",
  });
  private readonly continueShoppingBtn = this.page.getByRole("button", {
    name: "Continue Shopping",
  });
  private readonly searchInput = this.page.getByRole("textbox", {
    name: "Search Product",
  });
  private readonly searchButton = this.page.locator("#submit_search");

  private readonly productList = this.page.locator(".single-products");

  // Dynamic — bergantung index, inline di method yang memakainya
  private productCard = (index: number) => this.productList.nth(index);

  constructor(page: Page) {
    super(page);
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  async navigate() {
    await super.navigate("/products");
  }

  // ── Assertions ────────────────────────────────────────────────────────────

  /** Verifikasi halaman produk berhasil dimuat */
  async expectProductsLoaded() {
    await expect(this.productList.first()).toBeVisible();
    await expect(this.productList).not.toHaveCount(0);
  }

  /** Verifikasi hasil search mengandung nama produk */
  async expectSearchResultContains(productName: string) {
    await this.expectProductsLoaded();
    await expect(
      this.productList.locator(".productinfo p", {
        hasText: productName,
      }),
    ).toBeVisible();
  }

  // ── Data Capture ──────────────────────────────────────────────────────────

  /** Ambil detail produk (nama & harga) dari product card by index */
  async getProductDetail(index: number): Promise<ProductDetail> {
    const card = this.productCard(index);
    const price =
      (await card
        .getByRole("heading", { name: "Rs." })
        .first()
        .textContent()) ?? "";
    const name = (await card.locator("p").first().textContent()) ?? "";
    return {
      name: name.trim(),
      price: price.replace("Rs.", "").trim(),
    };
  }

  /** Ambil detail beberapa produk sekaligus by indexes */
  async getProductDetails(indexes: number[]): Promise<ProductDetail[]> {
    const details: ProductDetail[] = [];

    for (const index of indexes) {
      details.push(await this.getProductDetail(index));
    }

    return details;
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  /** Klik Add to Cart — hover dulu agar overlay muncul */
  private async clickAddToCart(index: number) {
    const card = this.productCard(index);
    await card.hover();
    await card.locator("a.add-to-cart").first().click();
  }

  /** Tambah produk ke cart lalu lanjut belanja (modal ditutup) */
  async addToCartByIndex(index: number = 0) {
    await this.clickAddToCart(index);
    await expect(this.modal).toBeVisible();
    await this.continueShoppingBtn.click();
    await expect(this.modal).toBeHidden();
  }

  /** Tambah produk ke cart lalu langsung buka halaman cart */
  async addToCartAndViewCart(index: number = 0) {
    await this.clickAddToCart(index);
    await expect(this.modal).toBeVisible();
    await this.viewCartLink.click();
  }

  /**
   * Tambah beberapa produk ke cart sekaligus.
   * Produk non-terakhir → Continue Shopping, produk terakhir → View Cart.
   */
  async addMultipleToCart(indexes: number[]) {
    const lastIndex = indexes[indexes.length - 1];

    for (const index of indexes) {
      await this.clickAddToCart(index);
      await expect(this.modal).toBeVisible();

      if (index !== lastIndex) {
        await this.continueShoppingBtn.click();
        await expect(this.modal).toBeHidden();
      } else {
        await this.viewCartLink.click();
      }
    }
  }

  /** Klik View Product untuk masuk ke detail produk */
  async clickViewProduct(index: number = 0) {
    await this.productCard(index)
      .getByRole("link", { name: "View Product" })
      .click();
  }

  /** Isi search input dan submit */
  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}
