import { NavLink } from "react-router"

export default function AnimatedNavLi({ to, children }) {
  return (
    <li
      className='hover:text-primary ease-in-out relative flex items-center overflow-hidden md:justify-center'
    >
      <NavLink
        to={to}
        className="p-5 after:absolute after:-bottom-1 after:left-0 after:h-1/10 after:bg-primary
           after:ease-in-out after:duration-200 after:w-0 hover:after:w-full"
      >
        {children}
      </NavLink>
    </li>
  )
}
