import { Image } from "@unpic/react"

export default function MenuButton({ toggleMenu }) {
  return (
    <button
      className='cursor-pointer p-5 md:hidden
          hover:scale-105 active:scale-95 transition-[transform,opacity] transition-discrete'
      onClick={toggleMenu}
    >
      <Image
        src='/assets/icons/menu.svg'
        alt='menu icon'
        layout='fixed'
      />
    </button>
  )
}
