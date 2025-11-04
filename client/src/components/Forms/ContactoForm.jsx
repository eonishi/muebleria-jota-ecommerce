import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "./InputForm"
import { ContactoSchema } from "schemas"
import { useEffect } from "react"

export default function ContactoForm() {
	const { control, reset, handleSubmit, formState: { errors, isSubmitSuccessful }, } = useForm({
		resolver: zodResolver(ContactoSchema),
		mode: 'noBlur',
		defaultValues: {
			username: "",
			email: "",
			message: "",
		},
	})

	// TODO: Implementar una modal para avisarle al usuario que recibimos su mensaje
	//const userName = watch("username")

	function onSubmit(data) {
		// TODO: Implementar POST a la API
		console.log(data)
	}

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset()
		}
	 },[reset, isSubmitSuccessful])

	return (
		<section className='section-box contacto'>
			<h2>Contacto</h2>

			<div className='contacto-container'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					id='formularioDeContacto'
				>
					<InputForm
						name='username'
						control={control}
						label='Nombre'
						type='text'
						error={errors.username}
					/>
					<InputForm
						name='email'
						control={control}
						label='Email'
						type='email'
						error={errors.email}
					/>
					<InputForm
						name='message'
						control={control}
						label='Mensaje'
						type='text'
						error={errors.message}
						as='textarea'
					/>
					<button
						type='submit'
						className='btn btn-contacto'
					>
						Enviar
					</button>
				</form>
			</div>
		</section>
	)
}
