import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import InputForm from "components/Forms/InputForm"
import { ContactoSchema } from "schemas"
import { useEffect } from "react"

export function Contacto() {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: zodResolver(ContactoSchema),
    mode: "onBlur",
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
  }, [reset, isSubmitSuccessful])

  return (
    <section className='md:mt-30 flex flex-col items-center justify-center relative'>

      <h2 className='text-4xl font-semibold  font-title text-primary p-5 text-center text-balance'>
        Ponte en contacto con nosotros!
      </h2>
      <p className='pb-10 text-pretty font-body font-light text-center text-home-100/60 max-w-250'>
        Para obtener más información sobre nuestros productos y servicios, no
        dude en enviarnos un correo electrónico.
        <br />
        Estamos encantados de poder ayudarte 💕.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-1 md:grid-cols-2 gap-5 p-5 max-w-250 w-full font-body'
      >
        <InputForm
          name='username'
          control={control}
          label='Nombre'
          type='text'
          error={errors.username}
          placeholder='Herman Miller'
          className='col-span-1'
        />
        <InputForm
          name='email'
          control={control}
          label='Email'
          type='email'
          error={errors.email}
          placeholder='miller@furniture.com'
          className='md:col-span-1'
        />
        <InputForm
          name='phone'
          control={control}
          label='Teléfono'
          type='tel'
          error={errors.phone}
          placeholder='+54 011 1234-5678'
          className='md:col-span-1'
        />

        <InputForm
          name='subject'
          control={control}
          label='Asunto'
          type='text'
          error={errors.subject}
          placeholder='Servicios personalizados'
          className='md:col-span-2'
        />

        <InputForm
          name='message'
          control={control}
          label='Mensaje'
          type='text'
          error={errors.message}
          as='textarea'
          placeholder='¡Queremos trabajar contigo! 🧉👋'
          className='md:col-span-2'
        />

        <button
          type='submit'
          className={`p-5 bg-detail active:bg-detail-200 hover:scale-101 active:scale-100 transition-transform
						md:col-end-3 text-neutral-50 focus:outline focus:outline-primary ${isSubmitting ? "cursor-progress" : "cursor-pointer"
            }`}
        >
          Enviar
        </button>
      </form>
    </section>
  )
}
