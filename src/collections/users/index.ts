import * as queries from "./query";
import * as schema from "./schema";
import { table } from "./table";

export default { queries, schema, table } as const;

export { default as users } from "./";
export type * as User from "./types";
export type User = User.Select;
