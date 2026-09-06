import React from "react"

import type { LinkProps as NextLinkProps } from "next/link"
import Link from "next/link"
import clsx from "clsx"

type LinkButtonProps = NextLinkProps & {
  variant?: "base" | "interactive" | "subtle" | "muted"
  className?: string
} & React.AllHTMLAttributes<HTMLAnchorElement>

export const LinkButton = ({
  variant = "base",
  className,
  ...linkProps
}: LinkButtonProps) => {
  return (
    <Link
      {...linkProps}
      className={clsx(
        className,
        "inline-flex justify-center items-center",
        "gap-docs_0.25 rounded-docs_xs",
        "text-compact-small-plus disabled:text-arcangel-fg-disabled",
        "focus:shadow-borders-focus no-underline",
        variant === "base" && [
          "text-arcangel-fg-base hover:text-arcangel-fg-subtle",
          "focus:text-arcangel-fg-base",
        ],
        variant === "interactive" && [
          "text-arcangel-fg-interactive hover:text-arcangel-interactive-hover",
          "focus:text-arcangel-fg-interactive",
        ],
        variant === "subtle" && [
          "text-arcangel-fg-subtle hover:text-arcangel-fg-base",
          "focus:text-arcangel-fg-subtle",
        ],
        variant === "muted" && [
          "text-arcangel-fg-muted hover:text-arcangel-fg-subtle",
          "focus:text-arcangel-fg-muted",
        ]
      )}
    />
  )
}
