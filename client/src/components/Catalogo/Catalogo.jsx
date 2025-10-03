import { useEffect, useState } from 'react'
import Buscador from './Buscador'
import ProductCard from './ProductCard.jsx'

export default function Catalogo() {
  	const [productos, setProductos] = useState([])
		useEffect(() => {
      const url = "/api/productos"
			fetch(url)
				.then((res) => res.json())
				.then((data) => {
          setProductos(data)
				})
				.catch((err) => console.error("Error fetching products:", err))
		}, [])

  return (
    <>
       <section className="catalogo-box">
        <div className="titulo-container">
          <h2 className="catalogo-titulo">Productos</h2>
        </div>
        <Buscador />
        <div className="productos-grid" id="productos-grid">
          {productos.map(p => <ProductCard key={p.id} {...p} />)}
        </div>
      </section>
    </>
  )
}
