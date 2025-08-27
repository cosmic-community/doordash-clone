// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Restaurant interface
export interface Restaurant extends CosmicObject {
  type: 'restaurants';
  metadata: {
    name: string;
    description?: string;
    cuisine_type: {
      key: string;
      value: string;
    };
    address: string;
    phone?: string;
    delivery_fee: number;
    minimum_order: number;
    delivery_time: string;
    restaurant_image?: {
      url: string;
      imgix_url: string;
    };
    rating?: number;
    is_active: boolean;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

// Menu item interface
export interface MenuItem extends CosmicObject {
  type: 'menu-items';
  metadata: {
    name: string;
    description?: string;
    price: number;
    restaurant: Restaurant;
    category: Category;
    food_image?: {
      url: string;
      imgix_url: string;
    };
    is_available: boolean;
    calories?: number;
    ingredients?: string;
  };
}

// Order interface
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    order_number: string;
    customer_name: string;
    customer_phone: string;
    delivery_address: string;
    restaurant: Restaurant;
    order_items: OrderItem[];
    subtotal: number;
    delivery_fee: number;
    tax: number;
    total_amount: number;
    status: {
      key: string;
      value: string;
    };
    order_date: string;
    special_instructions?: string;
  };
}

// Order item interface
export interface OrderItem {
  item_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

// Cart item interface
export interface CartItem extends OrderItem {
  id: string;
  image?: string;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type literals for select-dropdown values
export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
export type CuisineType = 'american' | 'italian' | 'mexican' | 'asian' | 'pizza' | 'fast-food';

// Type guards
export function isRestaurant(obj: CosmicObject): obj is Restaurant {
  return obj.type === 'restaurants';
}

export function isMenuItem(obj: CosmicObject): obj is MenuItem {
  return obj.type === 'menu-items';
}

export function isOrder(obj: CosmicObject): obj is Order {
  return obj.type === 'orders';
}