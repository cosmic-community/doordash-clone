import Link from 'next/link'
import { Restaurant } from '@/types'

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const imageUrl = restaurant.metadata?.restaurant_image?.imgix_url
  const defaultImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=240&fit=crop'

  return (
    <Link href={`/restaurants/${restaurant.slug}`}>
      <div className="card overflow-hidden cursor-pointer">
        <div className="aspect-video relative">
          <img
            src={imageUrl ? `${imageUrl}?w=400&h=240&fit=crop&auto=format,compress` : defaultImage}
            alt={restaurant.metadata?.name || restaurant.title}
            className="w-full h-full object-cover"
            width="400"
            height="240"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-white px-2 py-1 rounded text-sm font-semibold text-gray-900">
              {restaurant.metadata?.delivery_time}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {restaurant.metadata?.name || restaurant.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span>{restaurant.metadata?.rating || 'New'}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span>${restaurant.metadata?.delivery_fee} delivery</span>
              <span>${restaurant.metadata?.minimum_order} min</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {restaurant.metadata?.description}
          </p>
          
          <div className="mt-2">
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {restaurant.metadata?.cuisine_type?.value}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}