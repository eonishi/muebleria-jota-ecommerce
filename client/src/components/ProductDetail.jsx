import { useState, useEffect } from "react"
import 'src/styles/producto.css'


export default function ProductDetail({cart}) {
  const [product, setProduct] = useState({})
  useEffect(() => { 
    const id = window.location.pathname.slice(10)
    
    fetch(`/api/productos/${id}`)
      .then(res => res.json())
      .then(p => setProduct(p))
      .catch(e => console.error(e))
  }, [])
  
  return (
    <>
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
    </>
  )
}