import React, { Children } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { UserAuth } from '../lib/contexts/AuthContext'
export default function ProtectedRoute(  ) {
    const {user} = UserAuth()

    console.log(user)

    if (!user) {
        return <Navigate to='/login' />
    }

    return(
       <Outlet/>
    ) 
    
}
