import useFetch from 'hooks/useFetch.jsx'
import Buscador from './Buscador'
import ProductCard from './ProductCard.jsx'
import { useCartContext } from "context/carrito"

export default function Catalogo() {
  const { addProduct } = useCartContext()

  const { data, loading, error } = useFetch('/api/productos')
  
  if (error) {
    console.log(error)
    return (<p>Lo sentimos hubo un error, vuelva pronto</p>)
  }

  return (
    <>
       <section className="catalogo-box">
        <div className="titulo-container">
          <h2 className="catalogo-titulo">Productos</h2>
        </div>
        <Buscador />
        <div className="productos-grid" id="productos-grid">
          {loading ?
            <p>Buscando productos...</p>
            : data.map(p => <ProductCard key={p.id} producto={p} addToCart={addProduct} />)
          }
        </div>
      </section>
    </>
  )
}
