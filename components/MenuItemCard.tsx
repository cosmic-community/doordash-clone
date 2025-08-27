'use client'

import { MenuItem, Restaurant } from '@/types'
import { useCart } from '@/hooks/useCart'

interface MenuItemCardProps {
  menuItem: MenuItem
  restaurant: Restaurant
}

export default function MenuItemCard({ menuItem, restaurant }: MenuItemCardProps) {
  const { addToCart } = useCart()
  
  const imageUrl = menuItem.metadata?.food_image?.imgix_url
  const defaultImage = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=240&fit=crop'

  const handleAddToCart = () => {
    addToCart({
      id: menuItem.id,
      item_name: menuItem.metadata?.name || menuItem.title,
      price: menuItem.metadata?.price || 0,
      quantity: 1,
      subtotal: menuItem.metadata?.price || 0,
      image: imageUrl
    })
  }

  return (
    <div className="card overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={imageUrl ? `${imageUrl}?w=400&h=240&fit=crop&auto=format,compress` : defaultImage}
          alt={menuItem.metadata?.name || menuItem.title}
          className="w-full h-full object-cover"
          width="400"
          height="240"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">
            {menuItem.metadata?.name || menuItem.title}
          </h3>
          <span className="text-lg font-bold text-primary">
            ${menuItem.metadata?.price?.toFixed(2)}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {menuItem.metadata?.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {menuItem.metadata?.calories && (
              <span>{menuItem.metadata.calories} cal</span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="btn-primary text-sm"
            disabled={!menuItem.metadata?.is_available}
          >
            {menuItem.metadata?.is_available ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}