import { Image } from "@unpic/react"

export default function IconWithNumber({ src, alt, number}) {
  return (
		<div
			className='relative flex items-center justify-center '
		>
			<Image
				src={src}
        alt={alt}
        layout="fixed"
        className="-z-10"
			/>
      <span className='absolute flex items-center justify-center 
        min-w-5 min-h-5 size-1/2 overflow-hidden -top-3 -right-3 p-1
        text-center text-xs text-white rounded-full bg-accent-700 -z-10'>
			  {number}
			</span>
		</div>
	)
}
