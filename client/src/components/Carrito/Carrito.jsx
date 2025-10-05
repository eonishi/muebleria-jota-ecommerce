import ProductInCart from './ProductInCart'
import PrecioTotal from './PrecioTotal'

export default function Carrito({ cart }) {
	return (
		<>
			<h1>Carrito</h1>
      <ul id='carrito-container'>
        {cart.items.length ?
          cart.items.map(prod => <ProductInCart
            key={prod.id}
            p={prod}
            changes={{
              onIncrease: () => cart.increaseProduct(prod.id),
              onDecrease: () => cart.decreaseProduct(prod.id),
              onRemove: () => cart.removeProduct(prod.id)
            }} />)
          : ""}
      </ul>
      {cart.totalPrice > 0 ? <PrecioTotal total={cart.totalPrice} /> : "" }
		</>
	)
}
