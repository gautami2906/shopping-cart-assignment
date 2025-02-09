import shoppingcart from './shoppingcart.js'; 
// Example usage
(async () => {
  const cart = new shoppingcart();
  await cart.addProduct("Cornflakes", 2);
  cart.printCart();
})();