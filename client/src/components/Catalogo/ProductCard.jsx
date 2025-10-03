
export default function ProductCard({product_name, imagen, price}) {
  return (
    <article className='producto'>
      <a>
        <img src={`/src/assets/${imagen}`} alt={ product_name } />
        <h2>{ product_name }</h2>
        <p>{ price }</p>
      </a>
      <button className='btn'>Añadir al carrito</button>
    </article>
  )
}