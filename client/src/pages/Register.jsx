import { useNavigate, NavLink } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRegisterSchema } from "schemas"
import { useForm } from "react-hook-form"
import InputForm from "components/Forms/InputForm"
import { toast } from "sonner"

export function Register() {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })

  async function onSubmit(data) {
    const req = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })

    switch (req.status) {
      case 200:
        toast.success("Registrado con exitosamente 🥳")
        reset()
        navigate("/login")
        break;
      case 400:
        toast.error("Ya existe un usuario con su nombre o email")
        reset()
        break;
      default:
        toast.error("Hubo un error registrando su usuario. Intente más tarde")
        break;
    }
  }

  return (
    <section className="max-w-350 md:mt-25 mb-30 mx-auto flex flex-col items-center">
      <h2 className="text-4xl font-semibold font-title text-primary p-8 text-center text-balance">
        Registrate
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-5 p-5 max-w-100 w-full"
      >
        <InputForm
          name="username"
          control={control}
          label="Nombre de usuario"
          type="text"
          error={errors.username}
          placeholder="Hermanos Jota"
          className="col-span-1"
        />
        <InputForm
          name="email"
          control={control}
          label="Email"
          type="email"
          error={errors.email}
          placeholder="hermanosjota@mail.com"
          className="col-span-1"
        />
        <InputForm
          name="password"
          control={control}
          label="Constraseña"
          type="password"
          error={errors.password}
          placeholder="*****"
          className="col-span-1"
        />

        <NavLink to="/login" className="font-body font-normal text-home-100/80 hover:text-primary transition-colors">
          ¿Ya tenes cuenta? Ingresar.
        </NavLink>


        <button type="submit"
          className={`col-span-1 p-5 bg-detail hover:bg-detail-200 text-neutral-50 transition-colors font-semibold
            ${isSubmitting ? "cursor-progress" : "cursor-pointer"}`}
        >
          Registrarse
        </button>
      </form>
    </section>
  )
}
