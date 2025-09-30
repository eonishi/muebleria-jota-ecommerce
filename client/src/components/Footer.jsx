export default function Footer() {
	return (
		<>
			<footer className='footer'>
				<div className='container'>
					<div className='footer-row'>
						<section className='footer-links'>
							<h4>Navegación</h4>
							<ul>
								<li>
									<a href='../index.html'>Inicio</a>
								</li>
								<li>
									<a href='../catalogo/catalogo.html'>Productos</a>
								</li>
								<li>
									<a href='../contacto/contacto.html'>Contacto</a>
								</li>
							</ul>
						</section>

						<section className='footer-contact'>
							<h4>Contacto</h4>
							<ul className='footer-contacto'>
								<li className='contact-item'>
									<i
										className='fa-solid fa-envelope'
										aria-hidden='true'
									></i>
									<div className='contact-text'>
										<span className='contact-title'>Información</span>
										<a href='mailto:info@hermanosjota.com.ar'>
											info@hermanosjota.com.ar
										</a>
									</div>
								</li>
								<li className='contact-item'>
									<i
										className='fa-solid fa-envelope'
										aria-hidden='true'
									></i>
									<div className='contact-text'>
										<span className='contact-title'>Ventas</span>
										<a href='mailto:ventas@hermanosjota.com.ar'>
											ventas@hermanosjota.com.ar
										</a>
									</div>
								</li>
								<li className='contact-item'>
									<i
										className='fa-brands fa-whatsapp'
										aria-hidden='true'
									></i>
									<div className='contact-text'>
										<span className='contact-title'>WhatsApp</span>
										<a
											href='https://wa.me/541145678900'
											target='_blank'
											rel='noopener'
										>
											11 4567-8900
										</a>
									</div>
								</li>
								<li className='contact-item'>
									<i
										className='fa-brands fa-instagram'
										aria-hidden='true'
									></i>
									<div className='contact-text'>
										<span className='contact-title'>Instagram</span>
										<a
											href='https://instagram.com/hermanosjota_ba'
											target='_blank'
											rel='noopener'
										>
											hermanosjota_ba
										</a>
									</div>
								</li>
							</ul>
						</section>

						<section className='footer-ubi'>
							<h4>Ubicación</h4>
							<ul>
								<li>
									<i
										className='fa-solid fa-location-dot'
										aria-hidden='true'
									></i>
									Av. San Juan 2847 · CABA
								</li>
								<li>
									<i
										className='fa-regular fa-clock'
										aria-hidden='true'
									></i>
									Lunes a Viernes 10 – 19 · Sáb 10 – 14
								</li>
							</ul>
						</section>
					</div>
					<hr></hr>
					<p className='copyright'>
						© 2025 Mueblería Hermanos Jota — Todos los derechos reservados.
					</p>
				</div>
			</footer>
		</>
	)
}
