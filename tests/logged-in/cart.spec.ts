import { test } from "../../utils/fixtures";

test.describe("Cart", () => {
  test("Add one product to cart", async ({ productpage, cartpage }) => {
    await productpage.navigate();
    const productDetail = await productpage.getProductDetail(0);
    await productpage.addToCartAndViewCart(0);
    await cartpage.expectCartPageVisible();
    await cartpage.verifyCartCount(1);
    await cartpage.verifyPriceConsistency(
      productDetail.name,
      productDetail.price,
    );
    await cartpage.deleteProduct(productDetail.name);
  });
  test("Add multiple product to cart", async ({ productpage, cartpage }) => {
    await productpage.navigate();
    const productDetails = await productpage.getProductDetails([1, 2]);
    await productpage.addMultipleToCart([1, 2]);
    await cartpage.expectCartPageVisible();
    await cartpage.verifyCartCount(2);
    await cartpage.verifyAllPriceConsistensy(productDetails);
    await cartpage.deleteProduct(productDetails[1].name);
  });
  // test("Search and add product to cart", async ({ productpage, cartpage }) => {
  //   await productpage.navigate();
  //   const keyword = "Winter Top";
  //   await productpage.searchProduct(keyword);
  //   await productpage.expectProductResultVisible(keyword);
  //   await productpage.getProductDetail(0);
  //   await productpage.addToCartAndViewCart(0);
  //   await cartpage.expectCartPageVisible();
  //   await cartpage.verifyCartCount(1);
  // });
});
