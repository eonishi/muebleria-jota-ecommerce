export default function Separator({ color = "bg-accent-700/50", margin = "md", className = "" }) {
  const marginSize = {
    none: "my-0",
    xxs: "my-1",
    xs: "my-3",
    sm: "my-5",
    md: "my-10",
    lg: "my-15",
  }[margin]
  return (
    <span className={`w-full h-px ${marginSize} ${color} ${className}`} />
  )
}
