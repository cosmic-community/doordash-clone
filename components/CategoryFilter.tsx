'use client'

import { Category } from '@/types'
import { useState } from 'react'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => setSelectedCategory('all')}
        className={`px-4 py-2 rounded-full font-medium transition-colors ${
          selectedCategory === 'all'
            ? 'bg-primary text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.slug)}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === category.slug
              ? 'bg-primary text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {category.metadata?.name}
        </button>
      ))}
    </div>
  )
}