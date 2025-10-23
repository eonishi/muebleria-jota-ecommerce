import "src/styles/producto.css"
import useFetch from "hooks/useFetch"
import { useParams, Link, useNavigate } from "react-router"
import { useCartContext } from "context/carrito"
import { stringifyPrice } from "utils/currency"
import { toast } from "sonner"

export default function ProductDetail() {
	const { addProduct } = useCartContext()
	const { id } = useParams()
	const { data: product, loading, error } = useFetch(`/api/productos/${id}`)
	const navigate = useNavigate()

	if (loading) {
		return <div>Cargando...</div>
	}

	if (error) {
		console.log(error)
		return <div>Ocurrio un error</div>
	}

	function handleAddProduct() {
		addProduct(product)
		toast.success(`${product?.product_name} agregado al carrito`)
	}

	function handleRemoveProduct() {
		const confirmacion = window.confirm(
			"¿Seguro que quieres eliminar este producto?"
		)
		if (confirmacion) {
			const res = fetch(`/api/productos/${id}`, { method: "DELETE" })
				.then((res) => {
					if (!res.ok) {
						toast.error("Error al eliminar el producto")
					}
					toast.success("Producto eliminado correctamente")
          navigate("/catalogo", {state: {prefetch: true}})
        })
				.catch((err) => toast.error(err.message))
		}
	}

	return (
		<section
			id='detalle-producto'
			className='detalle-producto'
		>
			<Link to={-1} viewTransition >
				<i
					className='fa-solid fa-arrow-left fa-2x'
					aria-hidden='true'
				/>
			</Link>
			<img
				src={`/assets/${product.imagen}`}
				alt={product.product_name}
			/>
			<div className='info'>
				<h1>{product.product_name}</h1>
				<p>{product.description}</p>
				<p className='precio'>{stringifyPrice(product.price)}</p>
				<button
					id='add-to-cart'
					className='add-cart-btn'
					onClick={handleAddProduct}
				>
					Añadir al carrito
				</button>

				{product.specifications &&
					Object.keys(product.specifications).map((key) => (
						<p key={key}>
							<strong>{key}:</strong>
							{product.specifications[key]}
						</p>
					))}

				<button
					className='btn btn-eliminar'
					onClick={handleRemoveProduct}
				>
					Eliminar Producto
				</button>
			</div>
		</section>
	)
}
