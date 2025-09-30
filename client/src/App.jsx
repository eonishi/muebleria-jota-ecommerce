import { actualizarCarrito } from "./carrito/cartHelper"
import NavBar from "components/NavBar"
import Footer from "./components/Footer"
import HeroBanner from "./components/HeroBanner"
import ProductosDestacados from "components/ProductosDestacados"

function App() {
	return (
		<>
			<NavBar />
			<main>
        <HeroBanner />
        <ProductosDestacados />
			</main>
      <Footer />
      
			<script src='inicio/inicio.js'></script>
			<script>{actualizarCarrito()}</script>
		</>
	)
}

export default App
