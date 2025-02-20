import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { motion } from 'framer-motion'

import BrandsLoading from '../../components/LoadingScreen/BrandsLoading'

export default function Brands() {
  const [selectedBrandId, setSelectedBrandId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: brands, isLoading, error, refetch } = useQuery({
    queryKey: ['brands'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/brands'),
    select: (data) => data.data.data,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: 5000
  })

  const { data: brandDetails, isLoading: isBrandLoading } = useQuery({
    queryKey: ['brand', selectedBrandId],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${selectedBrandId}`),
    select: (data) => data.data.data,
    enabled: !!selectedBrandId,
  })

  const handleBrandClick = (brandId) => {
    setSelectedBrandId(brandId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBrandId(null)
  }

  if (isLoading) return <BrandsLoading />

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Product Brands
        </h1>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Failed to load brands
            </h2>
            <p className="text-red-700 mb-4">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {brands?.map((brand) => (
              <motion.div
                key={brand._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleBrandClick(brand._id)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-semibold text-white tracking-wide">
                    {brand.name}
                  </h3>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                  <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!error && !brands?.length && (
          <div className="text-center py-12 text-gray-500">
            No brands found
          </div>
        )}

        {/* Brand Details Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full relative p-6"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {isBrandLoading ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading brand details...</p>
                </div>
              ) : (
                brandDetails && (
                  <div className="p-8 text-center">
                    <div className="aspect-square mb-6">
                      <img
                        src={brandDetails.image}
                        alt={brandDetails.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {brandDetails.name}
                    </h2>
                    <p className="text-gray-600">Slug: {brandDetails.slug}</p>
                  </div>
                )
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}