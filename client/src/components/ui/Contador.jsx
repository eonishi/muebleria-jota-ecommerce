export default function Contador({ count, setCount }) {
	return (
		<div className='max-h-15 flex items-center justify-between border border-neutral-200 bg-neutral-100'>
      <button
        className='sm:size-15 size-13 hover:bg-accent-700/60 text-xl transition-colors 
          focus:outline focus:outline-accent-700 
          disabled:cursor-not-allowed disabled:opacity-50'
        onClick={() => setCount(count - 1)}
        disabled={count === 1}
      >
				-
			</button>
			<input
        type='number'
        value={count}
        onChange={(e) => setCount(e.target.value)}
				className='text-center font-semibold sm:size-15 size-13 focus:outline focus:outline-accent-700'
			/>
      <button
        className='sm:size-15 size-13 hover:bg-accent-700/60 text-xl transition-colors focus:outline focus:outline-accent-700
          disabled:cursor-not-allowed disabled:opacity-50'
        onClick={() => setCount(count + 1)}
        disabled={count === 10} // por ejemplo
      >
				+
			</button>
		</div>
	)
}
