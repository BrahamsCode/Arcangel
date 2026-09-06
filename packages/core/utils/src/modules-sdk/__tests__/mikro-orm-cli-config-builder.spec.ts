import { CustomDBMigrator } from "../../dal/mikro-orm/custom-db-migrator"
import { defineMikroOrmCliConfig } from "../mikro-orm-cli-config-builder"

const moduleName = "myTestService"

describe("defineMikroOrmCliConfig", () => {
  test(`should throw an error if entities is not provided`, () => {
    const options = {}

    expect(() => defineMikroOrmCliConfig(moduleName, options as any)).toThrow(
      "defineMikroOrmCliConfig failed with: entities is required"
    )
  })

  test("should return the correct config", () => {
    const config = defineMikroOrmCliConfig(moduleName, {
      entities: [{} as any],
      dbName: "arcangel-fulfillment",
    })

    expect(config).toEqual({
      entities: [{}],
      driver: expect.any(Function),
      host: "127.0.0.1",
      user: "postgres",
      password: "",
      dbName: "arcangel-fulfillment",
      migrations: {
        generator: expect.any(Function),
        snapshotName: ".snapshot-arcangel-my-test",
      },
      extensions: [CustomDBMigrator],
    })
  })

  test("should return the correct config inferring the databaseName", () => {
    const config = defineMikroOrmCliConfig(moduleName, {
      entities: [{} as any],
    })

    expect(config).toEqual({
      entities: [{}],
      driver: expect.any(Function),
      dbName: "arcangel-my-test",
      host: "127.0.0.1",
      user: "postgres",
      password: "",
      migrations: {
        generator: expect.any(Function),
        snapshotName: ".snapshot-arcangel-my-test",
      },
      extensions: [CustomDBMigrator],
    })
  })
})
