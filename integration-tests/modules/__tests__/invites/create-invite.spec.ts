import { arcangelIntegrationTestRunner } from "@arcangel/test-utils"
import { createAdminUser } from "../../../helpers/create-admin-user"

jest.setTimeout(50000)

const env = {}
const adminHeaders = {
  headers: { "x-arcangel-access-token": "test_token" },
}

arcangelIntegrationTestRunner({
  env,
  testSuite: ({ dbConnection, getContainer, api, dbUtils }) => {
    describe("POST /admin/invites", () => {
      beforeAll(async () => {
        await createAdminUser(dbConnection, adminHeaders, getContainer())

        await dbUtils.snapshot()
      })

      it("create an invite", async () => {
        const body = {
          email: "test_member@test.com",
        }

        const response = await api.post(`/admin/invites`, body, adminHeaders)

        expect(response.status).toEqual(200)
        expect(response.data).toEqual({
          invite: expect.objectContaining(body),
        })
      })
    })
  },
})
