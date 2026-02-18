import { Outlet, Navigate } from "react-router-dom"
import {useSelector} from 'react-redux'
import { useEffect } from "react"

function ProtectedRoute({ isAuthenticated }) {
    const {userInfo, orgzInfo} = useSelector(state => state.authReducer)
//   const navigate = useNavigate()
    // useEffect(() => {
    //     console.log('userInfo-', userInfo)
    // },[userInfo])
  if (!isAuthenticated) {
    // navigate('/admin/login')
    return <Navigate to='/admin/login' replace />
  }

  return <Outlet/>
}

export default ProtectedRoute