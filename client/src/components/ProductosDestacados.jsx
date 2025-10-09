import useFetch from "hooks/useFetch"

export default function ProductosDestacados() {
	const { data, loading, error } = useFetch('/api/productos')
	
	if (error) {
		console.log(error)
		return(<div>Ocurrio un problema</div>)
	}
	
	return (
		<>
			<section className='section-box'>
				<h2>Productos Destacados</h2>
				<div className='productos-container'>
					{loading ?
						(<p>cargando</p>) :
						(<ShowProd products={data} />)
					}
				</div>
			</section>
		</>
	)
}

function ShowProd({ products }) {
	const productsToShow = products.slice(0,3) // Mostrar solo los primeros 3 productos
	const listProd = productsToShow.map((p) => <ProdCard p={p} key={p.id} />)
	return listProd
}

function ProdCard({p}) {
	return (
		<>
			<article className='producto'>
				<a href={"/producto/" + p.id}>
					<img
						src={`/assets/${p.imagen}`}
						alt={p.product_name}
					/>
					<h2> {p.product_name} </h2>
				</a>
			</article>
		</>
	)
}