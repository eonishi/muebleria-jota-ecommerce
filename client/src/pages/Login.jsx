import { useNavigate, NavLink, Navigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserLoginSchema } from "schemas"
import { useForm } from "react-hook-form"
import InputForm from "components/Forms/InputForm"
import { toast } from "sonner"
import { useAuthContext } from "context/auth"

export function Login() {
  const navigate = useNavigate()
  // Extraemos login e isAuth. Loading lo manejamos localmente con isSubmitting para mejor UX inmediata
  const { isAuth, login } = useAuthContext()

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(UserLoginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: ""
    }
  })

  if (isAuth) { return <Navigate to="/perfil" replace /> }

  async function onSubmit(data) {
    try {
      const req = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        credentials: "same-origin"
      })

      switch (req.status) {
        case 200:
          login()
          toast.success("Ingreso exitoso 🥳")
          navigate("/perfil")
          window.location.reload()
          break;

        case 401:
          // Aquí sí limpiamos password para que reintente
          setError("root", { type: "manual", message: "Credenciales inválidas" })
          setError("email", { type: "manual", message: "" }) // Pintamos rojo el input
          setError("password", { type: "manual", message: "" }) // Pintamos rojo el input
          toast.error("El email o contraseña es inválida")
          break;

        default:
          toast.error("Ocurrió un error inesperado. Intente más tarde.")
          break;
      }
    } catch (error) {
      console.error(error)
      toast.error("Error de conexión con el servidor")
    }
  }

  // Si isAuth es true, el useEffect se encargará.
  // Retornar null o un loader evita parpadeos mientras redirige.
  if (isAuth) return null

  return (
    <section className="max-w-350 md:mt-25 mt-10 mb-30 mx-auto flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-md bg-neutral-50 border border-neutral-200 shadow-sm p-8">

        <h2 className="text-4xl font-semibold font-title text-primary mb-2 text-center text-balance tracking-wide">
          Bienvenido
        </h2>
        <p className="text-center text-home-100/60 mb-8 font-body text-sm">
          Ingresa tus credenciales para continuar
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6 w-full"
        >
          <InputForm
            name='email'
            control={control}
            label='Email'
            type='email'
            error={errors.email}
            placeholder='tu@email.com'
            className='col-span-1'
          />

          <div className="flex flex-col gap-2">
            <InputForm
              name="password"
              control={control}
              label="Contraseña"
              type="password"
              error={errors.password}
              placeholder="••••••••"
              className="col-span-1"
            />
            {/* Link de recuperación de contraseña opcional si quisieras agregarlo */}
            {/* <Link to="/recover" className="text-xs text-right text-home-100/60 hover:text-primary">¿Olvidaste tu contraseña?</Link> */}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-4 mt-2 text-neutral-50 font-semibold tracking-wide transition-all duration-300
              flex items-center justify-center gap-2
              ${isSubmitting
                ? "bg-neutral-400 cursor-not-allowed"
                : "bg-detail hover:bg-detail-200 hover:shadow-md cursor-pointer focus:outline focus:outline-detail"
              }`}
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                Ingresando...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>

          <div className="text-center mt-4 pt-4 border-t border-neutral-200">
            <span className="text-home-100/80 font-light text-sm">¿No tenés una cuenta? </span>
            <NavLink
              to="/register"
              className="font-medium text-primary hover:text-accent-700 transition-colors underline underline-offset-2"
            >
              Registrate acá
            </NavLink>
          </div>
        </form>
      </div>
    </section>
  )
}
