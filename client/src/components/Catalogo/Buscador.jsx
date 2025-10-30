export default function Buscador({ setSearch }) {
	return (
		<label className='md:w-full md:max-w-full md:flex hidden'>
			<input
				type='text'
				name='buscador'
				id='buscador'
				placeholder='Buscar producto...'
				className='px-4 text-start focus:bg-bg-100/20 focus:w-full focus:h-10 focus:outline-accent-700 focus:outline-1 placeholder:italic'
				onChange={(e) => {
					setSearch({ q: e.target.value })
				}}
			/>
		</label>
	)
}
