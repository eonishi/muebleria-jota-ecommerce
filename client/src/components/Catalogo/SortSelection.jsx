export default function SortSelection() {
	return (
		<div className='flex gap-2 justify-between items-center cursor-pointer'>
			<label className='font-body text-sm font-medium text-home-100/50 whitespace-nowrap sm:block hidden'>
				Ordenar por
			</label>
      <select className='flex items-center justify-between sm:min-w-40 h-10 bg-neutral-50 p-3 text-sm font-medium 
        focus:outline-1 focus:outline-accent-700 *:text-sm *:font-medium'>
        <option value="none">Default</option>
        <option value="novedad">Novedad</option>
        <option value="puntuacion">Puntuación</option>
        <option value="less-price" className="hover:bg-accent">Menor precio</option>
        <option value="more-price">Mayor precio</option>
			</select>
		</div>
	)
}
