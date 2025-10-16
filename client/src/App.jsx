import { Route, Routes } from "react-router"
import Home from "components/Home/Home"
import Catalogo from "components/Catalogo/Catalogo"
import ContactoForm from "components/Forms/ContactoForm"
import Carrito from "components/Carrito/Carrito"
import ProductDetail from "components/ProductDetail"
import useCart from "hooks/useCart"
import NotFound from "components/NotFound"
import AppLayout from "components/Layout/AppLayout"
import NuevoProductoForm from "components/Forms/NuevoProducto/NuevoProductoForm"
import AdminGuard from "guards/Admin"
import Login from "components/Login"

function App() {
	// Estado del carrito
	const carrito = useCart()

	return (
		<>
			<Routes>
				<Route path='/' element={<AppLayout cart={carrito} />}>
						<Route index element={<Home />}/>
						<Route path='catalogo' element={<Catalogo cart={carrito} />}/>
						<Route path='contacto' element={<ContactoForm />} />
						<Route path='carrito' element={<Carrito cart={carrito} />} />
						<Route path='producto/:id' element={<ProductDetail cart={carrito} />} />
						<Route path='login' element={<Login />} />
						<Route element={<AdminGuard />}>
							<Route path='admin/crear-producto' element={<NuevoProductoForm/>} />
						</Route>
						<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
