import { Outlet, ScrollRestoration } from "react-router"
import Footer from "./Footer"
import NavBar from "./NavBar"
import { Toaster } from 'sonner'
import { CartProvider } from 'context/carrito'

export default function AppLayout() {
  return (
    <>
      <ScrollRestoration />
      <CartProvider>

        <NavBar />
        <main className="grow min-h-dvh">
          <Outlet />
        </main>
      </CartProvider>
      <Toaster />
      <Footer />
    </>
  )
}
