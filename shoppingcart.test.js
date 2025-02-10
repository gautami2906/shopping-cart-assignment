import ShoppingCart from './shoppingcart.js'; 
import fetch from 'node-fetch';
import assert from 'assert';

// Mock fetch function
global.fetch = async (url) => {
    const productName = url.split("/").pop();
    const prices = {
        "cornflakes": 2.52,
        "weetabix": 9.98,
        "frosties": 4.99,
        "shreddies": 4.68,
        "cheerios":8.43
    };
    console.log(`Mock API hit: ${url}, returning price: ${prices[productName] || 0}`);
    return {
        json: async () => ({ price: prices[productName] || 0 })
    };
};

// Run tests manually using Node.js
(async () => {
    console.log("Running tests...");

    const cart = new ShoppingCart();

    console.log("Test 1: Adding a product");
    await cart.addProduct("cornflakes", 1);
    assert(cart.cart["cornflakes"], "Product should exist in the cart");
    assert(cart.cart["cornflakes"].quantity === 1, "Quantity should be 1");
    assert(cart.cart["cornflakes"].price === 2.52, "Price should be 2.52");

    console.log("Test 2: Adding the same product again");
    await cart.addProduct("cornflakes", 1);
    assert(cart.cart["cornflakes"].quantity === 2, "Quantity should increase to 2");

    console.log("Test 3: Adding a different product");
    await cart.addProduct("weetabix", 1);
    assert(cart.cart["weetabix"], "Weetabix should be in the cart");
    assert(cart.cart["weetabix"].quantity === 1, "Quantity should be 1");
    assert(cart.cart["weetabix"].price === 9.98, "Price should be 9.98");

     console.log("Test 4: Checking total calculations");
     const totals = cart.cartTotal();
    assert(totals.subtotal === 15.02, `Subtotal should be 15.02, got ${totals.subtotal}`);
     assert(totals.tax === 1.88, `Tax should be 1.88, got ${totals.tax}`);
    assert(totals.total === 16.90, `Total should be 16.90, got ${totals.total}`);

    console.log("Test 5: Handling invalid product");
    await cart.addProduct("invalidProduct", 1);
    assert(!cart.cart["invalidProduct"], "Invalid product should not be added");

    console.log(" All tests passed!");
})();
