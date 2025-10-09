import { Outlet } from "react-router"
import Footer from "./Footer"
import NavBar from "./NavBar"

export default function AppLayout({cart}) {
	return (
		<>
      <NavBar cart={cart} />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}
