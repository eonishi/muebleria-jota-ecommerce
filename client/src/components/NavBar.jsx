import Logo from 'assets/logo.svg'

export default function NavBar() {
	return (
		<>
			<header>
				<img src={Logo} alt="Logo de la empresa" className='logo' />
				<nav>
					<ul className='menu'>
						<li>
							<a href='../index.html'>Inicio</a>
						</li>
						<li>
							<a href='../catalogo/catalogo.html'>Productos</a>
						</li>
						<li>
							<a href='../contacto/contacto.html'>Contacto</a>
						</li>
						<li>
							<a href='../carrito/carrito.html'>
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
