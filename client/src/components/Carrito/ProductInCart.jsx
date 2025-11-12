import { parsePrice, stringifyPrice } from "utils/currency"
import { Image } from "@unpic/react"
import { Link } from "react-router"
import Contador from "components/ui/Contador"
import { useHover } from "@uidotdev/usehooks" 

export default function ProductInCart({ p, changes }) {
	// Esto porque p.price viene como string ej "$ 12.345"
	const subTotal = stringifyPrice(parsePrice(p.price) * p.cantidad)
	const price = stringifyPrice(parsePrice(p.price))
	const [ref, hovering] = useHover()

	const divider = "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-neutral-200 "
  const rowSizing = "sm:table-cell sm:py-3 py-2 sm:pr-3"
	return (
		<tr
			className={`sm:table-row pl-30 grid grid-cols-3 grid-rows-4 ${divider} mb-5`}
		>
			<td className={`${rowSizing} w-25 max-sm:absolute left-0`}>
				<Link to={`/producto/${p.id}`} className='block w-25 h-30 bg-neutral-100'>
					<Image
						src={`/assets/${p.imagen}`}
						alt={p.product_name}
						layout='fixed'
						className='object-contain size-full p-1'
					/>
				</Link>
			</td>

			<td className={`${rowSizing} col-span-2 row-span-1 order-1 sm:order-0 flex justify-start items-center ${divider}`}>
				<span className='sm:font-light text-base tracking-normal'>{p.product_name}</span>
			</td>

			<td className={`${rowSizing} col-span-3 row-span-1 order-3 sm:order-0 flex justify-between items-center ${divider}`}>
				<span className="sm:hidden font-light text-sm"> Precio:</span>
				<span className='text-md font-light opacity-80'>{price}</span>
			</td>

			<td className={`${rowSizing} sm:w-10 col-span-3 row-span-1 order-4 sm:order-0 flex justify-between items-center ${divider}`}>
				<span className="sm:hidden font-light text-sm">Cantidad:</span>
				<Contador
					count={p.cantidad}
					onIncrease={changes.onIncrease}
					onDecrease={changes.onDecrease}
					onChange={changes.onChange}
					size="xxs"
					max={p.stock}
				/>
			</td>

			<td className={`${rowSizing} sm:text-center lg:min-w-30 col-span-3 row-span-1 order-5 sm:order-0 flex justify-between items-center ${divider}`}>
				<span className="sm:hidden font-light text-sm">Subtotal:</span>
				<span className='font-bold text-sm'>{subTotal}</span>
			</td>

			<td className={`${rowSizing} text-center order-2 sm:order-0 col-span-1 row-span-1 flex justify-end items-center ${divider}`}>
				<button
					className='cursor-pointer'
					type='button'
					onClick={changes.onRemove}
				>
					<Image
						ref={ref}
						src={`/assets/icons/${hovering? "delete-bin-hover.svg" : "delete-bin-idle.svg"}`}
						alt='Eliminar'
						width={20}
						height={20}
						className={`${!hovering? "opacity-60" : "opacity-100"} object-contain transition-opacity`}
					/>
				</button>
			</td>
		</tr>
	)
}
