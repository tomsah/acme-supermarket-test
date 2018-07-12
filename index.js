/*
Thomas salah solution to the ACME Supermarket problem.
To see the solution, please use node in the command line.
Go to this folder via commande line and type node index.js
*/

const pricingRules =[{
   FR1 : {
     ref: 'FR1',
     name: 'Fruit tea',
     price: 3.11,
     promoCode: 'buy-one-get-one-free'
   },
   SR1 : {
     ref: 'SR1',
     name: 'Strawberries',
     price: 5.00,
     promoCode: '3+bulk'
   },
   CF1 : {
     ref: 'CF1',
     name: 'Coffee',
     price: 11.23,
     promoCode: 'none'
   }
 }]

 function Basket(pricingRules) {

   // get the items added to the basket
   this.orderedProducts = []
   this.add = orderedProduct => {
     this.orderedProducts.push(orderedProduct);
   }

   this.total = () => {

     const productsPrice = [];

     // create a dynamic object with the product ref quantity
     const productsQuantity = {};

     //discounted amount to apply for 3+bulk promocode product
     const discountedAmount = 0.5;

     this.orderedProducts.forEach(orderedProduct => {
       if(productsQuantity[orderedProduct] === undefined) {
         productsQuantity[orderedProduct] = 1;
       } else {
         productsQuantity[orderedProduct]++
       }
     });

     pricingRules.map( productDetails => {
       return Object.keys(productDetails).forEach(function (key) {

         //short hand to access the different product object;
         const product = productDetails[key];

         /*check promocode and quantity to calculate
         the correct price of each orderd product */
         if(product.promoCode === "buy-one-get-one-free") {
           if(productsQuantity[product.ref] % 2 === 0) {
             productsPrice.push((product.price / 2) * productsQuantity[product.ref]);
           } else {
             productsPrice.push(productsQuantity[product.ref] * (product.price));
           }
         }

         if(product.promoCode === '3+bulk') {
           if(productsQuantity[product.ref] >= 3) {
             productsPrice.push(productsQuantity[product.ref] * (product.price - discountedAmount))
           } else {
             productsPrice.push(productsQuantity[product.ref] * (product.price));
           }
         }

         if(product.promoCode === 'none') {
           productsPrice.push(productsQuantity[product.ref] * (product.price));
         }
       });
     })

     //Get the total of the product prices
     const totalPrice = productsPrice.reduce((sum, nextValue) => {
         return sum + nextValue;
     }, 0)

     return `£ ${totalPrice}`;
   }

 }

 let basket = new Basket(pricingRules);

 // Basket: FR1, SR1, FR1, CF1
 // Total price expected: £19.34

 basket.add('FR1');
 basket.add('SR1');
 basket.add('FR1');
 basket.add('CF1');

 // Basket: FR1, FR1
 // Total price expected: £3.11

 // basket.add('FR1');
 // basket.add('FR1');

 // Basket: SR1, SR1, FR1, SR1
 // Total price expected: £16.61

 // basket.add('FR1');
 // basket.add('SR1');
 // basket.add('SR1');
 // basket.add('SR1');

 basket.total();
 console.log(basket.total());