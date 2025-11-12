import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NuevoProductoSchema } from "schemas"
import InputForm from "../InputForm"
import ImageDropZone from "./ImageDropZone"
import { useEffect } from "react"
import SpecificationsField from "./SpecificationsField"
import { toast } from "sonner"
import Separator from "components/ui/Separator"

export default function NuevoProductoForm() {
	const {
		control,
		reset,
		handleSubmit,
		register,
    trigger,
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
			toast.success("Producto creado con éxito")
			reset()
		}
	}, [reset, isSubmitSuccessful])

	function onSubmit(data) {
		const formData = new FormData()
		for (const key in data) {
			formData.append(key, data[key])
		}
		
		fetch('/api/productos', {
			method: 'POST',
			body: formData,
		}).then(res => {
			if (!res.ok) {
				toast.error('Error al crear el producto')
			}
		})
	}

	return (
		<section className="max-w-350 md:mt-25 mb-30 mx-auto text-home-100 font-body flex flex-col">
		  <div className='font-title font-bold sm:text-5xl text-3xl text-primary text-center'>
				<h2>Nuevo Producto</h2>
			</div>

      <Separator margin="sm"/> 

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="grid grid-cols-1 lg:grid-cols-2 px-5 gap-5 md:px-10 place-items-start" 
        encType="multipart/form-data"
      >
				<ImageDropZone
					control={control}
					errors={errors}
					name='imagen'
				/>
				<div className='place-self-start flex flex-col gap-5'>
					<InputForm
						name='product_name'
						control={control}
						label='Nombre del Producto'
						type='text'
						error={errors.product_name}
						placeholder='Butaca Mendoza'
					/>

					<InputForm
						name='description'
						control={control}
						label='Descripción'
						type='text'
						as='textarea'
						error={errors.description}
						placeholder='Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.'
					/>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-3" >
						<InputForm
							name='price'
							control={control}
							label='Precio $'
							type='number'
							placeholder='$250.000'
							error={errors.price}
              className="col-span-1" 
						/>

						<InputForm
							name='stock'
							placeholder='20'
							control={control}
							label='Cantidad (Stock)'
							type='number'
							error={errors.stock}
              className="col-span-1" 
						/>
					</div>

					<SpecificationsField
						control={control}
						register={register}
						errors={errors}
            trigger={() => trigger("specifications")}
					/>

					<button
						className='p-5 bg-detail hover:bg-detail-200 transition-colors focus:outline focus:outline-detail-200 text-neutral-50 font-bold'
						type='submit'
					>
						Crear Producto
					</button>
				</div>
		</form>
    </section>
	)
}
