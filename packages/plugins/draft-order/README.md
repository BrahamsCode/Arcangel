<p align="center">
  <a href="https://www.arcangel.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Arcangel logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Draft Order Plugin
</h1>

<h4 align="center">
  <a href="https://docs.arcangel.com">Documentation</a> |
  <a href="https://www.arcangel.com">Website</a>
</h4>

<p align="center">
  Create and manage draft orders on behalf of customers in Arcangel
</p>
<p align="center">
  <a href="https://github.com/arcangel/arcangel/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    <a href="https://www.producthunt.com/posts/arcangel"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=arcangel">
    <img src="https://img.shields.io/twitter/follow/arcangel.svg?label=Follow%20@arcangel" alt="Follow @arcangel" />
  </a>
</p>

## Overview

The Draft Order Plugin enables admin users to create and manage orders on behalf of customers. This is particularly useful for customer support scenarios or when customers place orders offline.

## Features

- **Create draft orders** from the Arcangel Admin dashboard
- **Manage items** in draft orders (add, update, remove)
- **Add shipping methods** to draft orders
- **Associate customers** with draft orders
- **Convert draft orders** to regular orders for purchase completion


## Installation

1. Install the Draft Order plugin
```
yarn add @arcangel/draft-order
```
2. Configure the plugin in your arcangel-config.ts
```
module.exports = defineConfig({
  projectConfig: {
    ...
  },
  plugins: [
    {
      resolve: "@arcangel/draft-order",
      options: {},
    },
  ],
})
```
3. Start your server
   
## Requirements
- Arcangel application version >= 2.4.0

## Support

## Community & Contributions

The community and core team are available in [GitHub Discussions](https://github.com/arcangel/arcangel/discussions), where you can ask for support, discuss roadmap, and share ideas.

Join our [Discord server](https://discord.com/invite/arcangel) to meet other community members.

## Other channels

- [GitHub Issues](https://github.com/arcangel/arcangel/issues)
- [Twitter](https://twitter.com/arcangel)
- [LinkedIn](https://www.linkedin.com/company/arcangel)
- [Arcangel Blog](https://arcangel.com/blog/)
