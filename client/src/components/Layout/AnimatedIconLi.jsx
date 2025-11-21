import { NavLink } from "react-router"

export default function AnimatedIconLi({ to, children, className }) {
  return (
    <li className={'group md:flex justify-center items-center  ' + className}>
      <NavLink
        to={to}
        className='*:group-hover:rotate-10 *:transition-transform '
      >
        {children}
      </NavLink>
    </li>
  )
}
