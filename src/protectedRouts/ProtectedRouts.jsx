import React, { useContext } from 'react'
import { authContext } from '../contexts/authContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouts({children}) {

const {isLoggedIn}= useContext(authContext)

  
  return isLoggedIn ?children: <Navigate to={"/login"}/>
    
  
}