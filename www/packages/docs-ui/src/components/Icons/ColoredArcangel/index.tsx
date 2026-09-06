import { Arcangel } from "@arcangel/icons"
import { IconProps } from "@arcangel/icons/dist/types"
import clsx from "clsx"
import React from "react"

type ArcangelIconProps = IconProps & {
  variant?: "base" | "subtle" | "muted"
}

export const ColoredArcangelIcon = ({
  className,
  variant = "base",
  ...props
}: ArcangelIconProps) => {
  return (
    <Arcangel
      {...props}
      className={clsx(
        className,
        variant === "base" && "[&_path]:fill-arcangel-fg-base",
        variant === "subtle" && "[&_path]:fill-arcangel-fg-subtle",
        variant === "muted" && "[&_path]:fill-arcangel-fg-muted"
      )}
    />
  )
}
