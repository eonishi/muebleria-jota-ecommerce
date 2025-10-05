import { useEffect, useState } from "react"
import NavBar from "components/NavBar"
import Footer from "components/Footer"
import Home from "components/Home"
import Catalogo from "components/Catalogo/Catalogo"
import Contacto from "components/Contacto"
import Carrito from "components/Carrito/Carrito"
import useCart from "hooks/useCart"

// Simulo un enum de las rutas disponibles
const Routes = {
	HOME: "/",
	CATALOGO: "/catalogo",
	CARRITO: "/carrito",
	CONTACTO: "/contacto",
}

function App() {
	// Estado para las rutas
	const [currentRoute, setCurrentRoute] = useState(() => window.location.pathname)
	// Estado del carrito
	const carrito = useCart()

	return (
		<>
			<NavBar routes={Routes} navigate={setCurrentRoute} cart={carrito} />
			<main>
				{currentRoute === Routes.HOME && <Home />}
				{currentRoute === Routes.CATALOGO && <Catalogo cart={carrito} />}
				{currentRoute === Routes.CONTACTO && <Contacto />}
				{currentRoute === Routes.CARRITO && <Carrito cart={carrito}/>}
			</main>
			
			<Footer />
		</>
	)
}

export default App
