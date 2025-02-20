import { Button, Input } from '@heroui/react'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from "yup"
import axios from 'axios';
import { Await, Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const navigate= useNavigate()
const {setIsLoggedIn}=  useContext(authContext)
  const initialValues={
    email:"salahyassin142004@gmail.com",
    password:"12345678",
  }
 function onSubmit(values){
    setIsLoading(true)
    setErrMsg("")
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values).then(({data})=>{
      if(data.message=="success"){
        localStorage.setItem("token",data.token)
        setIsLoggedIn(true)
        navigate('/')
      }
    }).catch((err)=>{
      setErrMsg(err.response.data.message);
      
    }).finally(()=>{
    setIsLoading(false)

    })
    
    
  }
  const validationSchema = Yup.object({
    
    email:Yup.string().required("Email is required").email("Invalid email address"),
    password:Yup.string().required("Password is required").min(8,"Password is too short"),
  })
  
  const {values,handleChange,handleSubmit,errors,touched,handleBlur} = useFormik({
        initialValues,
        onSubmit,
        validationSchema
      })

    
      
  return (
    <div className='sm:w-2/3 mx-auto'>
      <h1 className='text-3xl font-bold'>Login Now</h1>
      <form onSubmit={handleSubmit}>
        <div className='py-5 grid  gap-4'>
          
          <Input isInvalid={touched.email&&errors.email} errorMessage={errors.email} name='email' value={values.email} onChange={handleChange} onBlur={handleBlur}  label="Email" type="email" variant='borderd' />
          <Input isInvalid={touched.password&&errors.password} errorMessage={errors.password} name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} label="Password" type="password" variant='borderd' />
          <Button disabled={isLoading} type='submit'  isLoading={isLoading} color="primary">
            Login
          </Button>
        <Link to="/forgotpassword" className="text-blue-500 text-sm hover:underline">
          Forgot Password?
        </Link>

          {errMsg&&<p className='text-red-500 text-sm'>{errMsg}</p>}
        </div>
      </form> 
    </div>
  )
}