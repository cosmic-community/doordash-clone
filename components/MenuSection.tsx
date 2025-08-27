import { Restaurant, MenuItem } from '@/types'
import MenuItemCard from './MenuItemCard'

interface MenuSectionProps {
  restaurant: Restaurant
  menuItems: MenuItem[]
}

export default function MenuSection({ restaurant, menuItems }: MenuSectionProps) {
  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No menu items available</p>
      </div>
    )
  }

  // Group menu items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const categoryName = item.metadata?.category?.metadata?.name || 'Other'
    if (!acc[categoryName]) {
      acc[categoryName] = []
    }
    acc[categoryName].push(item)
    return acc
  }, {} as Record<string, MenuItem[]>)

  return (
    <div className="space-y-8">
      {Object.entries(groupedItems).map(([categoryName, items]) => (
        <section key={categoryName}>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {categoryName}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <MenuItemCard 
                key={item.id} 
                menuItem={item} 
                restaurant={restaurant}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}