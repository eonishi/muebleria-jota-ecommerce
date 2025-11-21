import { Children } from "react"

export default function FadeInGrid({ children }) {
	return (
    <div className="grid grid-cols-(--auto-colums) w-full gap-10 ">
			{Children.toArray(children).map((child, index) => (
				<div
					key={index}
					style={{
						opacity: 0,
						animation: "fadeInUp 0.5s ease-out forwards",
						animationDelay: `${index * 100}ms`,
					}}
				>
					{child}
				</div>
			))}
		</div>
	)
}
