import { Image } from "@unpic/react"
import { NavLink } from "react-router"
import { useLockBodyScroll } from "@uidotdev/usehooks"

const menuOptions = [
  {
    icon: "/assets/icons/home-simple.svg",
    title: "INICIO",
    route: "/",
  },
  {
    icon: "/assets/icons/sofa.svg",
    title: "CATALOGO",
    route: "/catalogo",
  },
  {
    icon: "/assets/icons/user.svg",
    title: "MI PERFIL",
    route: "/perfil",
  },
  {
    icon: "/assets/icons/shopping-bag-check.svg",
    title: "MIS PEDIDOS",
    route: "/mis-pedidos",
  },
  {
    icon: "/assets/icons/forward-message.svg",
    title: "CONTACTO",
    route: "/contacto",
  },
]

export default function AsideMenu({ closeMenu }) {
  useLockBodyScroll()

  return (
    <aside className="">
      <BlackScreen />
      <nav className="fixed z-50 inset-y-0 left-0 h-screen w-3/4 shadow-xl bg-neutral-50 font-medium font-body">

        <ul className="flex flex-col gap-2 z-50">
          <CloseAsideMenuButton closeMenu={closeMenu} />

          {menuOptions.map((opt) => (
            <AsideMenuLi key={opt.title} opt={opt} closeMenu={closeMenu} />
          ))}
        </ul>

      </nav>
    </aside>
  )
}

function AsideMenuLi({ opt, closeMenu }) {
  const separator = "before:bg-linear-to-r before:from-neutral-300 before:to-neutral-50 before:absolute before:bottom-0 before:px-5 before:h-px before:w-full"
  return (
    <li className={`flex items-center justify-start hover:text-primary focus:text-primary w-full relative ${separator}`}>
      <NavLink
        to={opt.route}
        onClick={closeMenu}
        className={`p-5 flex items-center justify-start gap-5 w-full`}
      >
        <Image src={opt.icon} alt={`${opt.title} icon`} layout="fixed" />
        {opt.title}
      </NavLink>
    </li>
  )
}

function BlackScreen() {
  return (
    <div className="fixed z-10 h-screen w-screen bg-black/50 inset-0 pointer-events-none" />
  )
}

function CloseAsideMenuButton({ closeMenu }) {
  return (
    <li className={`w-full flex justify-end items-center bg-linear-to-r from-neutral-200 to-neutral-50 md:hidden`}>
      <button
        onClick={closeMenu}
        className='p-5'
      >
        <Image src='/assets/icons/xmark.svg' alt="close icon" layout="fixed" />
      </button>
    </li>
  )
}
