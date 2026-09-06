import React from "react"
import clsx from "clsx"
import { ShadedBgIcon } from "../Icons/ShadedBg"

export type BadgeVariant =
  | "purple"
  | "orange"
  | "green"
  | "blue"
  | "red"
  | "neutral"
  | "code"

export type BadgeType = "default" | "shaded"

export type BadgeProps = {
  className?: string
  childrenWrapperClassName?: string
  variant: BadgeVariant
  badgeType?: BadgeType
} & React.HTMLAttributes<HTMLSpanElement>

export const Badge = ({
  className,
  variant,
  badgeType = "default",
  children,
  childrenWrapperClassName,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        "text-compact-x-small-plus text-center",
        badgeType === "default" &&
          "px-docs_0.25 py-0 rounded-docs_sm border border-solid",
        variant === "purple" &&
          "bg-arcangel-tag-purple-bg text-arcangel-tag-purple-text border-arcangel-tag-purple-border",
        variant === "orange" &&
          "bg-arcangel-tag-orange-bg text-arcangel-tag-orange-text border-arcangel-tag-orange-border",
        variant === "green" &&
          "bg-arcangel-tag-green-bg text-arcangel-tag-green-text border-arcangel-tag-green-border",
        variant === "blue" &&
          "bg-arcangel-tag-blue-bg text-arcangel-tag-blue-text border-arcangel-tag-blue-border",
        variant === "red" &&
          "bg-arcangel-tag-red-bg text-arcangel-tag-red-text border-arcangel-tag-red-border",
        variant === "neutral" &&
          "bg-arcangel-tag-neutral-bg text-arcangel-tag-neutral-text border-arcangel-tag-neutral-border",
        variant === "code" &&
          "bg-arcangel-contrast-bg-subtle text-arcangel-contrast-fg-secondary border-arcangel-contrast-border-bot",
        badgeType === "shaded" && "px-[3px] !bg-transparent relative",
        // needed for tailwind utilities
        "badge",
        className
      )}
      {...props}
    >
      {badgeType === "shaded" && (
        <ShadedBgIcon
          variant={variant}
          className={clsx("absolute top-0 left-0 w-full h-full")}
        />
      )}
      <span
        className={clsx(
          badgeType === "shaded" && "relative z-[1]",
          childrenWrapperClassName
        )}
      >
        {children}
      </span>
    </span>
  )
}
