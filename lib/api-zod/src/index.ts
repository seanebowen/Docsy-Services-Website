/* Re-export the generated zod schemas + the generated TS types.
 *
 * Both generators produce a `DocumentCheckBody` and `DocumentCheckResponse`
 * (one as a zod schema, one as a TS interface) so we re-export the
 * remaining type-only names explicitly to avoid a duplicate-export
 * collision. The zod `DocumentCheckBody` and `DocumentCheckResponse`
 * win because they carry both runtime + type information. */
export * from "./generated/api";
export type {
  DocumentCheckResult,
  DocumentCheckRecommendation,
  DocumentCheckSuggestedService,
  DocumentCheckDateField,
  DocumentCheckNotarialBlock,
  DocumentCheckError,
  HealthStatus,
} from "./generated/types";
