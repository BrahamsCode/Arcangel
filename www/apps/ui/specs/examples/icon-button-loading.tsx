import { PlusMini } from "@arcangel/icons"
import { IconButton } from "@arcangel/ui"

export default function IconButtonLoading() {
  return (
    <IconButton isLoading className="relative">
      <PlusMini />
    </IconButton>
  )
}
