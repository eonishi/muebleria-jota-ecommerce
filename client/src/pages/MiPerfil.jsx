import { useAuthContext } from "context/auth"
import { useNavigate } from "react-router"
import { Image } from "@unpic/react"
import Separator from "components/ui/Separator"

export function MiPerfil() {
  const { user, logout } = useAuthContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    // Es buena práctica limpiar estados antes de navegar
    logout()
    navigate("/login", { replace: true })
  }

  // Protección básica de renderizado si el contexto aún no cargó el usuario
  if (!user) return null

  return (
    <section className="max-w-350 md:mt-25 mt-10 mx-auto px-5 gap-10 flex flex-col items-center justify-center font-body text-home-100">

      {/* --- Header de la Sección --- */}
      <div className="w-full flex justify-center p-5">
        <h1 className="text-center font-title text-primary md:text-7xl text-5xl font-medium tracking-wider">
          Mi Perfil
        </h1>
      </div>

      <Separator margin="xs" />

      <div className="w-full grid lg:grid-cols-3 grid-cols-1 gap-10 mb-10">

        {/* --- Columna Izquierda: Tarjeta de Identidad --- */}
        <aside className="lg:col-span-1 h-fit">
          <div className="flex flex-col items-center p-8 bg-neutral-50 border border-neutral-200 shadow-sm gap-5 sticky top-30">
            {/* Avatar Container con borde decorativo */}
            <div className="size-48 rounded-full overflow-hidden border-4 border-fg-100 relative bg-neutral-100 flex items-center justify-center shadow-inner group">
              <Image
                src="/assets/icons/user.svg"
                alt={`Avatar de ${user.name}`}
                layout="fixed"
                className="object-cover size-30"
                fallback={
                  <div className="size-full flex items-center justify-center bg-fg-100 text-primary text-5xl font-title">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                }
              />
            </div>

            <div className="text-center space-y-2 w-full">
              <h2 className="text-3xl font-title text-primary font-medium tracking-wide">
                {user.name} {user.lastname}
              </h2>
              <p className="text-sm text-home-100/60 font-body tracking-widest uppercase">
                {user.role === 'admin' ? 'Administrador' : 'Cliente'}
              </p>
            </div>

            <Separator margin="xs" className="w-1/2 opacity-50" />

            <div className="flex flex-col w-full gap-3 mt-2">
              <button
                onClick={handleLogout}
                className="w-full py-3 text-sm tracking-wider text-neutral-50 bg-accent-700 hover:bg-red-700 transition-colors uppercase font-semibold focus:outline focus:outline-red-900"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </aside>

        {/* --- Columna Derecha: Detalles y Acciones --- */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/* Bloque de Información Personal */}
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-title text-primary border-l-4 border-accent pl-3">
              Información Personal
            </h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <InfoField label="Nombre de usuario" value={user.username} />
              <InfoField label="Email" value={user.email} />
              {/* Simulamos campos adicionales que usualmente vienen en el user object */}
              <InfoField label="Teléfono" value={user.phone || "No especificado"} />
              <InfoField label="Fecha de Registro" value={new Date().toLocaleDateString()} />
            </div>
          </div>

          <Separator className="opacity-30" />

          {/* Bloque de Accesos Directos (Dashboard de usuario) */}
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-title text-primary border-l-4 border-detail pl-3">
              Mis Compras
            </h3>

            <div className="bg-bg-100/30 p-8 border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  {/* Icono simulado de bolsa de compras */}
                  <Image src="/assets/icons/shopping-bag-check.svg" width={32} height={32} alt="Bolsa" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Historial de Pedidos</span>
                  <span className="text-sm text-home-100/70 text-pretty">Revisá el estado de tus compras y descarga tus facturas.</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/mis-pedidos")}
                className="whitespace-nowrap bg-primary hover:bg-home-100 text-neutral-50 px-8 py-3 transition-all duration-300 font-medium tracking-wide shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Ver Mis Pedidos
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

function InfoField({ label, value, className = "" }) {
  return (
    <div className={`${className} flex flex-col gap-1`}>
      <span className="text-sm font-normal text-home-100 tracking-wide ml-1">
        {label}
      </span>
      <div className="w-full border border-neutral-200 bg-neutral-100/50 p-3 text-start text-home-100/80 font-light cursor-default hover:border-neutral-300 transition-colors">
        {value}
      </div>
    </div>
  )
}
