export type JsonLd = Record<string, unknown>;

/**
 * Serializes a schema.org object into a full JSON-LD <script> tag string,
 * ready to be injected via {@html} inside <svelte:head>.
 *
 * The `<` characters are escaped to `<` so no value (e.g. a string
 * containing "</script>") can break out of the script element.
 */
export function jsonLdScript(schema: JsonLd): string {
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}
