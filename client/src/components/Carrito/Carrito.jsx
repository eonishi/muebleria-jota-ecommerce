import ProductInCart from "./ProductInCart"
import PrecioTotal from "./PrecioTotal"
import { useCartContext } from "context/carrito"
import Separator from "components/ui/Separator"

export default function Carrito() {
	const { items, totalPrice, increaseProduct, decreaseProduct, removeProduct } =
		useCartContext()

  // Todo: vista más linda para cuando no haya productos en el carrito 🤷‍♂️
	return (
		<section className='max-w-370 md:mt-30 2xl:mx-auto md:mx-10 mx-5 gap-10 grid lg:grid-cols-3 grid-cols-1'>
			<h1 className='lg:col-span-3 col-span-1 text-center font-title text-primary md:text-7xl text-5xl font-medium tracking-wider'>
				Carrito
			</h1>
      <Separator className='lg:col-span-3 col-span-1' />

			<table className='table lg:col-span-2 col-span-1 font-body text-home-100 '>
				<thead className="sm:table-header-group hidden transition-discrete">
          <tr className="table-row *:table-cell text-center *:py-5 bg-fg-100 tracking-wider text-sm *:font-semibold">
            <th className=""></th>
						<th className="text-left">PRODUCTO</th>
						<th className="text-left">PRECIO</th>
						<th className="">CANTIDAD</th>
            <th className="">SUBTOTAL</th>
            <th></th>
					</tr>
				</thead>
        <tbody className="table-row-group">
					{items.length
            ? items.map((prod) => (
								<ProductInCart
									key={prod.id}
									p={prod}
									changes={{
										onIncrease: () => increaseProduct(prod.id),
										onDecrease: () => decreaseProduct(prod.id),
                    onRemove: () => removeProduct(prod.id),
									}}
								/>
						  ))
						: ""}
				</tbody>
      </table>
      
      <PrecioTotal
        total={totalPrice}
        className="col-span-1 lg:col-start-3 col-start-1"
      />
		</section>
	)
}
