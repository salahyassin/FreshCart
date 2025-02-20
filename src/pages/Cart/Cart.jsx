import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CartProduct from '../../components/CartProduct/CartProduct'
import { formatCurrency } from '../../services/currencyHelper'
import ProductCardSkeleton from '../../components/LoadingScreen/CartLoading'
import { Button } from '@heroui/react'
import EmptyCart from '../../components/EmptyCart/EmptyCart'
import { Link } from 'react-router-dom'

export default function Cart() {

  const [cartId, setCartId] = useState(null)
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [cartData, setCartData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  
  const [clearCartLoading, setClearCartLoading] = useState(false)

  useEffect(()=>{
    getUserCart()
  },[])

  


async  function getUserCart(){
  setIsLoading(true)
  const {data}= await axios('https://ecommerce.routemisr.com/api/v1/cart',{
    headers:{
      token:localStorage.getItem("token")
    }
  })
  setIsLoading(false)
  setCartId(data.cartId)
  setNumOfCartItems(data.numOfCartItems)
  setCartData(data.data)
}
async function removeSpecificCartItem(productId,setIsLoading){
  setIsLoading(true)
    const {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId ,{
      headers: {
        token:localStorage.getItem("token")
      }
    })
    setIsLoading(false)
    setCartId(data.cartId)
    setNumOfCartItems(data.numOfCartItems)
    setCartData(data.data)
}

async function clearCart(){
    
    setClearCartLoading(true)
    const {data} = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token: localStorage.getItem("token")
      }
    })
    console.log(data);
    setCartId(null)
    setNumOfCartItems(0)
    setCartData(null)
    setClearCartLoading(false)
    

}
  
async function updateProductCount(productId,count,setIncrementIsLoading,setDecrementIsLoading,currentCount){
  if(count>currentCount){
    setIncrementIsLoading(true)
  }
  if(count<currentCount){
    setDecrementIsLoading(true)
  }
  const {data}= await axios.put("https://ecommerce.routemisr.com/api/v1/cart/" +productId,{
    count
  },{
    headers:{
      token: localStorage.getItem('token')
    }
  })
  setIncrementIsLoading(false)
  setDecrementIsLoading(false)
  setCartId(data.cartId)
  setNumOfCartItems(data.numOfCartItems)
  setCartData(data.data)
}


  if(isLoading){
    return <ProductCardSkeleton/>
  }
  if(numOfCartItems==0){
    return <EmptyCart/>
  }
  return (
    <>
    <div className='flex justify-between'>
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items ({numOfCartItems})</h1>
      <Button isLoading={clearCartLoading} variant="bordered" color="danger" onPress={clearCart}  >Clear </Button>
    </div>
  <div className=" justify-center px-6 md:flex md:space-x-6 xl:px-0">
    <div className="rounded-lg md:w-2/3">
      {
        cartData?.products.map((product,index)=>{
          return <CartProduct key={index} product={product} removeSpecificCartItem={removeSpecificCartItem} updateProductCount={updateProductCount}/>
        })
      }
    </div>
    {/* Sub total */}
    <div className="sticky top-20 mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">{formatCurrency(cartData?.totalCartPrice)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">$4.99</p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className>
          <p className="mb-1 text-lg font-bold">{formatCurrency(cartData?.totalCartPrice +4.99)} USD</p>
          <p className="text-sm text-gray-700">including VAT</p>
        </div>
      </div>
      <Link to={"/address/"+cartId}  className="mt-6 w-full block text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
    </div>
  </div>
</>


  )
}
