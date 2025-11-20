import { Image } from "@unpic/react"

export default function AddCartButton({ onClick }) {
  return (
    <button
      className='rounded-full p-3 bg-detail
        flex items-center justify-center absolute bottom-5 right-5
        active:scale-100 hover:scale-105 active:bg-detail-200
        opacity-0 group-hover:opacity-100 duration-250
        transition-opacity group-hover:animate-slideUp
        '
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
