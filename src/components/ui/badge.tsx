import React from "react"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: string
}

const Badge = ({ children, className = "", ...props }: BadgeProps) => {
  return (
    <span {...props} className={className}>
      {children}
    </span>
  )
}

export { Badge }
