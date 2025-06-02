import "./Card.css"

const Card = ({ children, className = "", ...props }) => {
  const combinedClass = `card ${className}`

  return (
    <div className={combinedClass} {...props}>
      {children}
    </div>
  )
}

export default Card
