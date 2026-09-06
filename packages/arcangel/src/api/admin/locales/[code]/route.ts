import {
  ContainerRegistrationKeys,
  defineFileConfig,
  FeatureFlag,
  ArcangelError,
} from "@arcangel/framework/utils"
import { ArcangelRequest, ArcangelResponse } from "@arcangel/framework/http"
import { HttpTypes } from "@arcangel/framework/types"
import TranslationFeatureFlag from "../../../../feature-flags/translation"

/**
 * @since 2.12.3
 * @featureFlag translation
 */
export const GET = async (
  req: ArcangelRequest<HttpTypes.AdminLocaleParams>,
  res: ArcangelResponse<HttpTypes.AdminLocaleResponse>
) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const {
    data: [locale],
  } = await query.graph(
    {
      entity: "locale",
      filters: {
        code: req.params.code,
      },
      fields: req.queryConfig.fields,
    },
    {
      cache: { enable: true },
    }
  )

  if (!locale) {
    throw new ArcangelError(
      ArcangelError.Types.NOT_FOUND,
      `Locale with code: ${req.params.code} was not found`
    )
  }

  res.status(200).json({ locale })
}

defineFileConfig({
  isDisabled: () => !FeatureFlag.isFeatureEnabled(TranslationFeatureFlag.key),
})
