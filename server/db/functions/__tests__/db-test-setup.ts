import {beforeAll, beforeEach, afterAll} from "vitest";
import connection from '../../connection.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
 await connection.seed.run()
})

afterAll(async() => {
  await connection.destroy()
})