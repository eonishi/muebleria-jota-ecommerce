
export default function BackgroundImage({isRendered}) {
  return (
		<img
			src='/assets/Butaca Mendoza.webp'
			alt='Imagen de referencia'
			className='image-display'
			style={{
				opacity: isRendered ? "0" : "0.6",
				filter: "brightness(0.8) blur(10px)",
			}}
		/>
	)
}