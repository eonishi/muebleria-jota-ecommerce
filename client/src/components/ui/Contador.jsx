
export default function Contador({
	count,
	onIncrease,
	onDecrease,
	onChange,
	size = "md",
	max = 10,
	min = 1,
	maxMessage,
	minMessage,
}) {
  // TODO: implementar un popover con un mensaje sobre porque se disabilito el boton
  // ej: El stock es de 23, a partir de 23 se desabilita el boton y al hovear aparece un popover que dice "Te estas llevando todo nuestro stock 🤷‍♂️"

	const contadorSize = {
		xxs: "sm:size-9 size-7",
		xs: "sm:size-11 size-9",
		sm: "sm:size-13 size-11",
		md: "sm:size-15 size-13",
		lg: "sm:size-17 size-15",
	}[size]

	const buttonStyle = `${contadorSize} hover:bg-accent-700/60 text-xl transition-colors focus:outline focus:outline-accent-700 disabled:cursor-not-allowed disabled:opacity-50`

	return (
		<div className='max-h-15 w-fit flex items-center justify-between border border-neutral-200 bg-neutral-100'>
			<button
				className={buttonStyle}
				onClick={onDecrease}
				disabled={count <= min}
			>
				-
			</button>
			<input
        type='number'
        min={min}
        max={max}
        value={count}
        className={`${contadorSize} text-center font-semibold focus:outline focus:outline-accent-700 default-button-none`}
        onChange={onChange}
        disabled
			/>
			<button
				className={buttonStyle}
				onClick={onIncrease}
				disabled={count >= max} // por ejemplo
			>
				+
			</button>
		</div>
	)
}
