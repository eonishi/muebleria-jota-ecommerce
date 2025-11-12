import { Controller } from "react-hook-form"

export default function InputForm({
	name,
	control,
	label,
	type,
	error,
	as,
	placeholder,
	className,
}) {
	const InputComponent = as === "textarea" ? "textarea" : "input"
	return (
		<div className={`${className}`}>
			<label className='grid grid-cols-2 gap-2 tracking-wide font-normal text-home-100'>
				<p className="col-span-2">{label}</p>
				{error? " " : ""}
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<InputComponent
							id={name}
							name={name}
							type={type}
							{...field}
							className={`transition-border col-span-2 border bg-neutral-100/50 p-3 text-start 
								field-sizing-content resize-none overflow-hidden default-button-none
							focus:bg-bg-100/20 focus:outline-accent-700 ${error? "border-red-700 bg-red-100/50" : "border-neutral-200"}
								focus:outline-1 placeholder:italic placeholder:text-home-100/30 transition-colors duration-300`}
							autoComplete={name}
							placeholder={placeholder}
						/>
					)}
				/>
			</label>
			{error && (
				<p className='col-span-1 text-end text-red-700 text-sm text-pretty'>
					{error.message}
				</p>
			)}
		</div>
	)
}
