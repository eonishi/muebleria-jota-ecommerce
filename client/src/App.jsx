import { useEffect, useState } from "react"
import { actualizarCarrito } from "./carrito/cartHelper"
import NavBar from "components/NavBar"
import Footer from "components/Footer"
import Home from "components/Home"
import Catalogo from "components/Catalogo/Catalogo"
import Contacto from "components/Contacto"

// Simulo un enum de las rutas disponibles
const Routes = {
	HOME: "Home",
	CATALOGO: "Catalogo",
	CARRITO: "Carrito",
	CONTACTO: "Contacto",
}

function App() {
	const [currentRoute, setCurrentRoute] = useState(Routes.HOME)
	useEffect(() => {
		console.log("Navegando a la ruta:", currentRoute)
	},[currentRoute])

	return (
		<>
			<NavBar routes={Routes} navigate={setCurrentRoute} />
			<main>
				{currentRoute === Routes.HOME && <Home />}
				{currentRoute === Routes.CATALOGO && <Catalogo />}
				{currentRoute === Routes.CONTACTO && <Contacto />}
			</main>
			
			<Footer />
			<script>{actualizarCarrito()}</script>
		</>
	)
}

export default App
