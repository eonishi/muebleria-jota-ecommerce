import { NavLink } from "react-router"

export default function AnimatedNavLi({ to, children, toggleMenu }) {
	return (
		<li
			className='hover:text-primary transition ease-in-out relative
			flex items-center justify-start overflow-hidden md:justify-center

			before:bg-linear-to-r before:from-neutral-300 before:to-neutral-50 
			before:absolute before:bottom-0 before:px-5 before:h-1/50 before:w-full
			before:transition-all before:ease-in-out before:duration-200
			md:before:hidden'
		>
			<NavLink
				onClick={toggleMenu}
				to={to}
				className={`p-5 flex items-center justify-start gap-5
					md:after:absolute md:after:-bottom-1 md:after:left-0 md:after:h-1/10 md:after:bg-primary
					md:after:transition-all md:after:ease-in-out md:after:duration-200 md:after:w-0 md:hover:after:w-full`}
			>
				{children}
			</NavLink>
		</li>
	)
}
