import { test } from "../../utils/fixtures";

test.describe("Cart", () => {
  test("Add one product to cart", async ({ productpage, cartpage }) => {
    await productpage.navigate();
    const productDetail = await productpage.getProductDetail(0);
    await productpage.addToCartAndViewCart(0);
    await cartpage.expectCartPageVisible();
    await cartpage.verifyPriceConsistency(
      productDetail.name,
      productDetail.price,
    );
  });
  // test("Add multiple product to cart", async ({ productpage, cartpage }) => {
  //   await productpage.navigate();
  //   await productpage.addMultipleToCart([0, 1]);
  //   await cartpage.expectCartPageVisible();
  //   await cartpage.verifyCartCount(2);
  // });
});
