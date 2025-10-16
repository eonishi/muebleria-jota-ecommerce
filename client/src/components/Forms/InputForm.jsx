import { Controller } from "react-hook-form"

export default function InputForm({
	name,
	control,
	label,
	type,
	error,
	as,
	placeholder,
}) {


	const InputComponent = as === "textarea" ? "textarea" : "input"
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>

			{error && <p className='estado error'>{error.message}</p>}
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<InputComponent
					id={name}
					name={name}
					type={type}
					{...field}
					className={error ? "error" : ""}
					autoComplete={name}
					placeholder={placeholder}
					/>
				)}
				/>
		</div>
	)
}
