import { Button, Input } from '@heroui/react'
import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Address() {
  const [isLoading, setIsLoading] = useState(false)
 const {cartId} =  useParams()
async function checkout(){
    setIsLoading(true)
  
  const {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +cartId,{
    shippingAddress:values
  },{
    headers:{
      token:localStorage.getItem("token")
    },params:{
      url: "https://fresh-cart-liart.vercel.app/#"
    }
  })
  setIsLoading(false)


  location.href= data.session.url
  
}


  const initialValues={
    details: "",
    city: "",
    phone:""
  }
 
  const validationSchema = Yup.object({
    details:Yup.string().required("Details is required"),
    city:Yup.string().required("City is required"),
    phone:Yup.string().required("Phone is required").matches(/^(\+20(10|11|12|15)\d{8}|0(10|11|12|15)\d{8})$/,"Invalid phone number")
  })
 
  const {values,handleChange,handleSubmit,errors,touched,handleBlur} = useFormik({
        initialValues,
        onSubmit :checkout,
        validationSchema
      })

    
        
      
        
  return (
    <div className='sm:w-2/3 mx-auto'>
      <h1 className='text-3xl font-bold'>Enter your Address</h1>
      <form onSubmit={handleSubmit}>
        <div className='py-5 grid md:grid-cols-2 gap-4'>
          <Input isInvalid={touched.details&&errors.details} errorMessage={errors.details} name='details' value={values.details} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2" label="Details" type="text" variant='borderd' />
          <Input isInvalid={touched.city&&errors.city} errorMessage={errors.city} name='city' value={values.city} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2" label="City" type="text" variant='borderd' />
          <Input isInvalid={touched.phone&&errors.phone} errorMessage={errors.phone} name='phone' value={values.phone} onChange={handleChange} onBlur={handleBlur} className="md:col-span-2" label="Phone" type="tel" variant='borderd' />
          <Button disabled={isLoading} type='submit' className="md:col-span-2" isLoading={isLoading} color="primary">
            Place order
          </Button>
          
        </div>
      </form> 
    </div>
  )
}
