import { Image } from "@unpic/react"

const MAX_STARS = 5

export default function RatingStar({ rating = 4, size = 3 }) {
  // TODO: agregar manejo de floats para ratings, 
  // ya sea agregando halfStar o redondeando la mantiza
  const startSize = {
    1: "*:size-1",
    2: "*:size-2",
    3: "*:size-3",
    4: "*:size-4",
    5: "*:size-5",
    6: "*:size-6",
    7: "*:size-7",
    8: "*:size-8",
    9: "*:size-9",
    10: "*:size-10",
  }[size]

  return (
    <div className={`flex ${startSize} gap-1 items-center`}>
      {
        Array.from({ length:MAX_STARS }, (_, index) => 
          <Image
            key={index}
            src={index < rating ? '/assets/icons/star-solid.svg' : '/assets/icons/star-empty.svg'}
            alt='star icon'
            layout='fixed'
            className='object-cover'
          />
        )
      }
    </div>
  )
}