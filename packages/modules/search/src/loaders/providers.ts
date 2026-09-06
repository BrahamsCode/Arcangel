import { asFunction, asValue, Lifetime } from "@arcangel/framework/awilix"
import { moduleProviderLoader } from "@arcangel/framework/modules-sdk"
import { LoaderOptions } from "@arcangel/framework/types"
import { SearchProviderService } from "@services"
import {
  SearchModuleOptions,
  SearchProviderIdentifiersRegistrationName,
  SearchProviderRegistrationPrefix,
} from "@types"
import { ArcangelSearchService } from "../providers"

const registrationFn = async (klass, container, pluginOptions) => {
  const key = SearchProviderService.getRegistrationIdentifier(
    klass,
    pluginOptions.id
  )

  container.register({
    [SearchProviderRegistrationPrefix + key]: asFunction(
      (cradle) => new klass(cradle, pluginOptions.options ?? {}),
      {
        lifetime: klass.LIFE_TIME || Lifetime.SINGLETON,
      }
    ),
  })

  container.registerAdd(SearchProviderIdentifiersRegistrationName, asValue(key))
}

export default async ({
  container,
  options,
}: LoaderOptions<SearchModuleOptions>): Promise<void> => {
  const { api_key, endpoint, environment_handle } = options?.cloud ?? {}

  // Register Arcangel Cloud search when cloud options are present, same pattern
  // as payment's Arcangel Payments and notification's cloud email.
  if (api_key && endpoint && environment_handle) {
    await registrationFn(ArcangelSearchService, container, {
      options: {
        api_key,
        endpoint,
        environment_handle,
      },
      id: "default",
    })
  }

  await moduleProviderLoader({
    container,
    providers: options?.providers || [],
    registerServiceFn: registrationFn,
  })
}
