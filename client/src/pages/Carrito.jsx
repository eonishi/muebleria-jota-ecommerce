import ProductInCart from "components/Carrito/ProductInCart"
import PrecioTotal from "components/Carrito/PrecioTotal"
import { useCartContext } from "context/carrito"
import Separator from "components/ui/Separator"
import { useNavigate } from "react-router"
import { useAuthContext } from "context/auth"
import { Image } from "@unpic/react"
import NoItemsView from "components/ui/NoItemsView"

export function Carrito() {
  const {
    items,
    totalPrice,
    increaseProduct,
    decreaseProduct,
    removeProduct,
    processCart,
  } = useCartContext()
  const navigate = useNavigate()
  const { isAuth } = useAuthContext()

  function processPedido() {
    // me aseguro que este logeado
    if (!isAuth) { return navigate("/login") }

    // en funcion de como procese el pedido lo redirijo o lo mantengo en carrito
    const sucessProcessCart = processCart()
    if (sucessProcessCart) {
      return navigate("/mis-pedidos", { replace: true })
    }

  }
  if (items.length === 0) {
    return <NoItemsView
      explain="Tu carrito está vacío."
      buttonOpt={{
        label: "Ver más productos",
        onClick: () => { navigate("/catalogo") },
        color: "bg-accent hover:bg-lime-700"
      }}
      imageOpt={{ src: "/assets/icons/checkout-shopping.svg", alt: "No items icon" }}
    />
  }

  return (
    <section className='max-w-370 md:mt-30 mt-10 2xl:mx-auto md:mx-10 mx-5 gap-10 grid lg:grid-cols-3 grid-cols-1'>
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
          {items.length > 0 &&
            items.map((prod) => (
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
          }
        </tbody>
      </table>

      <PrecioTotal
        total={totalPrice}
        className="col-span-1 lg:col-start-3 col-start-1"
        onSubmit={processPedido}
      />
    </section>
  )
}
