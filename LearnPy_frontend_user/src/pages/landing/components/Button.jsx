import "./Button.css"

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClass = variant === "outline" ? "button-outline" : "button-primary"
  const combinedClass = `button ${baseClass} ${className}`

  return (
    <button className={combinedClass} {...props}>
      {children}
      <span className="button-overlay"></span>
    </button>
  )
}

export default Button
