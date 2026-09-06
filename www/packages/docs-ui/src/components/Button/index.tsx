import clsx from "clsx"
import React from "react"

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "transparent"
  | "transparent-clear"

export type ButtonType = "default" | "icon"

export type ButtonProps = {
  isSelected?: boolean
  disabled?: boolean
  variant?: ButtonVariants
  className?: string
  buttonType?: ButtonType
  buttonRef?: React.LegacyRef<HTMLButtonElement>
  type?: "button" | "submit" | "reset"
} & React.HTMLAttributes<HTMLButtonElement>

export const Button = ({
  className,
  children,
  variant = "primary",
  buttonType = "default",
  buttonRef,
  ...props
}: ButtonProps) => {
  const variantClasses = {
    primary: [
      "px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
      "bg-arcangel-button-inverted",
      "hover:bg-arcangel-button-inverted-hover hover:no-underline",
      "active:bg-arcangel-button-inverted-pressed",
      "focus:bg-arcangel-button-inverted",
      "shadow-button-inverted focus:shadow-button-inverted-focused transition-shadow",
      "dark:shadow-button-inverted-dark dark:focus:shadow-button-inverted-focused-dark",
      "disabled:bg-arcangel-bg-disabled disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
      "disabled:cursor-not-allowed",
      "text-compact-small-plus text-arcangel-contrast-fg-primary",
      "[&_a]:text-arcangel-contrast-fg-primary",
      "disabled:text-arcangel-fg-disabled",
      "[&_a]:disabled:text-arcangel-fg-disabled",
      "select-none",
    ],
    secondary: [
      "px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
      "bg-arcangel-button-neutral",
      "hover:bg-arcangel-button-neutral-hover hover:no-underline",
      "active:bg-arcangel-button-neutral-pressed",
      "focus:bg-arcangel-button-neutral",
      "disabled:bg-arcangel-bg-disabled disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
      "disabled:cursor-not-allowed disabled:text-arcangel-fg-disabled",
      "text-compact-small-plus text-arcangel-fg-base",
      "[&_a]:text-arcangel-fg-base",
      "shadow-button-neutral focus:shadow-button-neutral-focused active:shadow-button-neutral transition-shadow",
      "dark:shadow-button-neutral dark:focus:shadow-button-neutral-focused dark:active:shadow-button-neutral",
      "select-none",
    ],
    transparent: [
      "px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
      "bg-transparent shadow-none border-0 outline-none",
      "text-compact-small-plus text-arcangel-fg-base",
      "hover:bg-arcangel-button-transparent-hover",
      "active:bg-arcangel-button-transparent-pressed",
      "focus:bg-arcangel-bg-base focus:shadow-button-neutral-focused dark:focus:shadow-button-neutral-focused-dark",
      "disabled:bg-transparent disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
      "disabled:cursor-not-allowed disabled:text-arcangel-fg-disabled",
    ],
    transparentClear: [
      "px-docs_0.5 py-docs_0.25 rounded-docs_sm cursor-pointer",
      "bg-transparent shadow-none border-0 outline-none",
      "text-compact-small-plus text-arcangel-fg-muted",
      "hover:bg-arcangel-button-transparent-hover",
      "active:bg-arcangel-button-transparent-pressed",
      "focus:bg-arcangel-bg-base focus:shadow-button-neutral-focused dark:focus:shadow-button-neutral-focused-dark",
      "disabled:bg-transparent disabled:shadow-button-neutral dark:disabled:shadow-button-neutral-dark",
      "disabled:cursor-not-allowed disabled:text-arcangel-fg-disabled",
    ],
  }

  return (
    <button
      className={clsx(
        "inline-flex flex-row justify-center items-center gap-[6px] font-base",
        variant === "primary" && variantClasses.primary,
        variant === "secondary" && variantClasses.secondary,
        variant === "transparent" && variantClasses.transparent,
        variant === "transparent-clear" && variantClasses.transparentClear,
        buttonType === "icon" && "!px-docs_0.25",
        className
      )}
      ref={buttonRef}
      {...props}
    >
      {children}
    </button>
  )
}
