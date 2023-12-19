import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const NotFound = ({ is_admin }) => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname.includes("admin")) {
      navigate("/admin")
    }
  }, [])
  return (
    <div>
      <h1>Not Found</h1>
    </div>
  )
}

export default NotFound