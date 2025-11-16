import { Image } from '@unpic/react'
import { NavLink } from 'react-router'
import { useWindowSize } from "@uidotdev/usehooks"
import { useEffect } from 'react'

export default function HeroBanner() {
  const size = useWindowSize()
  useEffect(() => {
    console.log("width ", size.width, " height: ", size.height)
  }, [size])


  return (
    <section className='lg:pt-25 sm:pt-5 h-screen w-screen bg-bg-100 overflow-hidden flex justify-evenly md:items-center items-start text-home-100 font-body'>
      <div className='relative max-w-5/6 max-h-5/6 w-full h-full grid lg:grid-cols-2 grid-cols-1 lg:grid-rows-1 lg:place-content-between place-content-start justify-items-center'>

        <div className='col-span-1 flex flex-col lg:justify-start justify-center lg:items-start items-center lg:gap-5 gap-1 z-10 md:max-lg:backdrop-blur-xs md:max-lg:w-full'>
          <SpinSticker />
          <Title />
          <CTA />
        </div>

        <div className='col-span-1 place-self-stretch relative animate-toLeft'>
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
    <div className='size-25 bg-accent-700 m-5 animate-spin lg:self-end rounded-full'>

    </div>
  )
}

function BigProductImage() {
  return (
    <div className='absolute
        xl:top-30 xl:right-40 xl:scale-200
        lg:top-100 lg:right-20 lg:scale-350
        md:-top-50
        sm:scale-150
        top-5 scale-200
        drop-shadow-sm drop-shadow-black/10'>
      <Image src='/assets/Sillón Copacabana.webp' alt="" layout='fixed'
        className='object-cover'
      />
    </div>
  )
}
