import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NuevoProductoSchema } from "@muebleria-jota/schemas"
import InputForm from "../InputForm"
import ImageDropZone from "./ImageDropZone"
import { useEffect } from "react"
import SpecificationsField from "./SpecificationsField"

export default function NuevoProductoForm() {
	const {
		control,
		reset,
		handleSubmit,
		register,
		formState: { errors, isSubmitSuccessful },
	} = useForm({
		resolver: zodResolver(NuevoProductoSchema),
		mode: "onSubmit",
		defaultValues: {
			product_name: "",
			imagen: null,
			description: "",
			price: "",
			stock: "",
			specifications: [],
		},
	})

	useEffect(() => { 
		if (isSubmitSuccessful) {
			reset()
		}
	}, [reset, isSubmitSuccessful])

	function onSubmit(data) {
		const formData = new FormData()
		for (const key in data) {
			formData.append(key, data[key])
		}
		
		// console.log(formData)
		for (const [key, value] of formData.entries()) {
			console.log(key, value)
		}

		fetch('/api/productos', {
			method: 'POST',
			body: formData,
		}).then(res => {
			if (res.ok) {
				console.log('Producto creado')
			} else {
				console.log('Error al crear el producto')
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="" encType="multipart/form-data">
			<div className='titulo-container'>
				<h2>Nuevo Producto</h2>
			</div>
			<section className='detalle-producto'>
				<ImageDropZone
					control={control}
					errors={errors}
					name='imagen'
				/>
				<div className='info'>
					<InputForm
						name='product_name'
						control={control}
						label='Nombre del Producto'
						type='text'
						error={errors.product_name}
						placeholder='Ej. Butaca Mendoza'
					/>

					<InputForm
						name='description'
						control={control}
						label='Descripción'
						type='text'
						as='textarea'
						error={errors.description}
						placeholder='Ej. Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú.'
					/>

					<div style={{ display: "flex", gap: "1rem" }}>
						<InputForm
							name='price'
							control={control}
							label='Precio $'
							type='number'
							placeholder='0'
							error={errors.price}
						/>

						<InputForm
							name='stock'
							placeholder='0'
							control={control}
							label='Cantidad (Stock)'
							type='number'
							error={errors.stock}
						/>
					</div>

					<SpecificationsField
						control={control}
						register={register}
						errors={errors}
					/>

					<button
						className='add-cart-btn'
						type='submit'
					>
						Crear Producto
					</button>
				</div>
			</section>
		</form>
	)
}
