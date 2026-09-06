import { Input } from "@arcangel/ui"

export default function InputSmall() {
  return (
    <div className="w-[250px]">
      <Input placeholder="First name" id="first-name" size="small" />
    </div>
  )
}
