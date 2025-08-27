'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
  onFilterChange?: (categorySlug: string | null) => void
}

export default function CategoryFilter({ categories, onFilterChange }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    setSelectedCategory(categoryParam)
    if (onFilterChange) {
      onFilterChange(categoryParam)
    }
  }, [searchParams, onFilterChange])

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug)
    
    // Update URL params
    const params = new URLSearchParams(searchParams.toString())
    if (categorySlug) {
      params.set('category', categorySlug)
    } else {
      params.delete('category')
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/'
    router.push(newUrl, { scroll: false })
    
    if (onFilterChange) {
      onFilterChange(categorySlug)
    }
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All Categories
      </button>
      
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.slug)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.slug
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.metadata.name}
        </button>
      ))}
    </div>
  )
}