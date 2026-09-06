"use client"

import React from "react"
import clsx from "clsx"
import { CopyButton } from "@/components/CopyButton"

export type InlineCodeProps = React.ComponentProps<"code"> & {
  variant?: "default" | "grey-bg"
}

export const InlineCode = ({
  variant = "default",
  ...props
}: InlineCodeProps) => {
  return (
    <CopyButton
      text={props.children as string}
      buttonClassName={clsx(
        "bg-transparent border-0 p-0 inline text-arcangel-fg-subtle group",
        "font-monospace"
      )}
    >
      <code
        {...props}
        className={clsx(
          "text-arcangel-tag-neutral-text border whitespace-break-spaces",
          "font-monospace text-code-label rounded-docs_sm py-0 px-[5px]",
          variant === "default" && [
            "bg-arcangel-tag-neutral-bg group-hover:bg-arcangel-tag-neutral-bg-hover",
            "group-active:bg-arcangel-bg-subtle-pressed group-focus:bg-arcangel-bg-subtle-pressed",
            "border-arcangel-tag-neutral-border",
          ],
          variant === "grey-bg" && [
            "bg-arcangel-bg-switch-off group-hover:bg-arcangel-bg-switch-off-hover",
            "group-active:bg-arcangel-bg-switch-off-hover group-focus:bg-arcangel-switch-off-hover",
            "border-arcangel-border-strong",
          ],
          props.className
        )}
      />
    </CopyButton>
  )
}
