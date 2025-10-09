import { Link } from "react-router"

export default function ProductCard({ producto, addToCart }) {

  return (
    <article className='producto'>
      <Link to={`/producto/${producto.id}`}>
        <img src={`/assets/${producto.imagen}`} alt={ producto.product_name } />
        <h2>{ producto.product_name }</h2>
        <p>{ producto.price }</p>
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