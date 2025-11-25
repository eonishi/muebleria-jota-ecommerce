import { Outlet, Navigate } from "react-router"
import { useAuthContext } from "context/auth"

export default function UserGuard() {
  const { isAuth, loading } = useAuthContext()
  if (loading) {
    return (<p>Cargando...</p>)
  } else {
    console.log(isAuth)
    return (isAuth ? <Outlet /> : <Navigate to="/login" replace />)
  }
}
