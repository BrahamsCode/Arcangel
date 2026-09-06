import {
  Context,
  DAL,
  FindConfig,
  InferEntityType,
  ProductTypes,
} from "@arcangel/framework/types"
import {
  createArcangelMikroOrmEventSubscriber,
  FreeTextSearchFilterKeyPrefix,
  InjectManager,
  InjectTransactionManager,
  isDefined,
  ArcangelContext,
  ArcangelError,
  ArcangelInternalService,
  ArcangelService,
  ModulesSdkUtils,
  registerInternalServiceEventSubscriber,
} from "@arcangel/framework/utils"
import { EntityManager, EventType } from "@mikro-orm/core"
import { ProductCategory } from "@models"
import { ProductCategoryRepository } from "@repositories"
import { UpdateCategoryInput } from "@types"

type InjectedDependencies = {
  productCategoryRepository: DAL.TreeRepositoryService
  productModuleService: ReturnType<typeof ArcangelService>
}

export default class ProductCategoryService extends ArcangelInternalService<
  InjectedDependencies,
  typeof ProductCategory
>(ProductCategory) {
  protected readonly productCategoryRepository_: DAL.TreeRepositoryService
  protected readonly container: InjectedDependencies

  constructor(container: InjectedDependencies) {
    // @ts-expect-error
    super(...arguments)
    this.container = container
    this.productCategoryRepository_ = container.productCategoryRepository
  }

  // TODO: Add support for object filter
  @InjectManager("productCategoryRepository_")
  // @ts-expect-error
  async retrieve(
    productCategoryId: string,
    config: FindConfig<ProductTypes.ProductCategoryDTO> = {},
    @ArcangelContext() sharedContext: Context = {}
  ): Promise<InferEntityType<typeof ProductCategory>> {
    if (!isDefined(productCategoryId)) {
      throw new ArcangelError(
        ArcangelError.Types.NOT_FOUND,
        `"productCategoryId" must be defined`
      )
    }

    const queryOptions = ModulesSdkUtils.buildQuery(
      {
        id: productCategoryId,
      },
      config
    )

    // TODO: Currently remoteQuery doesn't allow passing custom objects, so the `include*` are part of the filters
    // Modify remoteQuery to allow passing custom objects
    const transformOptions = {
      includeDescendantsTree: true,
    }

    const productCategories = await this.productCategoryRepository_.find(
      queryOptions,
      transformOptions,
      sharedContext
    )

    if (!productCategories?.length) {
      throw new ArcangelError(
        ArcangelError.Types.NOT_FOUND,
        `ProductCategory with id: ${productCategoryId} was not found`
      )
    }

    return productCategories[0]
  }

  @InjectManager("productCategoryRepository_")
  async list(
    filters: ProductTypes.FilterableProductCategoryProps = {},
    config: FindConfig<ProductTypes.ProductCategoryDTO> = {},
    @ArcangelContext() sharedContext: Context = {}
  ): Promise<InferEntityType<typeof ProductCategory>[]> {
    const transformOptions = {
      includeDescendantsTree: filters?.include_descendants_tree || false,
      includeAncestorsTree: filters?.include_ancestors_tree || false,
    }
    delete filters.include_descendants_tree
    delete filters.include_ancestors_tree

    // Apply free text search filter
    if (isDefined(filters?.q)) {
      config.filters ??= {}
      config.filters[FreeTextSearchFilterKeyPrefix + ProductCategory.name] = {
        value: filters.q,
        fromEntity: ProductCategory.name,
      }

      delete filters.q
    }

    const queryOptions = ModulesSdkUtils.buildQuery(filters, config)
    queryOptions.where ??= {}

    return await this.productCategoryRepository_.find(
      queryOptions,
      transformOptions,
      sharedContext
    )
  }

  @InjectManager("productCategoryRepository_")
  async listAndCount(
    filters: ProductTypes.FilterableProductCategoryProps = {},
    config: FindConfig<ProductTypes.ProductCategoryDTO> = {},
    @ArcangelContext() sharedContext: Context = {}
  ): Promise<[InferEntityType<typeof ProductCategory>[], number]> {
    const transformOptions = {
      includeDescendantsTree: filters?.include_descendants_tree || false,
      includeAncestorsTree: filters?.include_ancestors_tree || false,
    }
    delete filters.include_descendants_tree
    delete filters.include_ancestors_tree

    // Apply free text search filter
    if (isDefined(filters?.q)) {
      config.filters ??= {}
      config.filters[FreeTextSearchFilterKeyPrefix + ProductCategory.name] = {
        value: filters.q,
        fromEntity: ProductCategory.name,
      }

      delete filters.q
    }

    const queryOptions = ModulesSdkUtils.buildQuery(filters, config)
    queryOptions.where ??= {}

    return await this.productCategoryRepository_.findAndCount(
      queryOptions,
      transformOptions,
      sharedContext
    )
  }

  @InjectTransactionManager("productCategoryRepository_")
  async create(
    data: ProductTypes.CreateProductCategoryDTO[],
    @ArcangelContext() sharedContext: Context = {}
  ): Promise<InferEntityType<typeof ProductCategory>[]> {
    return await (
      this.productCategoryRepository_ as unknown as ProductCategoryRepository
    ).create(data, sharedContext)
  }

  @InjectTransactionManager("productCategoryRepository_")
  // @ts-expect-error
  async update(
    data: UpdateCategoryInput[],
    @ArcangelContext() sharedContext: Context = {}
  ): Promise<InferEntityType<typeof ProductCategory>[]> {
    return await (
      this.productCategoryRepository_ as unknown as ProductCategoryRepository
    ).update(data, sharedContext)
  }

  @InjectTransactionManager("productCategoryRepository_")
  // @ts-expect-error
  async delete(
    ids: string[],
    @ArcangelContext() sharedContext: Context = {}
  ): Promise<string[] | Record<string, any>[]> {
    const subscriber = createArcangelMikroOrmEventSubscriber(
      [ProductCategory.name],
      this.container["productModuleService"]
    )

    registerInternalServiceEventSubscriber(sharedContext, subscriber)

    const deletedIds = await this.productCategoryRepository_.delete(
      ids,
      sharedContext
    )

    // Delete are handled a bit differently since we are going to the DB directly, therefore
    // just like upsert with replace, we need to dispatch the events manually.
    if (deletedIds.length) {
      const manager = (sharedContext.transactionManager ??
        sharedContext.manager) as EntityManager
      const eventManager = manager.getEventManager()

      deletedIds.forEach((id) => {
        eventManager.dispatchEvent(EventType.afterDelete, {
          entity: { id },
          meta: {
            className: ProductCategory.name,
          } as Parameters<typeof eventManager.dispatchEvent>[2],
        })
      })
    }

    return deletedIds
  }

  @InjectTransactionManager("productCategoryRepository_")
  // @ts-expect-error
  async softDelete(
    ids: string[],
    @ArcangelContext() sharedContext?: Context
  ): Promise<Record<string, string[]> | void> {
    return (await (
      this.productCategoryRepository_ as unknown as ProductCategoryRepository
    ).softDelete(ids, sharedContext)) as any
  }

  @InjectTransactionManager("productCategoryRepository_")
  // @ts-expect-error
  async restore(
    ids: string[],
    @ArcangelContext() sharedContext?: Context
  ): Promise<Record<string, string[]> | void> {
    return (await (
      this.productCategoryRepository_ as unknown as ProductCategoryRepository
    ).restore(ids, sharedContext)) as any
  }
}
