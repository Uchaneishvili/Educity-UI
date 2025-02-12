import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader } from '../components/UI/Loader/Loader'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <Loader />
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: window.location.pathname }} />
  )
}

export default ProtectedRoute
