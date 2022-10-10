import { createUser } from 'Database/factories'
import { test } from '@japa/runner'

test.group('User', () => {
  test('it should a create an user', async ({ assert }) => {
    const user = await createUser.create()

    assert.exists(user.username)
  })
})
