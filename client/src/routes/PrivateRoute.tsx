import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'
import { RootState } from '../store/types'

export default function ProtectedRoute() {
    const { user } = useSelector((state: RootState) => state.user)

    if (!user) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}
