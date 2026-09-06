/**
 * Native engine (default):
 * - Built-in `tsvector` / `tsquery`
 * - `pg_trgm` — typo tolerance
 * - `unaccent` — accent folding via `arcangel_search_<language>` text search config
 *
 * Lakebase engine — Arcangel Cloud only (PG16+):
 * - `lakebase_text` — BM25 via `lakebase_bm25`
 * - `lakebase_vector` — ANN via `lakebase_ann` (CASCADE installs `vector`)
 *
 * The provider migration creates `pg_trgm`, `unaccent`, the default
 * `arcangel_search_english` config, and — on engines that ship them —
 * `lakebase_vector` / `lakebase_text` via `CREATE EXTENSION ... CASCADE`.
 * Custom languages need a matching `arcangel_search_<language>` configuration.
 */

export function textSearchConfigName(language: string): string {
  return `arcangel_search_${language}`
}

/**
 * `word_similarity(query, text)` from pg_trgm. Unlike plain `similarity`, it
 * compares the query against the best-matching word sequence in the document
 * text, so long documents don't dilute the score.
 */
export function wordSimilarityCall(querySql: string, textSql: string): string {
  return `word_similarity(${querySql}, ${textSql})`
}
