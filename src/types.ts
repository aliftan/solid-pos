/**
 * Represents a product category in the store.
 */
export interface Category {
  id: string;
  name: string;
  products: Product[];
}

/**
 * Represents a product available for purchase.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

/**
 * Represents an item in the shopping cart.
 */
export interface CartItem extends Product {
  quantity: number;
  selectedAddons: string[];
}