import { stringifyPrice } from 'utils/currency';

export default function PrecioTotal({ total }) { 
  return (
    <div
      id='total-carrito'
      className='total-carrito'
    >
      { stringifyPrice(total) }
    </div>
  )
}