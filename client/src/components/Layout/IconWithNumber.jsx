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
			/>
      <span className='absolute flex items-center justify-center 
        min-w-5 min-h-5 size-1/2 overflow-hidden -top-3 -right-3 p-1
        text-center text-xs text-white rounded-full bg-accent-700'>
			  {number}
			</span>
		</div>
	)
}