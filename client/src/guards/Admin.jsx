import { Outlet, Navigate } from "react-router";
import { useAuthContext } from "context/auth"

export default function AdminGuard() {
  const { isAuth, user, loading } = useAuthContext()
  const isAdmin = user?.role === 'admin' && isAuth

  if (loading) {
    return (<p>Cargando...</p>)
  } else {

    return isAdmin ? <Outlet /> : <Navigate to="/login" replace />
  }
}
