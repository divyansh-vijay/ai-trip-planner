import React from "react"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const Label = ({ children, className = "", ...props }: LabelProps) => {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  )
}

export { Label }
