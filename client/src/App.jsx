import { useEffect, useState } from "react"
import NavBar from "components/NavBar"
import Footer from "components/Footer"
import Home from "components/Home"
import Catalogo from "components/Catalogo/Catalogo"
import Contacto from "components/Contacto"
import Carrito from "components/Carrito/Carrito"
import ProductDetail from "components/ProductDetail"
import useCart from "hooks/useCart"
import NotFound from "components/NotFound"

// Simulo un enum de las rutas disponibles
const Routes = {
	HOME: "/",
	CATALOGO: "/catalogo",
	CARRITO: "/carrito",
	CONTACTO: "/contacto",
	PRODUCTO: /^\/producto\/[^/]+$/
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
				{currentRoute === Routes.CARRITO && <Carrito cart={carrito} />}
				{Routes.PRODUCTO.test(currentRoute) && <ProductDetail cart={carrito} />}
				{// Temporal hasta React Router - NotFound
					Object.values(Routes).every((r) => r !== currentRoute) &&
					!Routes.PRODUCTO.test(currentRoute) &&
					<NotFound/>
				}
			</main>
			
			<Footer />
		</>
	)
}

export default App
