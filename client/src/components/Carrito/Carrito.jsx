import ProductInCart from './ProductInCart'
import PrecioTotal from './PrecioTotal'
import { useCartContext } from "context/carrito"

export default function Carrito() {
  const {
    items,
    totalPrice,
    increaseProduct,
    decreaseProduct,
    removeProduct
  } = useCartContext()

	return (
		<>
			<h1>Carrito</h1>
      <ul id='carrito-container'>
        {items.length ?
          items.map(prod => <ProductInCart
            key={prod.id}
            p={prod}
            changes={{
              onIncrease: () => increaseProduct(prod.id),
              onDecrease: () => decreaseProduct(prod.id),
              onRemove: () => removeProduct(prod.id)
            }} />)
          : ""}
      </ul>
      {totalPrice > 0 ? <PrecioTotal total={totalPrice} /> : "" }
		</>
	)
}
