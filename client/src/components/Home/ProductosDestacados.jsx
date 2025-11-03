import useFetch from "hooks/useFetch"
import { useCartContext } from "context/carrito"
import { Suspense } from "react"
import ProductCard from "components/ui/ProductCard"

export default function ProductosDestacados() {
	const { data, loading, error } = useFetch("/api/productos?r=true")
	const { addProduct } = useCartContext()

	if (error) {
		console.log(error)
		return <div>Ocurrio un problema</div>
	}

	return (
		<Suspense>
			<section className='flex flex-col justify-center items-center mx-auto overflow-hidden max-w-350'>
				<h3 className='text-4xl font-semibold  font-title tracking-wider text-primary p-5 text-center text-balance'>
					Selección para ti
				</h3>
				<p className="pb-10 text-pretty font-body font-light text-center text-home-100/60">
					Cada pieza pensada para darle vida a tu hogar.
				</p>
				<div className='grid grid-cols-(--auto-colums) w-full gap-10 px-10'>
					{loading ? (
						<div>Cargando</div>
					) : (
						data.slice(0, 4).map((p) => (
							<ProductCard
								producto={p}
								key={p.id}
								addToCart={() => addProduct(p)}
							/>
						))
					)}
				</div>
			</section>
		</Suspense>
	)
}
