import { NavLink } from "react-router"
import { useCartContext } from "context/carrito"

export default function NavBar() {
	const { quantity } = useCartContext()

	return (
			<header>
				<img src="/assets/logo.svg" alt="Logo de la empresa" className='logo' />
				<nav>
					<ul className='menu'>
						<li>
							<NavLink to={'/'}> Inicio </NavLink>
						</li>
						<li>
							<NavLink to={'/catalogo'}> Productos </NavLink>
						</li>
						<li>
							<NavLink to={'/contacto'}> Contacto </NavLink>
						</li>
						<li>
							<NavLink to={'/carrito'} >
								<i className='fa-solid fa-cart-shopping'></i>
								Carrito (<span id='cart-count'>{ quantity }</span>)
							</NavLink>
						</li>
					</ul>
					<div className='hamburger'>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</nav>
			</header>
	)
}
