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
			<section className='flex flex-col justify-center items-center'>
				<h3 className='text-4xl font-semibold  font-title tracking-wider text-primary p-5 text-center'>
					Selección para ti
				</h3>
				<p className="pb-10 text-pretty font-body font-light text-center text-home-100/60">
					Cada pieza pensada para darle vida a tu hogar.
				</p>
				<div className='flex justify-center items-center flex-wrap gap-5'>
					{loading ? (
						<div>Cargando</div>
					) : (
						data.slice(0, 3).map((p) => (
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
