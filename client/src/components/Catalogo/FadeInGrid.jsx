import { Children } from "react"

export default function FadeInGrid({ children }) {
  return (
    <div className="productos-grid" id="productos-grid">
      {Children.toArray(children).map((child, index) => (
        <div
          key={index}
          style={{
            opacity: 0,
            animation: "fadeInUp 0.5s ease-out forwards",
            animationDelay: `${index * 100}ms`,
          }}
        >
          { child }
        </div>
      ))}
    </div>
  )
} 