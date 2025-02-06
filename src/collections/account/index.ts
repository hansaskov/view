import * as queries from "./query";
import * as schema from "./schema";
import { table } from "./table";

export default { queries, schema, table } as const;

export { default as account } from "./";
export type * as Account from "./types";
export type Account = Account.Select;
