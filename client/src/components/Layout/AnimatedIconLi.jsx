import { NavLink } from "react-router"

export default function AnimatedIconLi({ to, children, className }) {
	return (
		<li className={'hover:rotate-10 transition md:flex justify-center items-center  ' + className}>
			<NavLink
				to={to}
				className=''
			>
				{children}
			</NavLink>
		</li>
	)
}
