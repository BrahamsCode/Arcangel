"use client"

import React, { useEffect, useMemo, useState } from "react"
import { CopyButton } from "../../../CopyButton"
import { DocsTrackingEvents } from "../../../../constants"
import { useAnalytics } from "../../../../providers/Analytics"
import clsx from "clsx"
import { CheckMini, SquareTwoStack } from "@arcangel/icons"
import { CodeBlockStyle } from "../.."

export type CodeBlockCopyActionProps = {
  source: string
  inHeader: boolean
  codeBlockStyle?: CodeBlockStyle
}

export const CodeBlockCopyAction = ({
  source,
  inHeader,
  codeBlockStyle = "loud",
}: CodeBlockCopyActionProps) => {
  const [copied, setCopied] = useState(false)
  const { track } = useAnalytics()

  useEffect(() => {
    if (!copied) {
      return
    }

    setTimeout(() => {
      setCopied(false)
    }, 1000)

    track({
      event: {
        event: DocsTrackingEvents.CODE_BLOCK_COPY,
        options: {
          text: source.substring(0, 150),
        },
      },
    })
  }, [copied])

  const iconClassName = useMemo(() => {
    if (codeBlockStyle === "loud") {
      return [
        "text-arcangel-contrast-fg-secondary",
        "group-hover:text-arcangel-contrast-fg-primary",
        "group-focus:text-arcangel-contrast-fg-primary",
      ]
    }

    return [
      "text-arcangel-fg-muted",
      "group-hover:text-arcangel-fg-subtle",
      "group-focus:text-arcangel-fg-subtle",
    ]
  }, [codeBlockStyle])

  return (
    <CopyButton
      text={source}
      tooltipClassName="font-base"
      className={clsx("group")}
      buttonClassName={clsx(!inHeader && "p-[6px]", inHeader && "p-[4.5px]")}
      tooltipInnerClassName={clsx(
        inHeader && "flex",
        "h-fit rounded-docs_sm",
        codeBlockStyle === "loud" && "group-hover:bg-arcangel-contrast-bg-base-hover group-focus:bg-arcangel-contrast-bg-base-hover",
        codeBlockStyle === "subtle" && "group-hover:bg-arcangel-bg-component group-focus:bg-arcangel-bg-component"
      )}
      onCopy={() => setCopied(true)}
    >
      {!copied && (
        <SquareTwoStack
          className={clsx(iconClassName)}
          data-testid="not-copied-icon"
        />
      )}
      {copied && (
        <CheckMini className={clsx(iconClassName)} data-testid="copied-icon" />
      )}
    </CopyButton>
  )
}
