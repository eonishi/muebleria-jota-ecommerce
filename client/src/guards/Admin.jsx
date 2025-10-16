import { Outlet, Navigate } from "react-router";

export default function AdminGuard() { 
  // TODO: Implemenatr cuando veamos autenticación 😴
  const isAdmin = true
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />
}