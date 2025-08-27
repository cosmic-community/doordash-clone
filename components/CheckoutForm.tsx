'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { createOrder } from '@/lib/cosmic'

interface CheckoutFormProps {
  onClose: () => void
}

export default function CheckoutForm({ onClose }: CheckoutFormProps) {
  const { cart, clearCart, getCartTotal } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    address: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const orderNumber = `ORD-${Date.now()}`
      const subtotal = getCartTotal()
      const deliveryFee = 2.99
      const tax = subtotal * 0.08875
      const total = subtotal + deliveryFee + tax

      // Get restaurant ID from first cart item (assuming all items from same restaurant)
      const firstItem = cart[0]
      if (!firstItem) return

      await createOrder({
        order_number: orderNumber,
        customer_name: customerData.name,
        customer_phone: customerData.phone,
        delivery_address: customerData.address,
        restaurant_id: 'placeholder-restaurant-id', // Would need to track restaurant in cart
        order_items: cart.map(item => ({
          item_name: item.item_name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal
        })),
        subtotal,
        delivery_fee: deliveryFee,
        tax,
        total_amount: total
      })

      clearCart()
      onClose()
      alert('Order placed successfully!')
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          required
          value={customerData.name}
          onChange={(e) => setCustomerData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          required
          value={customerData.phone}
          onChange={(e) => setCustomerData(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Delivery Address
        </label>
        <textarea
          required
          value={customerData.address}
          onChange={(e) => setCustomerData(prev => ({ ...prev, address: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  )
}