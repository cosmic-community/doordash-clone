// app/restaurants/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getRestaurant, getMenuItems } from '@/lib/cosmic'
import RestaurantHeader from '@/components/RestaurantHeader'
import MenuSection from '@/components/MenuSection'

interface RestaurantPageProps {
  params: Promise<{ slug: string }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { slug } = await params
  
  const restaurant = await getRestaurant(slug)
  
  if (!restaurant) {
    notFound()
  }
  
  const menuItems = await getMenuItems(restaurant.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantHeader restaurant={restaurant} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <MenuSection restaurant={restaurant} menuItems={menuItems} />
      </div>
    </div>
  )
}