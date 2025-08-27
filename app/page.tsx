import { getRestaurants, getCategories } from '@/lib/cosmic'
import RestaurantGrid from '@/components/RestaurantGrid'
import CategoryFilter from '@/components/CategoryFilter'
import Hero from '@/components/Hero'

export default async function HomePage() {
  const [restaurants, categories] = await Promise.all([
    getRestaurants(),
    getCategories()
  ])

  return (
    <div>
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CategoryFilter categories={categories} />
        
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Restaurants Near You
          </h2>
          <RestaurantGrid restaurants={restaurants} />
        </section>
      </div>
    </div>
  )
}