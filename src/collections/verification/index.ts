import * as queries from "./query";
import * as schema from "./schema";
import { table } from "./table";

export default { queries, schema, table } as const;

export { default as verification } from "./";
export * as Verification from "./types";
export type Verification = Verification.Insert;
