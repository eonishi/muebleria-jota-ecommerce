import { useFieldArray } from "react-hook-form"

export default function SpecificationsField({ control, register, errors }) {
	const { fields, append, remove } = useFieldArray({
		control, // Conecta con el formulario principal
		name: "specifications", // Nombre del campo en el form state
	})

	function handleAddSpecification() {
		if (errors.specifications) return
		append({ key: "", value: "" })
	}

	return (
		<div className='specifications-container'>
			<label>Características Adicionales</label>
			{fields.map((field, index) => (
				<div
					key={field.id}
					className='spec-row'
				>
					<button
						className='delete-spec-btn'
						type='button'
						onClick={() => remove(index)}
					>
						Eliminar
					</button>
					{errors.specifications?.[index]?.key && (
						<p className='estado error'>{/* TODO: ARREGLAR ESTILOS */}
							{errors.specifications[index].key.message}
						</p>
					)}
					<input
						{...register(`specifications.${index}.key`)}
						placeholder='Característica (ej. Color)'
						className={errors.specifications?.[index]?.key ? "error" : ""}
					/>

					{errors.specifications?.[index]?.key && (
						<p className='estado error'> {/* TODO: ARREGLAR ESTILOS */} 
							{errors.specifications[index].key.message}
						</p>
					)}
					<input
						{...register(`specifications.${index}.value`)}
						placeholder='Detalle (ej. Rojo)'
						className={errors.specifications?.[index]?.value ? "error" : ""}
					/>
				</div>
			))}
			<button
				type='button'
				className='btn btn-contacto' //Tengo que arreglar el css 💀🤞
				onClick={handleAddSpecification}
				style={{ marginTop: "0" }}
			>
				+ Agregar Caracteristica
			</button>
			{/* Mensaje de error general para el array */}
			{errors.specifications?.root && (
				<p className='estado error'>{errors.specifications.root.message}</p>
			)}
		</div>
	)
}
