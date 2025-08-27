'use client'

import { useState } from 'react'

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', searchTerm)
  }

  return (
    <div className="relative min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=2000&h=1000&fit=crop&auto=format,compress"
          alt="Delicious food background"
          className="w-full h-full object-cover"
          width="2000"
          height="1000"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Delicious Food Delivered
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Order from your favorite local restaurants and get it delivered fast
        </p>
        
        {/* Search form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="flex rounded-lg overflow-hidden shadow-lg">
            <input
              type="text"
              placeholder="Enter your address or restaurant name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark px-6 py-3 font-semibold transition-colors"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Stats or features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-200">Partner Restaurants</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">30min</div>
            <div className="text-gray-200">Average Delivery</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-200">Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  )
}