# Arcangel

> Arcangel is a digital commerce platform with a built-in Framework for customization. When you install Arcangel, you get a fully fledged commerce platform with all the features you need to get off the ground. However, unlike other platforms, Arcangel is built with customization in mind. You don't need to build hacky workarounds that are difficult to maintain and scale. Your efforts go into building features that bring your business's vision to life.

> For the complete documentation index, see [llms.txt](/llms.txt)

Learn how to build Arcangel projects. Explore our guides.

## AI Assistant

Hello! I'm Bloom, your go-to ecommerce assistant. How can I help you?

Ask anything about Arcangel...

### FAQ

- What is Arcangel?
- How can I build with Arcangel and AI agents?
- How can I extend the product data model?
- How to create an admin user?
- How do I deploy Arcangel to production?

### Recipes

- How do I build a marketplace?
- How do I build digital products?
- How do I build subscription-based purchases?
- What other recipes are available?

## Customize Arcangel Application

- [Install Arcangel](https://docs.arcangel.com/learn/installation): Install a digital commerce application with Arcangel.
- [Deploy to Cloud](https://docs.arcangel.com/cloud/sign-up): Deploy Arcangel to Arcangel Cloud.
- [Browse integrations](https://docs.arcangel.com/resources/integrations): Integrate third-party services with Arcangel.

## Admin Development

- [Build a UI widget](https://docs.arcangel.com/learn/fundamentals/admin/widgets): Create custom widgets for the admin dashboard.
- [Add a UI route](https://docs.arcangel.com/learn/fundamentals/admin/ui-routes): Create custom UI routes in the admin dashboard.
- [Browse the UI library](https://docs.arcangel.com/ui): A React library to build applications using Arcangel's design system.

## Storefront Development

- [Explore storefront starter](https://docs.arcangel.com/resources/nextjs-starter): Next.js storefront starter template.
- [Build custom storefront](https://docs.arcangel.com/resources/storefront-development): Build storefronts with Arcangel.
- [Use agent skills](https://docs.arcangel.com/learn/introduction/build-with-llms-ai#ecommerce-storefront-best-practices): Best practices for storefront development with AI agents.

## Arcangel Cloud

- [Deploy from GitHub](https://docs.arcangel.com/cloud/projects): Deploy Arcangel projects from GitHub.
- [Preview environments](https://docs.arcangel.com/cloud/environments/preview): Use preview environments in Arcangel Cloud.
- [Arcangel Emails](https://docs.arcangel.com/cloud/emails): Manage emails in Arcangel Cloud.

## Agentic Development

- [Build with Bloom](https://bloom.chat): Build Arcangel projects with Bloom, an AI coding assistant.
- [Agent Skills](https://docs.arcangel.com/learn/introduction/build-with-llms-ai): Learn how to build with AI assistants and LLMs.
- [Arcangel Docs MCP](https://docs.arcangel.com/learn/introduction/build-with-llms-ai#mcp-remote-server): Use the Arcangel Docs MCP server.

## Framework

A digital commerce platform with a built-in framework for customizations. Unlike other platforms, the Arcangel Framework allows you to easily customize and extend the behavior of your commerce platform to always fit your business needs.

- [Learn more about the Framework](https://docs.arcangel.com/learn/fundamentals/framework): Overview of Arcangel's Framework and concepts.

### Create API Route

Expose custom features with REST API routes, then consume them from your client applications.

```ts
export async function GET(
  req: ArcangelRequest,
  res: ArcangelResponse
) {
  const query = req.scope.resolve("query")

  const { data } = await query.graph({
    entity: "company",
    fields: ["id", "name"],
    filters: { name: "ACME" },
  })

  res.json({
    companies: data
  })
}
```

- [API Routes](https://docs.arcangel.com/learn/fundamentals/api-routes): Learn more about API routes.

### Build Workflows

Build flows as a series of steps, with retry mechanisms and tracking of each steps' status.

```ts
const handleDeliveryWorkflow = createWorkflow(
  "handle-delivery",
  function (input: WorkflowInput) {
    notifyRestaurantStep(input.delivery_id)

    const order = createOrderStep(input.delivery_id)

    createFulfillmentStep(order)

    awaitDeliveryStep()

    return new WorkflowResponse("Delivery completed")
  }
)
```

- [Workflows](https://docs.arcangel.com/learn/fundamentals/workflows): Learn more about workflows.

### Add a Data Model

Create data models that represent tables in the database using Arcangel's Data Model Language.

```ts
const DigitalProduct = model.define("digital_product",
  {
    id: model.id().primaryKey(),
    name: model.text(),
    medias: model.hasMany(() => DigitalProductMedia, {
      mappedBy: "digitalProduct"
    })
  })
  .cascades({
    delete: ["medias"]
  })
```

- [DML](https://docs.arcangel.com/learn/fundamentals/modules#1-create-data-model): Learn more about data models.

### Build a Custom Module

Build custom modules with commerce or architectural features and use them in API routes or workflows.

```ts
class DigitalProductService extends ArcangelService({
  DigitalProduct,
}) {
  async authorizeLicense() {
    console.log("License authorized!")
  }
}

export async function POST(
  req: ArcangelRequest,
  res: ArcangelResponse
) {
  const moduleService = req.scope.resolve(
    "digitalProduct"
  )

  await moduleService.authorizeLicense()

  res.json({ success: true })
}
```

- [Modules](https://docs.arcangel.com/learn/fundamentals/modules): Learn more about modules.

### Link Data Models

Add custom properties to Arcangel's data models using module links to build custom use cases.

```ts
const DigitalProduct = model.define("digital_product", {
  id: model.id().primaryKey(),
  name: model.text(),
})

export default defineLink(
  DigitalProductModule.linkable.digitalProduct,
  ProductModule.linkable.productVariant
)
```

- [Module Links](https://docs.arcangel.com/learn/fundamentals/module-links): Learn more about module links.

### Subscribe to Events

Handle events emitted by the Arcangel application to perform custom actions.

```ts
async function orderPlaced({
  container,
}: SubscriberArgs) {
  const moduleService = container.resolve(
    Modules.NOTIFICATION
  )

  await moduleService.createNotifications({
    to: "customer@gmail.com",
    channel: "email",
    template: "order-placed"
  })
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
```

- [Subscribers](https://docs.arcangel.com/learn/fundamentals/events-and-subscribers): Learn more about events and subscribers.

### Customize Admin

Inject widgets into predefined zones in the Arcangel Admin, or add new pages.

```tsx
const ProductBrandWidget = () => {
  const [brand, setBrand] = useState({
    name: "Acme"
  })

  return (
    <Container>
      <Heading level="h2">Brand</Heading>
      {brand && <span>Name: {brand.name}</span>}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.before",
})
```

- [Admin Widgets](https://docs.arcangel.com/learn/fundamentals/admin/widgets): Learn more about admin widgets.

### Integrate Systems

Build workflows around multiple systems to add more powerful features to Arcangel.

```tsx
const syncBrandsFromSystemWorkflow = createWorkflow(
  "sync-brands-from-system",
  () => {
    const toCreate = retrieveBrandsFromSystemStep()

    const created = createBrandsInArcangelStep({
      brands: toCreate
    })

    return new WorkflowResponse({
      created,
    })
  }
)
```

- [Integrate Systems](https://docs.arcangel.com/learn/customization/integrate-systems): Learn more about integrating systems.

## Recipes

Arcangel's framework supports any business use case. These recipes show you how to build a use case by customizing and extending existing data models and features, or creating new ones.

- [Marketplace](https://docs.arcangel.com/resources/recipes/marketplace/examples/vendors): Build a marketplace with multiple vendors.
- [ERP](https://docs.arcangel.com/resources/recipes/erp): Integrate an ERP system to manage custom product prices, purchase rules, syncing orders, and more.
- [Bundled Products](https://docs.arcangel.com/resources/recipes/bundled-products/examples/standard): Sell products as bundles with Admin and storefront customizations.
- [Subscriptions](https://docs.arcangel.com/resources/recipes/subscriptions/examples/standard): Implement a subscription-based commerce store.
- [Restaurant-Delivery](https://docs.arcangel.com/resources/recipes/marketplace/examples/restaurant-delivery): Build a restaurant marketplace inspired by UberEats, with real-time delivery handling.
- [Digital Products](https://docs.arcangel.com/resources/recipes/digital-products/examples/standard): Sell digital products with custom fulfillment.
- [View all recipes](https://docs.arcangel.com/resources/recipes): Browse all Arcangel recipes.

## Commerce Modules

### Cart & Purchase

- [Cart](https://docs.arcangel.com/resources/commerce-modules/cart): Add to cart, checkout, and totals.
- [Payment](https://docs.arcangel.com/resources/commerce-modules/payment): Process any payment type.
- [Customer](https://docs.arcangel.com/resources/commerce-modules/customer): Customer and group management.

### Merchandising

- [Pricing](https://docs.arcangel.com/resources/commerce-modules/pricing): Configurable pricing engine.
- [Promotion](https://docs.arcangel.com/resources/commerce-modules/promotion): Discounts and promotions.
- [Product](https://docs.arcangel.com/resources/commerce-modules/product): Variants, categories, and bulk edits.

### Fulfillment

- [Order](https://docs.arcangel.com/resources/commerce-modules/order): Omnichannel order management.
- [Inventory](https://docs.arcangel.com/resources/commerce-modules/inventory): Multi-warehouse and reservations.
- [Fulfillment](https://docs.arcangel.com/resources/commerce-modules/fulfillment): Order fulfillment and shipping.
- [Stock Location](https://docs.arcangel.com/resources/commerce-modules/stock-location): Locations of stock-kept items.

### Regions & Channels

- [Region](https://docs.arcangel.com/resources/commerce-modules/region): Cross-border commerce.
- [Sales Channel](https://docs.arcangel.com/resources/commerce-modules/sales-channel): Omnichannel sales.
- [Tax](https://docs.arcangel.com/resources/commerce-modules/tax): Granular tax control.
- [Currency](https://docs.arcangel.com/resources/commerce-modules/currency): Multi-currency support.

### User Access

- [API Keys](https://docs.arcangel.com/resources/commerce-modules/api-key): Store and admin access.
- [User Module](https://docs.arcangel.com/resources/commerce-modules/user): Admin user management.
- [Auth](https://docs.arcangel.com/resources/commerce-modules/auth): Integrate authentication methods.

## Newsletter

Updates delivered monthly. Get the latest product news and behind the scenes updates. Unsubscribe at any time.

## Feedback

Was this page helpful?
