import { findProduct, filterByPrice, addToCart, calculateTotal, BaseProduct, Electronics, Clothing, CartItem } from '../index';

describe("findProduct", () => {
    it("should return the product with the specified ID", () => {
      const products: Electronics[] = [
        { id: 1, name: "Phone", price: 10000, category: "electronics", warranty: "2 years" },
        { id: 2, name: "Laptop", price: 50000, category: "electronics", warranty: "1 year" }
      ];
      const result = findProduct(products, 1);
      expect(result).toEqual(products[0]);
    });
  
    it("should return undefined if the product is not found", () => {
      const products: Electronics[] = [];
      const result = findProduct(products, 99);
      expect(result).toBeUndefined();
    });
  });

describe("filterByPrice", () => {
    it("should return products within the specified price range", () => {
      const products: BaseProduct[] = [
        { id: 1, name: "Phone", price: 10000 },
        { id: 2, name: "T-shirt", price: 500 },
        { id: 3, name: "Laptop", price: 50000 }
      ];
      const result = filterByPrice(products, 10000);
      expect(result).toEqual([products[0], products[1]]);
    });
  });

  describe("addToCart", () => {
    it("should add a new product to the cart", () => {
      const cart: CartItem<Electronics>[] = [];
      const product: Electronics = { id: 1, name: "Phone", price: 10000, category: "electronics", warranty: "2 years" };
      const result = addToCart(cart, product, 1);
      expect(result).toHaveLength(1);
      expect(result[0].quantity).toBe(1);
    });
  
    it("should increase the quantity if the product is already in the cart", () => {
      const product: Electronics = { id: 1, name: "Phone", price: 10000, category: "electronics", warranty: "2 years" };
      const cart: CartItem<Electronics>[] = [{ product, quantity: 1 }];
      const result = addToCart(cart, product, 1);
      expect(result[0].quantity).toBe(2);
    });
  });

  describe("calculateTotal", () => {
    it("should calculate the total price of all items in the cart", () => {
      const cart: CartItem<BaseProduct>[] = [
        { product: { id: 1, name: "Phone", price: 10000 }, quantity: 2 },
        { product: { id: 2, name: "T-shirt", price: 500 }, quantity: 3 }
      ];
      const total = calculateTotal(cart);
      expect(total).toBe(21500); // 10000 * 2 + 500 * 3
    });
  });  