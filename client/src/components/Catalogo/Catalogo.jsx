import useFetch from "hooks/useFetch.jsx"
import Buscador from "./Buscador"
import FilterBar from "./FilterBar.jsx"
import ProductCard from "components/ui/ProductCard.jsx"
import { useCartContext } from "context/carrito"
import FadeInGrid from "./FadeInGrid.jsx"
import { useSearchParams } from "react-router"
import { useDebounce } from "@uidotdev/usehooks"

export default function Catalogo() {
	const [searchParams, setSearchParams] = useSearchParams()
	const debouncedSearchParams = useDebounce(searchParams, 500)
	const { data, loading, error } = useFetch(
		`/api/productos?q=${debouncedSearchParams.get("q") || ""}`
	)
	const { addProduct } = useCartContext()

	if (error) {
		console.log(error)
		return <p>Lo sentimos hubo un error, vuelva pronto</p>
	}

	return (
		<section className='max-w-350 md:mt-25 mx-auto gap-5 flex flex-col items-center justify-center px-5 '>
			<div className='w-full flex justify-center p-7'>
				<h2 className='text-center font-title text-primary md:text-7xl text-5xl font-medium tracking-wider'>
					Productos
				</h2>
			</div>
			<FilterBar>
				<Buscador setSearch={setSearchParams} />
			</FilterBar>
			<FadeInGrid>
				{loading ? (
					<p>Buscando productos...</p>
				) : (
					data.map((p) => (
						<ProductCard
							key={p.id}
							producto={p}
							addToCart={() => addProduct(p)}
						/>
					))
				)}
			</FadeInGrid>
		</section>
	)
}
