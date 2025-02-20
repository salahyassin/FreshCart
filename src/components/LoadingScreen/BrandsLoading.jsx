import React from 'react'

export default function BrandsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-gray-200 rounded-xl shadow-lg h-48 animate-pulse"></div>
      ))}
    </div>
  )
}
