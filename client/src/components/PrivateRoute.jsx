import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {

    const { currentUser } = useSelector(state => state.user);
   
  return (
     currentUser ? <Outlet /> : <Navigate to='/sign-in' />         /* protecting our profile page ---> means that the user can go to profile page only if he is authenticated */
  )
}
