import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string
  size?: string
}

const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button {...props} className={className}>
      {children}
    </button>
  )
}

export { Button }
