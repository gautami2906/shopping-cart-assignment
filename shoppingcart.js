import fetch from 'node-fetch';

class shoppingcart {
    constructor() {
      this.cart = {}; //
      this.taxRate = 0.125; // Global tax rate at 12.5%
    }

   async addProduct(productName, quantity){
      try {  
        console.log(`${quantity} × ${productName} entered.`);
        const response = await fetch(`http://localhost:3001/products/${productName.toLowerCase()}`);
        const data = await response.json();
        const price = data.price;
        if (this.cart[productName]) {
          console.log(`if clause entered`);
          this.cart[productName].quantity += quantity;
        } 
        else
        {
          
          this.cart[productName] = { price, quantity };
        }

        console.log(`${quantity} × ${productName} added to the cart.`);
      } 
      catch (error) 
      {
        console.error(`Error fetching price for ${productName}:`, error.message);
      
      }
    }

    cartTotal(){
      let subtotal = 0;
    for (const product in this.cart) {
      subtotal += this.cart[product].price * this.cart[product].quantity;
    }

    const tax = Math.round(subtotal * this.taxRate * 100) / 100;
    const total = Math.round((subtotal + tax) * 100) / 100;

    return { subtotal, tax, total };
    }

    printCart(){
      console.log("\nShopping Cart:");
      for (const product in this.cart) {
        console.log(`${this.cart[product].quantity} × ${product} @ ${this.cart[product].price} each`);
      }
      const totals = this.cartTotal();
      console.log(`Subtotal: $${totals.subtotal}`);
      console.log(`Tax (12.5%): $${totals.tax}`);
      console.log(`Total: $${totals.total}\n`);
    }
}
export default shoppingcart;