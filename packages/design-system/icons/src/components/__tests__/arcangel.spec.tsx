  import * as React from "react"
  import { cleanup, render, screen } from "@testing-library/react"

  import Arcangel from "../arcangel"

  describe("Arcangel", () => {
    it("should render the icon without errors", async () => {
      render(<Arcangel data-testid="icon" />)


      const svgElement = screen.getByTestId("icon")

      expect(svgElement).toBeInTheDocument()

      cleanup()
    })
  })