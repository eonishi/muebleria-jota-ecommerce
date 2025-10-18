import { Link } from "react-router"
import { stringifyPrice } from "utils/currency"

export default function ProductCard({ producto, addToCart }) {

  return (
    <article className='producto'>
      <Link to={`/producto/${producto.id}`}>
        <img src={`/assets/${producto.imagen}`} alt={ producto.product_name } />
        <h2>{ producto.product_name }</h2>
        <p>{ stringifyPrice(producto.price )}</p>
      </Link>
      <button
        className='btn'
        onClick={() => addToCart(producto)}
      >
        Añadir al carrito
      </button>
    </article>
  )
}