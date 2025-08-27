'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Restaurant } from '@/types'
import RestaurantCard from './RestaurantCard'

interface RestaurantGridProps {
  restaurants: Restaurant[]
}

export default function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  const searchParams = useSearchParams()
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants)

  useEffect(() => {
    const categoryFilter = searchParams.get('category')
    
    if (categoryFilter) {
      // Filter restaurants by cuisine type
      const filtered = restaurants.filter(restaurant => 
        restaurant.metadata.cuisine_type.key === categoryFilter ||
        restaurant.metadata.cuisine_type.value.toLowerCase() === categoryFilter.toLowerCase()
      )
      setFilteredRestaurants(filtered)
    } else {
      setFilteredRestaurants(restaurants)
    }
  }, [searchParams, restaurants])

  if (filteredRestaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No restaurants found for the selected category.</p>
        <p className="text-gray-400 text-sm mt-2">Try selecting a different category or view all restaurants.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}