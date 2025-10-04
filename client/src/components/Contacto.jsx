import { useState } from "react"

const formState = {
  initial: "",
  sucess: "success",
  badEmail: "bad-email",
  badName: "bad-name",
  incomplete: "incomplete",
}

const fields = {
  nombre: "nombre",
  email: "email",
  mensaje: "mensaje",
}

export default function Contacto() {
  const [formData, setFormData] = useState({})
  const [validForm, setValidForm] = useState(formState.initial)

  const formMessages = {
    [formState.initial]: "",
    [formState.sucess]: `¡Gracias ${formData.nombre}, recibimos tu mensaje!`,
    [formState.badEmail]: "Ingrese un email válido",
    [formState.badName]: "El nombre no puede contener números ni caracteres especiales y debe empezar con mayúscula",
    [formState.incomplete]: "Por favor, complete los campos",
  }

  function handleSubmit(e) { 
    e.preventDefault()
    setValidForm(formState.initial)

    const form = new FormData(e.target)
    form.forEach((value, key) => form.set(key, value.trim()))

    // Valido que existan todos los campos
    for (const field in fields) {
      if (!form.get(fields[field])) {
        setValidForm(formState.incomplete)
        return
      }
    }

    // Valido que el nombre:
    // * No contenga números ni caracteres especiales
    // * Todas las palabras empiecen con mayúscula
    // ni idea los regex, los hizo copilot 🤞
    const elNombreEsValido = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+( [A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/
    if (!elNombreEsValido.test(form.get(fields.nombre))) {
      setValidForm(formState.badName)
      return
    }
    
    // Valido que el email tenga un formato válido
    const elEmailEsVelido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!elEmailEsVelido.test(form.get(fields.email))) {
      setValidForm(formState.badEmail)
      return
    }

    setValidForm(formState.sucess)
    setFormData(Object.fromEntries(form))
    e.target.reset()
  }

	return (
		<section className='section-box contacto'>
			<h2>Contacto</h2>
			<div className='contacto-container'>
				<form
					id='formularioDeContacto'
					noValidate
          onSubmit={handleSubmit}
				>
					<label htmlFor={fields.nombre}>Nombre</label>
					<input
						type='text'
            id={fields.nombre}
            name={fields.nombre}
            autoComplete={fields.nombre}
						required
					/>

					<label htmlFor={fields.email}>Email</label>
					<input
						type={fields.email}
            id={fields.email}
            name={fields.email}
            required
            autoComplete={fields.email}
					/>

					<label htmlFor={fields.mensaje}>Mensaje</label>
					<textarea
            id={fields.mensaje}
            name={fields.mensaje}
            required
            autoComplete="off"
					></textarea>

          <button
						type='submit'
						className='btn btn-contacto'
					>
						Enviar
					</button>

          <p id='estado'
            className={
              validForm === formState.initial ? ""
              : validForm === formState.sucess ? "exito"
              : "error"
            }
          >
            {formMessages[validForm]}
          </p>
				</form>
			</div>
		</section>
	)
}
