// Source Code: https://codepen.io/jh3y/pen/OJwagZa
import "./TextRing.css"

export default function TextRing({ children, side, className, center = null }) {
  const CHARS = children.split('')
  const INNER_ANGLE = 360 / CHARS.length
  return (
    <span
      className={`text-ring ${className}`}
      style={{
        '--total': CHARS.length,
        '--radius': side / Math.sin(INNER_ANGLE / (180 / Math.PI))
      }}
    >
      {CHARS.map((char, index) => (
        <span style={{ '--index': index }}>
          {char}
        </span>
      ))}
      {center && (
        <span className="text-ring__center" aria-hidden="true">
          {center}
        </span>
      )}

    </span>
  )
}
