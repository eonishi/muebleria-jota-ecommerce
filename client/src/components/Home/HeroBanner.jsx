import { Image } from '@unpic/react'
import { NavLink } from 'react-router'
import TextRing from '../ui/TextRing/TextRing'

export default function HeroBanner() {

  return (
    <section className='lg:pt-25 sm:pt-5 h-screen w-screen bg-bg-100 overflow-hidden flex justify-evenly md:items-center items-start text-home-100 font-body'>
      <div className='relative max-w-5/6 max-h-5/6 w-full h-full grid lg:grid-cols-2 grid-cols-1 '>

        {/* TODO: Estaria bueno tener algunos banners intercambiables y que vayan rotando 🤷‍♂️ maybe... */}
        <div className='col-span-1 flex flex-col lg:justify-start justify-center lg:items-start items-center lg:gap-5 gap-1 z-10 md:max-lg:backdrop-blur-xs md:max-lg:w-full'>
          <SpinSticker />
          <Title />
          <CTA />
        </div>

        <div className='col-span-1 relative animate-toLeft h-full w-full'>
          <BigProductImage />
        </div>
      </div>
    </section >
  )
}

function Title() {
  return (
    <div className="animate-toRight">
      <h1 className='sm:text-8xl text-5xl italic font-bold lg:text-left text-center font-title tracking-wide sm:p-5 p-2 '>
        Sillón <br />
        Copacabana
      </h1>
    </div>
  )
}

function CTA() {
  return (
    <NavLink to="/catalogo" className="font-bold hover:text-primary p-5 mx-2 animate-toRight-200 opacity-0

        underline underline-offset-8 decoration-2 decoration-home-100 hover:decoration-primary transition-[color,text-decoration-color,opacity]">
      Conoce más
    </NavLink>
  )
}

function SpinSticker() {
  return (
    <div className='m-10 lg:self-end text-accent-700 font-body font-bold animate-spin-2000'>
      <TextRing side={1.1} className="text-xs">
        Hermanos Jota • Muebleria •&nbsp;
      </TextRing>
    </div>
  )
}

function BigProductImage() {
  return (
    <div className='absolute
        2xl:top-30 2xl:right-40 2xl:scale-200
        xl:top-10 xl:-right-20 xl:scale-150
        lg:top-100 lg:right-20 lg:scale-350
        md:-top-50
        sm:scale-150 sm:-top-20
        -top-25 scale-150
        drop-shadow-sm drop-shadow-black/10'>
      <Image src='/assets/hero-banner/copacabana-banner.png' alt="Hero banner del Sillón Copabana"
        className='object-cover h-full w-full'
      />
    </div>
  )
}
