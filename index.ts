export type BaseProduct = {
    id: number;
    name: string;
    price: number;
  };
  
export type Electronics = BaseProduct & {
    category: 'electronics';
    warranty: string;
  };
  
export type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    material: string;
  };

export const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
  };

 export const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
  };

export type CartItem<T> = {
    product: T;
    quantity: number;
  };
  
export const addToCart = <T extends BaseProduct>(
    cart: CartItem<T>[],
    product: T,
    quantity: number
  ): CartItem<T>[] => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    return cart;
  };
  
export const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };
  
export const electronics: Electronics[] = [
    { id: 1, name: "Телефон", price: 10000, category: 'electronics', warranty: "2 years" }
  ];
export const clothing: Clothing[] = [
    { id: 2, name: "Футболка", price: 500, category: 'clothing', size: "M", material: "cotton" }
  ];
  
export const phone = findProduct(electronics, 1);
  
export const cart: CartItem<Electronics | Clothing>[] = [];
  addToCart(cart, phone as Electronics, 1);
  
export const total = calculateTotal(cart);
  console.log(total);
  