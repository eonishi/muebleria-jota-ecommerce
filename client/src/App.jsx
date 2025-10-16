import { Route, Routes } from "react-router"
import Home from "components/Home/Home"
import Catalogo from "components/Catalogo/Catalogo"
import ContactoForm from "components/Forms/ContactoForm"
import Carrito from "components/Carrito/Carrito"
import ProductDetail from "components/ProductDetail"
import NotFound from "components/NotFound"
import AppLayout from "components/Layout/AppLayout"
import NuevoProductoForm from "components/Forms/NuevoProducto/NuevoProductoForm"
import AdminGuard from "guards/Admin"
import Login from "components/Login"
import { CartProvider } from "context/carrito"

function App() {
	return (
		<>
			<CartProvider>
			<Routes>
				<Route path='/' element={<AppLayout />}>
						<Route index element={<Home />}/>
						<Route path='catalogo' element={<Catalogo />}/>
						<Route path='contacto' element={<ContactoForm />} />
						<Route path='carrito' element={<Carrito />} />
						<Route path='producto/:id' element={<ProductDetail />} />
						<Route path='login' element={<Login />} />
						<Route element={<AdminGuard />}>
							<Route path='admin/crear-producto' element={<NuevoProductoForm/>} />
						</Route>
						<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
			</CartProvider>
		</>
	)
}

export default App
