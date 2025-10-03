
export default function NavBar({ routes, navigate }) {
	function handleNav(e, route) {
		e.preventDefault()
		navigate(route)
	}

	return (
		<>
			<header>
				<img src="/assets/logo.svg" alt="Logo de la empresa" className='logo' />
				<nav>
					<ul className='menu'>
						<li>
							<a href='' onClick={e => handleNav(e, routes.HOME)}>
								Inicio
							</a>
						</li>
						<li>
							<a href='' onClick={e => handleNav(e, routes.CATALOGO)} >
								Productos
							</a>
						</li>
						<li>
							<a href='' onClick={e => handleNav(e, routes.CONTACTO)} >
								Contacto
							</a>
						</li>
						<li>
							<a href='' onClick={e => handleNav(e, routes.CARRITO)} >
								<i className='fa-solid fa-cart-shopping'></i>
								Carrito (<span id='cart-count'>0</span>)
							</a>
						</li>
					</ul>
					<div className='hamburger'>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</nav>
			</header>
		</>
	)
}
