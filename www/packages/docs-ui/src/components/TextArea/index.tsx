import React from "react"
import clsx from "clsx"

export type TextAreaProps = {
  className?: string
} & React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      {...props}
      className={clsx(
        "bg-arcangel-bg-field shadow-border-base dark:shadow-border-base-dark",
        "rounded-docs_sm",
        "py-[6px] px-docs_0.5 text-medium font-base",
        "hover:bg-arcangel-bg-field-hover",
        "focus:shadow-arcangel-border-interactive-with-focus",
        "active:shadow-arcangel-border-interactive-with-focus",
        "disabled:bg-arcangel-bg-disabled",
        "disabled:border-arcangel-border-base disabled:border disabled:shadow-none",
        "placeholder:text-arcangel-fg-muted",
        "disabled:placeholder:text-arcangel-fg-disabled",
        props.className
      )}
    />
  )
}
