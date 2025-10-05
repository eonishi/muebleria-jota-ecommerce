
export default function ProductCard({ producto, addToCart }) {

  return (
    <article className='producto'>
      <a href={`/producto/${producto.id}`}>
        <img src={`/assets/${producto.imagen}`} alt={ producto.product_name } />
        <h2>{ producto.product_name }</h2>
        <p>{ producto.price }</p>
      </a>
      <button
        className='btn'
        onClick={() => addToCart(producto)}
      >
        Añadir al carrito
      </button>
    </article>
  )
}