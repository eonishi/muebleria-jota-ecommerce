import { useState } from "react"
import useFetch from "hooks/useFetch"
import { useParams, useNavigate } from "react-router"
import { useCartContext } from "context/carrito"
import { stringifyPrice } from "utils/currency"
import { Image } from "@unpic/react"
import Contador from "components/ui/Contador"
import InfoTable from "components/ui/InfoTable"
import ProductosDestacados from "components/Home/ProductosDestacados"
import RatingStar from "components/ui/RatingStar"
import ReviewList from "components/ui/ReviewList"
import Separator from "components/ui/Separator"

export default function ProductDetail() {
	const [count, setCount] = useState(1)
	const { addProduct } = useCartContext()
	const { id } = useParams()
	const { data: product, loading, error } = useFetch(`/api/productos/${id}`)
	const navigate = useNavigate()

	if (loading) {
		return <div>Cargando...</div>
	}

	if (error) {
		console.log(error)
		return navigate("/404")
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
					navigate("/catalogo", { state: { prefetch: true } })
				})
				.catch((err) => toast.error(err.message))
		}
	}

	return (
		<section className='max-w-350 md:mt-30 mx-auto text-home-100 font-body'>
			<div className='grid grid-cols-1 lg:grid-cols-2 '>
				<div className='lg:relative lg:size-full col-span-2 lg:col-span-1 p-5'>
					<div className='lg:sticky lg:top-0 bg-neutral-100 shadow-lg'>
						<div className='relative'>
							{product.discount && (
								<span className='absolute top-5 left-5 bg-accent px-5 py-2 text-center text-neutral-50'>
									-{product.discount}%
								</span>
							)}
						</div>
						<Image
							src={`/assets/${product.imagen}`}
							alt={product.product_name}
							layout='fixed'
							className='object-cover w-full h-full'
						/>
					</div>
				</div>

				<div className='flex flex-col items-start p-5 gap-7'>
					<h1 className='font-medium text-5xl tracking-wide w-full bg-fg-100 p-5 '>
						{product.product_name}
					</h1>
					<p className='font-extrabold text-2xl text-primary'>
						{stringifyPrice(product.price)}
					</p>

					<RatingStar />

					<p className='text-md text-pretty text-home-100/60'>
						{product.description}
					</p>

					<div className='flex gap-10 flex-wrap  items-center justify-start w-full sm:w-fit'>
						<Contador
							count={count}
							onIncrease={() => setCount(count + 1)}
							onDecrease={() => setCount(count - 1)}
						/>
						<button
							type='button'
							className='cursor-pointer bg-detail hover:bg-detail-200 hover:scale-105 focus:outline focus:outline-detail
								active:scale-100 transition-[background-color,scale] text-neutral-50 sm:p-5 p-4 text-center'
							onClick={() => addProduct(product, count)}
						>
							Añadir al carrito
						</button>
					<button
						className='cursor-pointer bg-accent-700 
							hover:bg-red-700 hover:scale-105 focus:outline focus:outline-red-900
								active:outline-red-800
								active:scale-100 transition-[background-color,scale] text-neutral-50 
								p-4 sm:p-5 text-center'
						onClick={handleRemoveProduct}
					>
						Eliminar Producto
					</button>
					</div>

					<Separator />
					<div className='w-full flex flex-col gap-3'>
						<h3 className='font-medium text-xl'>Especificaciones</h3>
						<InfoTable data={product.specifications} />
					</div>

					<Separator />

					<div className='w-full flex flex-col gap-3'>
						<h3 className='font-medium text-xl'>Opiniones del producto</h3>
						<ReviewList />
					</div>
				</div>

				<Separator className="col-span-2"/>
			</div>

		</section>
	)
}
