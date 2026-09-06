import { join } from "path"
import { FileSystem } from "../file-system"
import { loadEnv } from "../load-env"

const filesystem = new FileSystem(join(__dirname, "tmp"))

describe("loadEnv", function () {
  afterEach(async () => {
    await filesystem.cleanup()
    delete process.env.ARCANGEL_VERSION
    delete process.env.ARCANGEL_DEV_VERSION
    delete process.env.ARCANGEL_TEST_VERSION
    delete process.env.ARCANGEL_STAGING_VERSION
    delete process.env.ARCANGEL_PRODUCTION_VERSION
  })

  it("should load .env file when in unknown environment", async function () {
    await filesystem.create(".env", "ARCANGEL_VERSION=1.0")
    loadEnv("", filesystem.basePath)

    expect(process.env.ARCANGEL_VERSION).toEqual("1.0")
  })

  it("should load .env file for known environments", async function () {
    await filesystem.create(".env", "ARCANGEL_DEV_VERSION=1.0")
    await filesystem.create(".env.test", "ARCANGEL_TEST_VERSION=1.0")
    await filesystem.create(".env.staging", "ARCANGEL_STAGING_VERSION=1.0")
    await filesystem.create(".env.production", "ARCANGEL_PRODUCTION_VERSION=1.0")

    loadEnv("development", filesystem.basePath)
    loadEnv("test", filesystem.basePath)
    loadEnv("staging", filesystem.basePath)
    loadEnv("production", filesystem.basePath)

    expect(process.env.ARCANGEL_DEV_VERSION).toEqual("1.0")
    expect(process.env.ARCANGEL_TEST_VERSION).toEqual("1.0")
    expect(process.env.ARCANGEL_STAGING_VERSION).toEqual("1.0")
    expect(process.env.ARCANGEL_PRODUCTION_VERSION).toEqual("1.0")
  })
})
