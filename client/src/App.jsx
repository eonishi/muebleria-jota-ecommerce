import { createBrowserRouter } from "react-router"
import AppLayout from "components/Layout/AppLayout"
import AdminGuard from "guards/Admin"
import { Catalogo, Contacto, ProductDetail, Carrito, Login, Home, NotFound, NuevoProducto } from "pages"

export const appRouter = createBrowserRouter([
	{
		Component: AppLayout,
		children: [
			{ index: true, Component: Home },
			{ path: 'catalogo', Component: Catalogo },
			{ path: 'contacto', Component: Contacto },
			{ path: 'producto/:id', Component: ProductDetail },
			{ path: 'carrito', Component: Carrito },
			{ path: 'login', Component: Login },
			{
				path: 'admin',
				Component: AdminGuard,
				children: [
				{ path: 'crear-producto', Component: NuevoProducto },
			]},
			{ path: '*', Component: NotFound},
		],
	},
])
