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
    username: "Juan",
    date: "Noviembre 24, 2025",
    review:
      "Excelente calidad y diseño. El mueble es robusto y se ve muy elegante en mi sala de estar. La instalación fue sencilla y las instrucciones claras. Definitivamente recomendaría este producto a cualquiera que busque mejorar su hogar con un toque moderno.",
  },
  {
    username: "Carlos R.",
    date: "Agosto 16, 2024",
    review:
      "La calidad del mueble es excepcional. Los materiales son duraderos y el acabado es impecable. Me encanta cómo se ve en mi sala de estar y ha recibido muchos cumplidos de mis amigos y familiares. La instalación fue fácil y rápida gracias a las instrucciones claras proporcionadas. Sin duda, una excelente compra que vale cada centavo.",
  },
  {
    username: "Miguel S.",
    date: "Abril 12, 2024",
    review:
      "Estoy muy satisfecho con mi compra. El mueble llegó a tiempo y en perfectas condiciones. La calidad del material es impresionante y el diseño es moderno y funcional. La instalación fue sencilla y las instrucciones eran claras. Recomiendo este producto a cualquiera que busque un mueble de alta calidad para su hogar.",
  },
  {
    username: "Ervin",
    date: "Julio 23, 2023",
    review:
      "Compré este mueble para mi sala de estar y estoy muy contento con mi elección. La calidad del material es excelente y el diseño es moderno y elegante. La instalación fue fácil gracias a las instrucciones claras proporcionadas. Definitivamente recomendaría este producto a cualquiera que busque un mueble de alta calidad para su hogar.",
  },
  {
    username: "Patricia T.",
    date: "Enero 01, 2023",
    review:
      "El mueble superó mis expectativas en términos de calidad y diseño. Los materiales son robustos y el acabado es impecable. La instalación fue sencilla y las instrucciones claras. Me encanta cómo se ve en mi sala de estar y ha recibido muchos cumplidos de mis amigos y familiares. Sin duda, una excelente compra que vale cada centavo.",
  },
]
