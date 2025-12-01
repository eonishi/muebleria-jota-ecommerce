import { Image } from "@unpic/react"

export default function Badge({ type = "default", label = "", className, icon }) {
  const opts = {
    "default": {
      color: "bg-fg-100 text-primary",
      icon: "",
      label: label || "default",
    },
    "idle": {
      color: "bg-sky-100 text-sky-700",
      icon: "/assets/icons/clock-solid.svg",
      label: label || "Esperando",
    },
    "cancel": {
      color: "bg-rose-100 text-rose-700",
      icon: "/assets/icons/xmark-circle-solid.svg",
      label: label || "Cancelado",
    },
    "warning": {
      color: "bg-amber-100 text-amber-700",
      icon: "/assets/icons/warning-triangle-solid.svg",
      label: label || "Advertencia",
    },
    "success": {
      color: "bg-emerald-100 text-emerald-700",
      icon: "/assets/icons/check-circle-solid.svg",
      label: label || "Exitoso",
    },
  }[type]

  // El badge usa iconos por defecto dependiento el type
  // pero está bueno dejar que el padre los sobreescriba si lo necesita
  if (icon) { opts.icon = icon }

  return (
    <span className={`${className} font-body font-semibold truncate py-1 px-2 w-fit flex items-center justify-evenly rounded-full text-xs gap-2 ${opts.color}`}>
      {opts.icon && <Image src={opts.icon} alt={`${opts.label} icono`} layout="fixed" className="object-cover size-4" />}
      {opts.label}
    </span>
  )
}
