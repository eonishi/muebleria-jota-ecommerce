import { useEffect, useState } from "react"

export default function ProductosDestacados() {
	const [productos, setProductos] = useState([])
	useEffect(() => {
		const url = "/api/productos"
		fetch(url)
			.then(res => res.json())
			.then(data => {
				setProductos(data)
			})
			.catch(err => console.error("Error fetching products:", err))
	}, [])
	
	return (
		<>
			<section className='section-box'>
				<h2>Productos Destacados</h2>
				<div className='productos-container'>
					{productos.length === 0 ?
						(<p>cargando</p>) :
						(<ShowProd products={productos} />)
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