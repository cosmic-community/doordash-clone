import { createBucketClient } from '@cosmicjs/sdk'
import { Restaurant, MenuItem, Category, Order } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Restaurants
export async function getRestaurants(): Promise<Restaurant[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'restaurants' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response.objects as Restaurant[]).filter(restaurant => 
      restaurant.metadata?.is_active
    )
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch restaurants')
  }
}

export async function getRestaurant(slug: string): Promise<Restaurant | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'restaurants', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Restaurant
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch restaurant')
  }
}

// Menu Items
export async function getMenuItems(restaurantId?: string): Promise<MenuItem[]> {
  try {
    const query: Record<string, any> = { type: 'menu-items' }
    if (restaurantId) {
      query['metadata.restaurant'] = restaurantId
    }
    
    const response = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return (response.objects as MenuItem[]).filter(item => 
      item.metadata?.is_available
    )
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch menu items')
  }
}

export async function getMenuItem(slug: string): Promise<MenuItem | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'menu-items', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as MenuItem
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch menu item')
  }
}

// Categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Category[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

// Orders
export async function createOrder(orderData: {
  order_number: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  restaurant_id: string;
  order_items: Array<{
    item_name: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  subtotal: number;
  delivery_fee: number;
  tax: number;
  total_amount: number;
  special_instructions?: string;
}): Promise<Order> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'orders',
      title: `Order #${orderData.order_number}`,
      metadata: {
        order_number: orderData.order_number,
        customer_name: orderData.customer_name,
        customer_phone: orderData.customer_phone,
        delivery_address: orderData.delivery_address,
        restaurant: orderData.restaurant_id,
        order_items: orderData.order_items,
        subtotal: orderData.subtotal,
        delivery_fee: orderData.delivery_fee,
        tax: orderData.tax,
        total_amount: orderData.total_amount,
        status: 'placed',
        order_date: new Date().toISOString().split('T')[0],
        special_instructions: orderData.special_instructions || ''
      }
    })
    
    return response.object as Order
  } catch (error) {
    console.error('Error creating order:', error)
    throw new Error('Failed to create order')
  }
}

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'orders' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Order[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch orders')
  }
}

export async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  try {
    await cosmic.objects.updateOne(orderId, {
      metadata: {
        status: status
      }
    })
  } catch (error) {
    console.error('Error updating order status:', error)
    throw new Error('Failed to update order status')
  }
}