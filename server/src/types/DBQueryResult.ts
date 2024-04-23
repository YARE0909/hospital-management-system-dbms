import type { QueryResult } from "mysql2";

export type SQLQueryResult<T> = T & QueryResult;