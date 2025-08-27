import { Restaurant } from '@/types'
import RestaurantCard from './RestaurantCard'

interface RestaurantGridProps {
  restaurants: Restaurant[]
}

export default function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No restaurants found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  )
}