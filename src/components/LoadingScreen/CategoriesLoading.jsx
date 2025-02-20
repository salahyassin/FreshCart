export default function CategoriesSkeleton() {
    return (
      <div className="container mx-auto p-4">
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={i}
              className="group relative overflow-hidden rounded-lg shadow-md animate-pulse"
            >
              <div className="w-full h-64 bg-gray-200"></div>
              <div className="absolute inset-0 bg-gray-300 bg-opacity-40 flex items-center justify-center">
                <div className="h-6 bg-gray-400 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }