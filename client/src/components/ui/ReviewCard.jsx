import { Image } from "@unpic/react"
import RatingStar from "./RatingStar"

export default function ReviewCard({ data }) {
	return (
		<article className='grid grid-cols-10 sm:gap-x-10 gap-y-2 font-body text-home-100'>
			<span
				className='col-span-1 size-15 flex items-center justify-center 
        bg-neutral-300 rounded-full overflow-hidden'
			>
				<Image
					src='/assets/icons/user.svg'
					alt='user icon'
					layout='fixed'
					className='object-cover size-10'
				/>
			</span>
			<div className='flex flex-col col-span-5 sm:col-start-2 col-start-3 gap-1'>
				<h4 className='font-semibold'> {data?.username} </h4>
				<p className='text-xs font-light opacity-70'> {data?.date} </p>
				<RatingStar rating={2} />
			</div>
			<p className='col-start-2 col-span-9 text-sm bg-neutral-200 p-5 opacity-60 text-pretty'>
				{data?.review}
			</p>
		</article>
	)
}
