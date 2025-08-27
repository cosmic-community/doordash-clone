import { Restaurant } from '@/types'

interface RestaurantHeaderProps {
  restaurant: Restaurant
}

export default function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const imageUrl = restaurant.metadata?.restaurant_image?.imgix_url
  const defaultImage = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop'

  return (
    <div className="relative">
      <div className="h-64 md:h-80 relative">
        <img
          src={imageUrl ? `${imageUrl}?w=1200&h=400&fit=crop&auto=format,compress` : defaultImage}
          alt={restaurant.metadata?.name || restaurant.title}
          className="w-full h-full object-cover"
          width="1200"
          height="400"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {restaurant.metadata?.name || restaurant.title}
          </h1>
          
          <p className="text-lg mb-4 text-gray-200">
            {restaurant.metadata?.description}
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span>{restaurant.metadata?.rating || 'New'}</span>
            </div>
            
            <span>• {restaurant.metadata?.delivery_time}</span>
            <span>• ${restaurant.metadata?.delivery_fee} delivery fee</span>
            <span>• ${restaurant.metadata?.minimum_order} minimum</span>
          </div>
        </div>
      </div>
    </div>
  )
}