"use client"

import React from "react"
import { Button } from "../../Button"
import { Tooltip } from "../../Tooltip"
import { Kbd } from "../../Kbd"
import { getOsShortcut } from "../../../utils/os-browser-utils"
import { useAiAssistant } from "../../../providers/AiAssistant"
import { useKeyboardShortcut } from "../../../hooks"
import { useSearch } from "../../../providers/Search"
import { BloomIcon } from "../../Icons"

export const AiAssistantTriggerButton = () => {
  const { setChatOpened } = useAiAssistant()
  const { setIsOpen } = useSearch()
  const osShortcut = getOsShortcut()

  useKeyboardShortcut({
    metakey: true,
    shortcutKeys: ["i"],
    action: () => {
      setChatOpened((prev) => !prev)
      setIsOpen(false)
    },
    checkEditing: false,
  })

  return (
    <Tooltip
      render={() => (
        <span className="flex gap-[5px] items-center">
          <Kbd className="bg-arcangel-bg-field-component border-arcangel-border-strong w-[18px] h-[18px] inline-block">
            {osShortcut}
          </Kbd>
          <Kbd className="bg-arcangel-bg-field-component border-arcangel-border-strong w-[18px] h-[18px] inline-block">
            i
          </Kbd>
        </span>
      )}
    >
      <Button
        variant="transparent-clear"
        onClick={() => setChatOpened((prev) => !prev)}
      >
        <BloomIcon className="text-arcangel-fg-subtle" />
        <span className="hidden md:inline-block text-arcangel-fg-subtle">
          Ask Bloom
        </span>
      </Button>
    </Tooltip>
  )
}
