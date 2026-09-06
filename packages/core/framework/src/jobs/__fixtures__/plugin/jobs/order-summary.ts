import { ArcangelContainer } from "@arcangel/types"

export default async function handler(container: ArcangelContainer) {
  console.log(`You have received 5 orders today`)
}

export const config = {
  name: "summarize-orders",
  schedule: "* * * * * *",
  numberOfExecutions: 2,
}
