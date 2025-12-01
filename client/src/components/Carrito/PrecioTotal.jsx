import { stringifyPrice } from "utils/currency"
import Separator from "components/ui/Separator"

export default function PrecioTotal({ total, discount, className, onSubmit }) {
  // TODO: Agregar un loader mientras realiza onSubmit( que es procesar el carrito )
  // y bloquear el cursor pointer para evitar multiples envios del misma carrito.


  discount = discount && discount > 0 ? discount : null
  const subTotal = stringifyPrice(total)
  const totalCheckout = stringifyPrice(total * (1 - discount / 100))

  return (
    <article
      className={`${className} flex flex-col items-start justify-start gap-3 h-fit border border-neutral-200 bg-neutral-100 font-body text-home-100 p-10 `}
    >
      <h3 className='text-lg font-bold mb-5'>TOTAL DEL CARRITO</h3>
      <ul className='flex flex-col gap-3 w-full *:flex *:justify-between *:text-sm'>
        <li>
          <span className="font-semibold">Subtotal</span>
          <span className="opacity-70">{subTotal}</span>
        </li>

        <Separator
          color='bg-neutral-200'
          margin='xs'
        />

        {discount && (
          <>
            <li>
              <span className="font-semibold">Descuento</span>
              <span className="opacity-70"> -{discount}% </span>
            </li>
            <Separator
              color='bg-neutral-200'
              margin='xs'
            />
          </>
        )}

        <li>
          <span className='font-semibold'>Total</span>
          <span className='font-bold text-2xl text-primary'>{totalCheckout}</span>
        </li>
      </ul>

      <button
        type='button'
        onClick={onSubmit}
        className='cursor-pointer w-full p-5 font-semibold text-base mt-5
          bg-accent text-neutral-50 focus:outline focus:outline-lime-900 hover:bg-lime-700 transition-colors'
      >
        Proceder a Comprar
      </button>
    </article>
  )
}
