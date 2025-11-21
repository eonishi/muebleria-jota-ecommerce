import { Link } from "react-router"
import { stringifyPrice } from "utils/currency"
import AddCartButton from "./AddCartButton"
import { Image } from "@unpic/react"

export default function ProductCard({ producto, addToCart }) {
  const productUrl = `/producto/${producto.id}`

  return (
    <article className='flex flex-col gap-2 justify-between items-start w-fit h-auto'>
      <div
        className='group flex
        relative aspect-100/110 h-auto w-full bg-neutral-100 overflow-hidden'>
        <Link
          to={productUrl}
          className={`${hoverGradient}`}
        >
          <Image
            src={`/assets/${producto.imagen}`}
            alt={producto.product_name}
            layout='fixed'
            className='object-cover h-full w-auto'
          />
        </Link>
        <AddCartButton onClick={addToCart} />
      </div>
      <Link to={productUrl}>
        <h2 className='font-body font-extralight'>{producto.product_name}</h2>
      </Link>
      <span className='font-body font-bold tracking-wider'>
        {stringifyPrice(producto.price)}
      </span>
    </article>
  )
}

const hoverGradient = `after:absolute after:bottom-0 after:size-full
  after:bg-linear-to-t after:from-bg-100 after:to-transparent after:to-30%
  after:transition-opacity after:opacity-0 group-hover:after:opacity-100 group-hover:after:animate-slideUp`
