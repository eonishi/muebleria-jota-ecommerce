import { Link } from "react-router"
import { stringifyPrice } from "utils/currency"
import AddCartButton from "./AddCartButton"
import { Image } from "@unpic/react"

export default function ProductCard({ producto, addToCart }) {
	const productUrl = `/producto/${producto.id}`

	return (
		<article className='flex flex-col gap-2 justify-between items-start w-full h-auto'>
			<div
				className='group flex items-center justify-center
        relative aspect-100/110 h-auto w-full bg-neutral-100 overflow-hidden
        after:bg-linear-to-t after:size-full after:absolute
        after:bottom-0 after:from-bg-100 after:to-transparent
        after:to-30% after:transition-opacity after:opacity-0 hover:after:opacity-100 '
			>
				<Link
					to={productUrl}
					className='z-10'
				>
					<Image
						src={`/assets/${producto.imagen}`}
						alt={producto.product_name}
						layout='fixed'
						className='object-cover h-70 w-auto'
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
