import { Image } from "@unpic/react"

export default function NoItemsView({
  explain = "No hay ningún elemento",
  buttonOpt = {
    label: "Seguir navegando",
    onClick: () => { },
    color: "bg-accent hover:bg-lime-700"
  },
  imageOpt = {
    src: "/assets/icons/grid-xmark.svg",
    alt: "No hay elementos icono"
  }
}) {

  return (
    <section className='max-w-370 md:mt-30 mt-10 2xl:mx-auto md:mx-10 mx-5 gap-10 flex flex-col items-center justify-center'>
      <div>
        <Image src={imageOpt.src} alt={imageOpt.alt} layout="fixed" className="object-cover size-30" />
      </div>
      <p className="text-center font-body font-normal text-lg text-home-100/70">
        {explain}
      </p>
      <button type="button"
        onClick={buttonOpt.onClick}
        className={`cursor-pointer p-5 transition-colors text-neutral-50 font-body font-semibold ${buttonOpt.color}`}
      >
        {buttonOpt.label}
      </button>

    </section>

  )
}
