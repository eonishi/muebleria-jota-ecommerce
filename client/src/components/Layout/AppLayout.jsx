import { Outlet } from "react-router"
import Footer from "./Footer"
import NavBar from "./NavBar"
import { Toaster } from 'sonner'
import { CartProvider } from 'context/carrito'

export default function AppLayout() {
	return (
		<>
			<CartProvider>

      <NavBar />
			<main>
				<Outlet />
			</main>
			</CartProvider>
			<Toaster />
			<Footer />
		</>
	)
}
