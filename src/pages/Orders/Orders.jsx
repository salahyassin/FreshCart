import React, { useContext } from 'react'
import { authContext } from '../../contexts/authContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import OrdersLoadingScreen from '../../components/LoadingScreen/OrdersLoadingScreen'

const statusOptions = ['delivered', 'processing', 'shipped', 'cancelled']

const getStatusBadge = (status) => {
  switch (status) {
    case 'delivered':
      return { 
        class: 'bg-green-100 text-green-800',
        text: 'Delivered',
        icon: '✅'
      }
    case 'processing':
      return { 
        class: 'bg-yellow-100 text-yellow-800',
        text: 'Processing',
        icon: '⏳'
      }
    case 'cancelled':
      return { 
        class: 'bg-red-100 text-red-800',
        text: 'Cancelled',
        icon: '❌'
      }
    case 'shipped':
      return { 
        class: 'bg-blue-100 text-blue-800',
        text: 'Shipped',
        icon: '🚚'
      }
    default:
      return { 
        class: 'bg-gray-100 text-gray-800',
        text: 'Unknown',
        icon: '❓'
      }
  }
}

export default function Orders() {
    const { userId } = useContext(authContext)
    
    const { data = [], isLoading } = useQuery({
        queryKey: ['allOrders'],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`),
        select: (res) => res.data,
    })

    if (isLoading) return <OrdersLoadingScreen />

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Order History</h1>
                
                {data.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-500 text-lg mb-4">📦</div>
                        <p className="text-gray-600 text-xl">No orders found.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {data.map((order) => {
                            const statusBadge = getStatusBadge(statusOptions[Math.floor(Math.random() * statusOptions.length)])
                            
                            return (
                                <div key={order.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
                                    {/* Order Header */}
                                    <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-6">
                                        <div className="mb-4 md:mb-0">
                                            <h2 className="text-2xl font-semibold text-gray-900">
                                                Order # {order.id}
                                            </h2>
                                            <p className="text-gray-500 text-sm mt-1">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge.class}`}>
                                                {statusBadge.icon} {statusBadge.text}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Order Details */}
                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Information</h3>
                                            <p className="text-gray-600">
                                                Method: <span className="font-medium">{order.paymentMethodType}</span>
                                            </p>
                                            <p className="text-gray-600">
                                                Total: <span className="font-medium">${order.totalOrderPrice}</span>
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Address</h3>
                                            <p className="text-gray-600">
                                                {order.shippingAddress?.city}<br/>
                                                {order.shippingAddress?.details}<br/>
                                                Phone: {order.shippingAddress?.phone}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Products */}
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Products ({order.cartItems.length})</h3>
                                    <div className="space-y-4">
                                        {order.cartItems.map((item) => (
                                            <div key={item._id} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                                <img 
                                                    src={item.product.imageCover} 
                                                    alt={item.product.title}
                                                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                                                />
                                                <div className="ml-4 flex-1">
                                                    <h4 className="font-medium text-gray-900">{item.product.title}</h4>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                                                        <p>Price: ${item.price}</p>
                                                        <p>Quantity: {item.count}</p>
                                                    </div>
                                                </div>
                                                <Link 
                                                    to={`/productDetails/${item.product._id}`}
                                                    className="ml-4 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                                >
                                                    View Product
                                                    <svg 
                                                        className="w-4 h-4 ml-2" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path 
                                                            strokeLinecap="round" 
                                                            strokeLinejoin="round" 
                                                            strokeWidth={2} 
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3" 
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}