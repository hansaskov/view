import * as queries from "./query"
import * as schema from "./schema"
import { table } from "./table"

export default { queries, schema, table } as const

export type * as Verification from "./types"
