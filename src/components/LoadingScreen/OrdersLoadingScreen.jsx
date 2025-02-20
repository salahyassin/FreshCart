export default function OrdersLoadingScreen() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-10 bg-gray-300 rounded w-1/4 mx-auto mb-12"></div>
                    
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm p-6 mb-8">
                            {/* Order Header Skeleton */}
                            <div className="flex justify-between items-center border-b pb-4 mb-6">
                                <div>
                                    <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                </div>
                                <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                            </div>

                            {/* Details Skeleton */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                {[...Array(2)].map((_, i) => (
                                    <div key={i}>
                                        <div className="h-5 bg-gray-300 rounded w-36 mb-3"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/5"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Products Skeleton */}
                            <div className="h-5 bg-gray-300 rounded w-48 mb-4"></div>
                            <div className="space-y-4">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                        <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                                        <div className="ml-4 flex-1 space-y-2">
                                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                        <div className="ml-4 h-4 bg-gray-300 rounded w-20"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}