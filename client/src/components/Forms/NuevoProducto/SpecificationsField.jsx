import { useFieldArray } from "react-hook-form"
import { Image } from "@unpic/react"

export default function SpecificationsField({ control, register, errors, trigger }) {
	const { fields, append, remove } = useFieldArray({
		control, // Conecta con el formulario principal
		name: "specifications", // Nombre del campo en el form state
	})

	function handleAddSpecification() {
		if (errors.specifications) return

		append({ key: "", value: "" })
	}
  function handleRemoveSpecification(index){
    remove(index)
  }

	return (
		<div className='grid grid-cols-1 md:gap-y-3'>
			<label>Características Adicionales</label>
			{fields.map((field, index) => (
				<div
					key={field.id}
					className='grid grid-cols-1 md:grid-cols-2 gap-x-3 mt-3 md:mt-0'
				>

					<button
						className='col-span-1 md:col-span-2 place-self-end text-sm hover:text-red-700 hover:underline'
						type='button'
						onClick={() => handleRemoveSpecification(index)}
					>
						Eliminar
					</button>

          
					<input
						{...register(`specifications.${index}.key`)}
						placeholder={`${Object.keys(suggestSpec(index)).at(0)}`}
						className={`transition-border col-span-1 border bg-neutral-100/50 p-3 text-start 
								field-sizing-content resize-none overflow-hidden mb-2 md:mb-0
							  focus:bg-bg-100/20 focus:outline-accent-700 focus:outline-1 placeholder:italic placeholder:text-home-100/30 transition-colors duration-300
                ${errors.specifications?.[index]? "border-red-700 bg-red-100/50" : "border-neutral-200"}`
            }
            onBlur={() => trigger()}
					/>

					
					<input
						{...register(`specifications.${index}.value`)}
						placeholder={`${Object.values(suggestSpec(index)).at(0)}`}
						className={`transition-border col-span-1 border bg-neutral-100/50 p-3 text-start 
								field-sizing-content resize-none overflow-hidden
							  focus:bg-bg-100/20 focus:outline-accent-700 focus:outline-1 placeholder:italic placeholder:text-home-100/30 transition-colors duration-300
               ${errors.specifications?.[index]? "border-red-700 bg-red-100/50" : "border-neutral-200"}`
            }
            onBlur={() => trigger()}
					/>

          { errors.specifications?.[index] && (
						<p className='md:col-span-2 col-span-1 place-self-end text-right text-red-700 text-sm text-pretty'>  
							{errors.specifications[index].key 
                ? errors.specifications[index].key.message
                : errors.specifications[index].value.message
              }
						</p>
					)}

				</div>
			))}

			{/* Mensaje de error general para el array */}
			{errors.specifications?.root && (
        <div className="w-full flex gap-3 justify-center items-center p-5">
          <Image src="/assets/icons/warning.svg" alt="warning icon" layout="fixed"/>
				  <p className='text-right text-red-700'>
            {errors.specifications.root.message}
          </p>
        </div>
			)}


			<button
				type='button'
				className='w-fit justify-self-center p-1 text-center cursar-pointer hover:underline hover:text-primary text-md transition-colors mt-3'
				onClick={handleAddSpecification}
			>
				+ Agregar Caracteristica
			</button>

		</div>
	)
}

const SPEC_SUGGESTION = [
  {"Color": "Burgundy"},
  {"Medidas": "80 × 75 × 85 cm"},
  {"Acabado": "Cera vegetal, tapazado premium"},
  {"Materiales": "Guatambú macizo, tela bouclé"},
  {"Peso": "30 kg"},
  {"Carga Máxima": "78 kg"},
  {"Relleno": "Espuma HR + plumón reciclado"},
  {"Certificación": "Ergonomía euopea EN 1335"},
  {"Tapizado": "Repelente al agua y manchas"},
  {"Confort": "Espuma alta densidad"},
  {"Rotación": "360° silenciosa y suave"},
]

function suggestSpec(index){
  return SPEC_SUGGESTION[index % SPEC_SUGGESTION.length]
}
