import { Outlet } from "react-router"
import Footer from "./Footer"
import NavBar from "./NavBar"

export default function AppLayout() {
	return (
		<>
      <NavBar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}
