export default function Hero() {
  return (
    <section className="bg-primary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Food delivery from your favorite restaurants
        </h1>
        <p className="text-xl mb-8 text-red-100">
          Order from hundreds of local restaurants and get fast delivery to your door
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex bg-white rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Enter your delivery address"
              className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 outline-none"
            />
            <button className="bg-primary-dark hover:bg-red-800 px-6 py-3 text-white font-semibold transition-colors">
              Find Food
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}