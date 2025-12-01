import { Image } from "@unpic/react"

export default function AddCartButton({ onClick, visible }) {
  // Si visible falla (que es el controlado por react) tiene el "modo css" de respaldo
  const controlled = typeof visible === "boolean"

  const base =
    'rounded-full p-3 bg-detail hover:bg-detail-200 transition-opacity duration-200 absolute bottom-5 right-5 flex items-center justify-center'

  const cssModeClasses =
    'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'

  const controlledClasses = visible
    ? 'opacity-100 scale-100 pointer-events-auto'
    : 'opacity-0 scale-95 pointer-events-none'

  return (
    <button
      className={`${base} ${controlled ? controlledClasses : cssModeClasses}`}
      onClick={onClick}
      type='button'
      title='Agregar al carrito'
    >
      <Image
        src='/assets/icons/cart.svg'
        alt='Agregar al carrito'
        layout='fixed'
        className='object-cover h-5 w-auto'
      />
    </button>
  )
}
