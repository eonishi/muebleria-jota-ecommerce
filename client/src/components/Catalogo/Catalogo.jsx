import useFetch from "hooks/useFetch.jsx"
import Buscador from "./Buscador"
import ProductCard from "./ProductCard.jsx"
import { useCartContext} from "context/carrito"
import { toast } from "sonner"
import FadeInGrid from "./FadeInGrid.jsx"
import { useSearchParams } from "react-router"
import { useDebounce } from "@uidotdev/usehooks"


export default function Catalogo() {
	const [searchParams, setSearchParams] = useSearchParams()
	const debouncedSearchParams = useDebounce(searchParams, 500)
  const { data, loading, error } = useFetch(`/api/productos?q=${debouncedSearchParams.get("q") || ""}`)
	const { addProduct } = useCartContext()

	if (error) {
		console.log(error)
		return <p>Lo sentimos hubo un error, vuelva pronto</p>
	}

	function handlerAddToCart(producto) {
		addProduct(producto)
		toast.success("Producto agregado al carrito")
	}

	return (
		<>
			<section className='catalogo-box'>
				<div className='titulo-container'>
					<h2 className='catalogo-titulo'>Productos</h2>
				</div>
				<Buscador setSearch={setSearchParams}/>
				<FadeInGrid>
					{loading ? (
						<p>Buscando productos...</p>
					) : (
						data.map((p) => (
								<ProductCard
									key={p.id}
                producto={p}
                addToCart={() => handlerAddToCart(p)}
								/>
						))
					)}
				</FadeInGrid>
			</section>
		</>
	)
}
