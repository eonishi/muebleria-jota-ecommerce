import { useState, useEffect } from "react"
import { NavLink } from "react-router"
import { useCartContext } from "context/carrito"
import { Image } from "@unpic/react"
import IconWithNumber from "./IconWithNumber"
import AnimatedNavLi from "./AnimatedLi"
import AnimatedIconLi from "./AnimatedIconLi"
import MenuButton from "./MenuButton"
import AsideMenu from "./AsideMenu"
import PortalToBody from "components/ui/PortalToBody"
import { useWindowSize } from "@uidotdev/usehooks"

export default function NavBar() {
  const { quantity } = useCartContext()
  const [isOpen, setIsOpen] = useState(false)
  const size = useWindowSize()

  function toggleMenu() {
    setIsOpen(!isOpen)
  }
  function closeMenu() {
    setIsOpen(false)
  }

  // Si hay un resize de la ventana con el menu lateral abierto se cierra automaticamente
  useEffect(() => {
    // 768px is 'md:' in taildwindcss
    if (size.width >= 768) {
      setIsOpen(false)
    }
  }, [isOpen, size.width])

  return (
    <header
      className='md:fixed md:w-full md:top-0 flex items-center justify-between md:h-25 max-h-25
				md:px-5 bg-transparent backdrop-blur-sm z-10
				font-semibold text-sm font-body text-home-100'
    >
      <MenuButton toggleMenu={toggleMenu} />

      <NavLink
        to='/'
        className='h-full flex items-center justify-center overflow-hidden hover:scale-105 transition-transform ease-out'
      >
        <Image
          src='/assets/logo.svg'
          alt='Logo de la empresa'
          className='h-15 md:h-full object-cover '
          layout='fixed'
        />
      </NavLink>

      <nav
        className={`hidden md:shadow-none md:h-full md:static md:w-auto md:flex md:justify-center md:items-center`}
      >
        <ul className={`static hidden md:flex flex-row gap-2 justify-between`}>
          <AnimatedNavLi to='/' >
            INICIO
          </AnimatedNavLi>
          <AnimatedNavLi to='/catalogo' >
            CATALOGO
          </AnimatedNavLi>
          <AnimatedNavLi to='/contacto' >
            CONTACTO
          </AnimatedNavLi>
        </ul>
      </nav>

      <nav className=''>
        <ul className='flex items-center justify-center [&>li>a]:p-5'>
          <AnimatedIconLi
            to='/login'
            className='hidden'
          >
            <Image
              src='/assets/icons/user.svg'
              layout='fixed'
              alt='user icon'
            />
          </AnimatedIconLi>
          <AnimatedIconLi className='hidden'>
            <Image
              src='/assets/icons/search.svg'
              layout='fixed'
              alt='search icon'
            />
          </AnimatedIconLi>
          <AnimatedIconLi
            to='/carrito'
            className='flex'
          >
            <IconWithNumber
              src='/assets/icons/cart.svg'
              alt='cart icon'
              number={quantity}
            />
          </AnimatedIconLi>
        </ul>
      </nav>

      {isOpen &&
        <PortalToBody>
          <AsideMenu closeMenu={closeMenu} />
        </PortalToBody>
      }
    </header>
  )
}
