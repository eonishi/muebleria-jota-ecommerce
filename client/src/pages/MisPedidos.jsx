import Separator from "components/ui/Separator"
import NoItemsView from "components/ui/NoItemsView"
import useFetch from "hooks/useFetch"
import { useNavigate } from "react-router"
import { stringifyPrice } from "utils/currency"
import { Image } from "@unpic/react"
import Badge from "components/ui/Badge"
import { toast } from "sonner"

export function MisPedidos() {
  const { data, loading, error } = useFetch("/api/pedidos")
  const navigate = useNavigate()

  function cancelarPedido(pedido) {
    const confirm = window.confirm("¿Seguro que querés cancelar tu pedido?")
    if (!confirm) { return }

    const url = `/api/pedidos/${pedido.id}`
    const reqOpts = {
      method: "POST",
      body: JSON.stringify({ state: "cancelado" }),
      headers: { "Content-Type": "application/json" }
    }

    fetch(url, reqOpts)
      .then((res) => {
        if (res.ok) {
          toast.success("Pedido cancelado")
          navigate(0)
        } else { toast.error("Su pedido ya no se puede cancelar.") }
      })
      .catch(() => { toast.error("Hubo un error cancelando su pedido. Intente nuevamente.") })
  }

  if (error) {
    return <NoItemsView
      explain="Todavía no hiciste ningún pedido."
      buttonOpt={{
        label: "Volver al catalogo",
        onClick: () => { navigate("/catalogo") },
        color: "bg-accent hover:bg-lime-700"
      }}
      imageOpt={{
        src: "/assets/icons/shopping-bag-warning.svg",
        alt: "No hay pedidos icono"
      }}
    />
  }


  if (loading) { return <p>Cargando...</p> }

  return (
    <section className="max-w-350 md:mt-25 mx-auto px-5 gap-5 flex flex-col items-center justify-center font-body text-home-100">
      <h2 className="text-center text-3xl font-title text-primary md:text-5xl font-semibold tracking-wider w-full p-7">
        Mis Pedidos
      </h2>

      <Separator margin="xs" />

      <table className="table w-full">
        <thead className="md:table-header-group hidden transition-discrete transition-transform">
          <tr className="table-row *:table-cell *:text-left *:p-5 bg-accent-700 text-neutral-50 border border-accent-700">
            <th>ID</th>
            <th className="lg:min-w-2xs min-w-4xs">DETALLE</th>
            <th>FECHA</th>
            <th>SUBTOTAL</th>
            <th>ESTADO</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-row-group *:text-left ">
          {data?.length > 0 &&
            data?.map((pedido) => <PedidoRow
              key={pedido.id}
              pedido={pedido}
              cancel={() => cancelarPedido(pedido)}
              edit={() => {/*TODO*/ }}
            />)
          }
        </tbody>
      </table>
    </section>
  )
}

function PedidoRow({ pedido, cancel, edit }) {
  // Nose muy bien donde meter esto. Es un objecto que relaciona el estado de pedido con el tipo de badge
  // Cada key es un estado del pedido (mirar mongo/schema/Pedido.js)
  // El estado en un enum: ["pendiente", "cancelado", "en proceso", "entregado"]
  const type = {
    "pendiente": "idle",
    "cancelado": "cancel",
    "en proceso": "idle",
    "entregado": "success",
  }[pedido.state]


  const divider = "relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-neutral-200 "

  return (
    <tr
      key={pedido.id}
      className="*:md:p-5 *:p-3 border border-accent-700 md:table-row odd:bg-fg-100 even:bg-neutral-50
        grid grid-cols-1 mb-5 *:md:table-cell"
    >
      <td className={`md:order-0 order-1 col-span-2 row-span-1 flex justify-between items-center ${divider}`}>
        <span className="md:hidden font-light text-sm">ID:</span>
        <span>
          {pedido.id.slice(-4)}
        </span>
      </td>

      <td className={`md:order-0 col-span-1 ${divider}`}>
        <details name="Productos">
          <summary className="hover:text-primary transition-colors font-normal cursor-pointer focus:outline-0">
            Productos
          </summary>
          <ul className="">
            {pedido.products?.map((prod, i) =>
              <li key={i}
                className="md:grid md:grid-cols-10 font-body my-1 flex gap-1 justify-start items-center"
              >
                <Badge label={prod.amount} className="col-span-1" />
                <div className="truncate col-span-9 font-light">
                  {prod.product.product_name}
                </div>

              </li>)
            }
          </ul>
        </details>
      </td>

      <td className={`text-sm font-light col-span-2 row-span-1 order-2 md:order-0 flex justify-between items-center ${divider}`}>
        <span className="md:hidden">
          Fecha:
        </span>
        <span>
          {new Date(pedido.createdAt).toLocaleDateString("es-AR", { year: "numeric", month: "numeric", day: "numeric" })}
        </span>
      </td>

      <td className={`font-bold col-span-2 row-span-1 order-3 md:order-0 flex justify-between items-center ${divider}`}>
        <span className="font-light text-sm md:hidden">
          Total:
        </span>
        <span>
          {stringifyPrice(pedido.total)}
        </span>
      </td>

      <td className={`col-span-2 row-span-1 order-4 md:order-0 flex justify-between items-center `}>
        <span className="md:hidden font-light text-sm">
          Estado:
        </span>
        <Badge type={type} label={pedido.state} icon={pedido.state === "en proceso" ? "/assets/icons/select-face3d.svg" : ""} />
      </td>

      <td className="col-span-2 row-span-1 order-5 md:order-0 flex justify-between items-center font-normal gap-2">
        {pedido.state === "pendiente" &&
          <>
            <button
              type="button"
              className="cursor-pointer w-fit focus:outline focus:outline-primary underline underline-offset-2"
              onClick={edit}
            >
              <Image src="/assets/icons/edit-pencil.svg" alt="Editar pedido icono" layout="fixed" className="object-cover size-5 hidden md:block" />
              <span className="md:hidden"> Editar </span>
            </button>
            <button
              type="button"
              className="cursor-pointer w-fit focus:outline focus:outline-primary underline underline-offset-2"
              onClick={cancel}
            >
              <Image src="/assets/icons/delete-bin-idle.svg" alt="Cancelar pedido icono" layout="fixed" className="object-cover size-5 hidden md:block" />
              <span className="md:hidden">Cancelar</span>
            </button>
          </>
        }
      </td>

    </tr>
  )
}

