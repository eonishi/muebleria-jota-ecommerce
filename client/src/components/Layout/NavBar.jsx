import { useState } from "react"
import { NavLink } from "react-router"
import { useCartContext } from "context/carrito"
import { Image } from "@unpic/react"
import IconWithNumber from "./IconWithNumber"
import AnimatedNavLi from "./AnimatedLi"
import AnimatedIconLi from "./AnimatedIconLi"
import MenuButton from "./MenuButton"
import useScrollBlock from "hooks/useScrollBlock"


export default function NavBar() {
	const { quantity } = useCartContext()
	const [isOpen, setIsOpen] = useState(false)
	const [blockScroll, allowScroll] = useScrollBlock()

	function toggleMenu() {
		setIsOpen(!isOpen)
		isOpen ? allowScroll() : blockScroll()
	}

	return (
		<header
			className='md:sticky md:top-0 flex items-center justify-between w-auto md:h-25 max-h-25
				md:px-5 bg-transparent backdrop-blur-sm
				font-semibold text-sm font-body text-home-100'
		>
			<div
				className={`absolute h-screen w-screen z-20 bg-black/50 inset-0 ${
					isOpen ? "block" : "hidden"
				}`}
			></div>
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
				className={`fixed inset-y-0 left-0 h-screen shadow-xl md:shadow-none md:h-full
				md:static md:w-auto bg-neutral-50 md:bg-transparent z-30 md:flex md:justify-center md:items-center
				transition-all transition-discrete ${isOpen ? "w-3/4" : "w-0"}`}
			>
				<ul
					className={`flex-col pb-2 justify-between md:pb-0
					md:static md:flex md:flex-row md:gap-2 transition-all transition-discrete
					ease-in ${isOpen ? "flex" : "hidden"}`}
				>
					<li className={`w-full flex justify-end items-center bg-linear-to-r from-neutral-200 to-neutral-50 md:hidden`}>
						<button
							onClick={toggleMenu}
							className='p-5'
						>
							<Image src='/assets/icons/xmark.svg' alt="close icon" layout="fixed"/>
						</button>
					</li>
					<AnimatedNavLi to='/' toggleMenu={toggleMenu}>
						<Image
							src='/assets/icons/home-simple.svg'
							alt='home icon'
							layout='fixed'
							className='md:hidden transition '
						/>
						INICIO
					</AnimatedNavLi>
					<AnimatedNavLi to='/catalogo' toggleMenu={toggleMenu}>
						<Image
							src='/assets/icons/sofa.svg'
							alt='sofa icon'
							layout='fixed'
							className='md:hidden transition'
						/>
						CATALOGO
					</AnimatedNavLi>
					<AnimatedNavLi to='/contacto' toggleMenu={toggleMenu}>
						<Image
							src='/assets/icons/forward-message.svg'
							alt='contact icon'
							layout='fixed'
							className='md:hidden transition'
						/>
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
		</header>
	)
}
