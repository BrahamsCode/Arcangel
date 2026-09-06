import { Button, toast } from "@arcangel/ui"

export default function ToasterWithAction() {
  return (
    <Button
      onClick={() =>
        toast.success("Created Product", {
          description: "The product has been created.",
          action: {
            altText: "Undo product creation",
            onClick: () => {},
            label: "Undo",
          },
          duration: 10000,
        })
      }
    >
      Show
    </Button>
  )
}
