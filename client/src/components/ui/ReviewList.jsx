import { useToggle } from "@uidotdev/usehooks"
import { useState } from "react"
import ReviewCard from "./ReviewCard"

export default function ReviewList({ reviews = MOCK_REVIEWS, initialAmount = 2 }) {
  // TODO: cargar los reviews por diferido y con paginación
  // y el boton de "mostrar más" vaya cargando más reviews on demand.
  const [on, toggle] = useToggle(false)
  const [amount, setAmount] = useState(initialAmount)

  function handleToggle(e) {
    e.currentTarget.blur() // esto anda?? Se supone que no desplaza el scroll... 😪
    setAmount(on ? initialAmount : reviews.length)
    toggle()
  }

  return (
    <ul className="flex flex-col gap-7">
      {reviews.slice(0, amount).map((review, index) => (
        <li className="transition-discrete " key={index}>
          <ReviewCard
            data={review}
          />
        </li>
      ))}
      <button
        type="button"
        onClick={handleToggle}
        className="cursor-pointer text-md text-home-100 hover:text-primary"
      >
        {on ? "Ver menos opiniones" : "Ver más opiniones"}
      </button>
    </ul>
  )
}

const MOCK_REVIEWS = [
  {
    username: "John",
    date: "Noviembre 24, 2025",
    review:
      "I am 6 feet tall and 220 lbs. This shirt fit me perfectly in the chest and shoulders. My only complaint is that it is so long! I like to wear polo shirts untucked. This shirt goes completely past my rear end. If I wore it with ordinary shorts, you probably wouldnt be able to see the shorts at all – completely hidden by the shirt. It needs to be 4 to 5 inches shorter in terms of length to suit me. I have many RL polo shirts, and this one is by far the longest. I dont understand why.",
  },
  {
    username: "Kennet R.",
    date: "Agosto 16, 2024",
    review:
      "The shirt was not the fabric I believed it to be. It says Classic Fit but was made like the older versions, not the soft cotton like my others. I don’t understand how the labels are the same but a completely different shirt. Oh well, stuck with it now.",
  },
  {
    username: "Mike",
    date: "Abril 12, 2024",
    review:
      "Real authentic genuine quality however it fit me like an XL size when In fact Im L. Beware",
  },
  {
    username: "Ervin",
    date: "Julio 23, 2023",
    review:
      "The Ralph Lauren quaility is here in abundance. My husband always says that the Lauren polos fit better and last longer than any other brand.I love the new “heathered” color and the price is always excellent through shop",
  },
  {
    username: "Patrick",
    date: "Enero 01, 2023",
    review:
      "My son loved this Jacket for his Senior Prom… He got sooo many compliments! He is slim build 5’11 and 150lbs … I ordered a large … it was a little big … but it was fine!",
  },
]
