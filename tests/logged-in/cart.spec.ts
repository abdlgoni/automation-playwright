import { test, expect } from "../../utils/fixtures";
import { cartItems } from "../../utils/testData";

test.describe("Cart", () => {
  test("Add one product to cart", async ({ productpage, cartpage }) => {
    await productpage.navigate();
    await productpage.addToCartAndViewCart(0);
    await cartpage.verifyCartCount(1);
    await cartpage.verifyCartrow(
      cartItems[0].name,
      cartItems[0].price,
      cartItems[0].quantity,
    );
  });

  // test("Add multiple product to cart", async ({ productpage, cartpage }) => {
  //   await productpage.navigate();
  //   await productpage.addMultipleToCart([1, 2, 3]);
  //   await cartpage.verifyCartCount(3)
  //   await cartpage.verifyCartRows(CartItemsDetail)
  // });
});
