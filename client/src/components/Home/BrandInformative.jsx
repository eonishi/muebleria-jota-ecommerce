import { Image } from "@unpic/react"
import TextRing from "../ui/TextRing/TextRing"

export default function BrandInformative() {
  return (
    <section className="my-25 mx-auto w-full max-w-3xl flex flex-col justify-evenly items-center gap-10" >
      <div className="p-15 self-center">
        <TextRing center={<Image src="/assets/logo.svg" alt="logo" className="h-5 w-auto" />} side={1} className="text-xs text-primary">
          Diseño Sostenible • Diseño Sostenible •&nbsp;
        </TextRing>
      </div>

      <p className="font-body font-light text-pretty text-home-100/70 text-center text-sm/7">
        Cada mueble nace del encuentro entre <StrongSustentable>artesanía consciente</StrongSustentable> y <StrongSustentable>diseño que perdura</StrongSustentable>.
        Trabajamos con <StrongSustentable>maderas certificadas</StrongSustentable>, <StrongSustentable>materiales recuperados</StrongSustentable> y
        procesos de <StrongSustentable>bajo impacto</StrongSustentable>,
        porque creemos que lo bello también puede ser responsable.
        Honramos un compromiso real con la <StrongSustentable>sustentabilidad</StrongSustentable> y la <StrongSustentable>longevidad</StrongSustentable>.
        <br /><em className="text-home-100/70 italic ">Piezas creadas para acompañar historias.</em>
      </p>
    </section>
  )
}

function StrongSustentable({ children }) {
  return (
    <strong className="text-accent">{children}</strong>
  )
}
