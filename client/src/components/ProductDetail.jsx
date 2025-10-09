import 'src/styles/producto.css'
import useFetch from "hooks/useFetch"
import { useParams } from 'react-router'


export default function ProductDetail({cart}) {
  const { id } = useParams()
  const { data:product, loading, error } = useFetch(`/api/productos/${id}`)
  
  if (loading) {
    return (<div>Cargando...</div>)
  }

  if (error) {
    console.log(error)
    return (<div>Ocurrio un error</div>)
  }
  
  return (
      <section id="detalle-producto" className="detalle-producto">
        <img src={`/assets/${product.imagen}`} alt={product.product_name} />
        <div className="info">
          <h1>{product.product_name}</h1>
          <p>{product.description}</p>
          <p className="precio">{product.price}</p>
          <button
            id="add-to-cart"
            className="add-cart-btn"
            onClick={() => {cart.addProduct(product)}}
          >
            Añadir al carrito
          </button>

          {
            product.specifications &&
            Object.keys(product.specifications)
              .map((key) => (
                <p key={key}>
                  <strong>{key}:</strong>{product.specifications[key]}
                </p>
              ))
          }
        </div>
      </section>
  )
}