import { Image } from "@unpic/react"
import SortSelection from "./SortSelection"


export default function FilterBar({ children }) {
  return (
    <div className="flex bg-neutral-100 px-5 py-4 w-full items-center justify-between  gap-5 sm:flex-nowrap flex-wrap">

      <div className="flex gap-2 items-center cursor-pointer mr-5">
        <Image src="/assets/icons/filter-list.svg" alt="filter list" layout="fixed"/>
        <span className="font-body text-sm font-medium text-home-100">Filtrar</span>
      </div>

      <div className="bg-home-100/50 h-5 w-px md:block hidden" />

      {children}

      <SortSelection/>
    </div>
  )
}