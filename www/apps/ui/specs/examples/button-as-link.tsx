import { Button } from "@arcangel/ui"

export default function ButtonAsLink() {
  return (
    <Button asChild>
      <a href="https://arcangel.com" target="_blank" rel="noopener noreferrer">
        Open Arcangel Website
      </a>
    </Button>
  )
}
