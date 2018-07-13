const Basket = require('./index');

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


test('basket test £ 19.34', () => {
  let basket = new Basket(pricingRules);
  basket.add('FR1');
  basket.add('SR1');
  basket.add('FR1');
  basket.add('CF1');

  expect(basket.total()).toBe('£ 19.34');
});

test('basket test £ 3.11', () => {
  let basket = new Basket(pricingRules);
  basket.add('FR1');
  basket.add('FR1');

  expect(basket.total()).toBe('£ 3.11');
});


test('basket test £ 16.61', () => {
  let basket = new Basket(pricingRules);
  basket.add('FR1');
  basket.add('SR1');
  basket.add('SR1');
  basket.add('SR1');

  expect(basket.total()).toBe('£ 16.61');
});
