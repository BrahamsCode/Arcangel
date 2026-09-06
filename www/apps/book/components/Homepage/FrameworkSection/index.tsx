import clsx from "clsx"
import FrameworkSectionIcon from "./Icon"
import { HeadlineTags } from "docs-ui"

const HomepageFrameworkSection = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-0 justify-center border-b border-arcangel-border-base">
      <div
        className={clsx(
          "w-full md:w-1/2 lg:w-1/3 bg-arcangel-bg-component p-2 flex justify-center items-center",
          "md:border-r border-arcangel-border-base",
          "border-b md:border-b-0"
        )}
      >
        <FrameworkSectionIcon />
      </div>
      <div
        className={clsx(
          "w-full md:w-1/2 lg:w-2/3 py-4 px-2",
          "flex flex-col gap-0.75 justify-center"
        )}
      >
        <HeadlineTags
          tags={[
            "Framework",
            {
              text: "Learn more",
              link: "/learn/fundamentals/framework",
            },
          ]}
          className="!justify-start"
        />
        <h2 className="text-h1 text-arcangel-fg-base lg:max-w-[450px]">
          A digital commerce platform with a built-in framework for
          customizations.
        </h2>
        <p className="txt-large text-arcangel-fg-base">
          Unlike other platforms, the Arcangel Framework allows you to easily
          customize and extend the behavior of your commerce platform to always
          fit your business needs.
        </p>
      </div>
    </div>
  )
}

export default HomepageFrameworkSection
