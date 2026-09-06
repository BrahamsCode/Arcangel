import React from "react"
import clsx from "clsx"

export type InputTextProps = {
  className?: string
  addGroupStyling?: boolean
  passedRef?: React.Ref<HTMLInputElement>
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const InputText = ({
  addGroupStyling = false,
  className,
  passedRef,
  ...props
}: InputTextProps) => {
  return (
    <input
      {...props}
      className={clsx(
        "bg-arcangel-bg-field-component shadow-border-base dark:shadow-border-base-dark",
        "rounded-docs_sm px-docs_0.5",
        "hover:bg-arcangel-bg-field-component-hover",
        addGroupStyling && "group-hover:bg-arcangel-bg-field-component-hover",
        "focus:border-arcangel-border-interactive",
        "active:border-arcangel-border-interactive",
        "disabled:bg-arcangel-bg-disabled",
        "disabled:border-arcangel-border-base",
        "placeholder:text-arcangel-fg-muted",
        "disabled:placeholder:text-arcangel-fg-disabled",
        "text-compact-small font-base",
        className
      )}
      ref={passedRef}
    />
  )
}
