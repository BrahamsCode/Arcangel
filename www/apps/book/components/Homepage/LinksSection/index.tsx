import clsx from "clsx"
import { HeadlineTags, ShadedBlock } from "docs-ui"
import Link from "next/link"
import { LinksSectionBloomIcon } from "./Icon"

const HomepageLinksSection = () => {
  const links: {
    tag: string
    links: {
      text: string
      link: string
    }[]
  }[] = [
    {
      tag: "Customize Arcangel Application",
      links: [
        {
          link: "/learn/installation",
          text: "Install Arcangel",
        },
        {
          link: "https://docs.arcangel.com/cloud/sign-up",
          text: "Deploy to Cloud",
        },
        {
          link: "https://docs.arcangel.com/resources/integrations",
          text: "Browse integrations",
        },
      ],
    },
    {
      tag: "Admin Development",
      links: [
        {
          link: "/learn/fundamentals/admin/widgets",
          text: "Build a UI widget",
        },
        {
          link: "/learn/fundamentals/admin/ui-routes",
          text: "Add a UI route",
        },
        {
          link: "https://docs.arcangel.com/ui",
          text: "Browse the UI library",
        },
      ],
    },
    {
      tag: "Storefront Development",
      links: [
        {
          link: "https://docs.arcangel.com/resources/nextjs-starter",
          text: "Explore storefront starter",
        },
        {
          link: "https://docs.arcangel.com/resources/storefront-development",
          text: "Build custom storefront",
        },
        {
          link: "https://docs.arcangel.com/learn/introduction/build-with-llms-ai#ecommerce-storefront-best-practices",
          text: "Use agent skills",
        },
      ],
    },
    {
      tag: "Arcangel Cloud",
      links: [
        {
          link: "https://docs.arcangel.com/cloud/projects",
          text: "Deploy from GitHub",
        },
        {
          link: "https://docs.arcangel.com/cloud/environments/preview",
          text: "Preview environments",
        },
        {
          link: "https://docs.arcangel.com/cloud/emails",
          text: "Arcangel Emails",
        },
      ],
    },
    {
      tag: "Agentic Development",
      links: [
        {
          link: "https://docs.arcangel.com/learn/introduction/build-with-llms-ai/cloud-cli",
          text: "Agentic Deployments",
        },
        {
          link: "https://docs.arcangel.com/learn/introduction/build-with-llms-ai",
          text: "Agent Skills",
        },
        {
          link: "https://docs.arcangel.com/learn/introduction/build-with-llms-ai#mcp-remote-server",
          text: "Arcangel Docs MCP",
        },
      ],
    },
  ]

  return (
    <div className="w-full flex gap-0 flex-col md:flex-row flex-wrap border-b border-arcangel-border-base">
      {links.map((section, index) => (
        <div
          key={index}
          className={clsx(
            "p-2 flex justify-between flex-col w-full md:w-1/3 gap-2 md:min-h-[320px]",
            "border-b border-arcangel-border-base md:border-b-0",
            index !== 2 && "md:border-r",
            index > 2 && "md:border-t"
          )}
        >
          <HeadlineTags tags={[section.tag]} className="!justify-start" />
          <div className="flex flex-col gap-0.75">
            {section.links.map((link, linkIndex) => (
              <div className="flex gap-0.75" key={linkIndex}>
                <ShadedBlock className="!w-2 min-h-2" />
                <Link
                  href={link.link}
                  className={clsx(
                    "flex-1 text-arcangel-fg-base text-h2 hover:underline hover:text-arcangel-fg-interactive"
                  )}
                >
                  {link.text}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div
        className={clsx(
          "p-2 flex justify-center items-center w-full md:w-1/3 gap-2 md:min-h-[320px]",
          "border-arcangel-border-base md:border-t bg-arcangel-bg-component"
        )}
      >
        <LinksSectionBloomIcon />
      </div>
    </div>
  )
}

export default HomepageLinksSection
