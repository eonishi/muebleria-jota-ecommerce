import { parsePrice, stringifyPrice } from 'utils/currency';

export default function ProductInCart({ p, changes }) {
	// Esto porque p.price viene como string ej "$ 12.345"
	const totalPrice = stringifyPrice(parsePrice(p.price) * p.cantidad);

	return (
		<li className='carrito-item'>
			<img
				src={`/assets/${p.imagen}`}
				alt={p.product_name}
			/>

			<div className='info'>
				<span className='nombre'>{p.product_name}</span>
				<span className='descripcion'>{p.description}</span>
			</div>

			
			<div className='cantidad-precio'>
				<div className='cantidad'>
					<button
						className='menos'
						onClick={changes.onDecrease}
					>-</button>
					<span className='cantidad-num'>{p.cantidad}</span>
					<button
						className='mas'
						onClick={changes.onIncrease}
					>+</button>
        </div>
        
        <span className='precio'>
          { totalPrice }
        </span>

				<button
					className='borrar'
					onClick={changes.onRemove}
				> Eliminar </button>
			</div>
		</li>
	)
}
