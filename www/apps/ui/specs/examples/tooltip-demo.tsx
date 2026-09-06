import { InformationCircleSolid } from "@arcangel/icons"
import { Tooltip } from "@arcangel/ui"

export default function TooltipDemo() {
  return (
    <Tooltip content="The quick brown fox jumps over the lazy dog.">
      <InformationCircleSolid />
    </Tooltip>
  )
}
