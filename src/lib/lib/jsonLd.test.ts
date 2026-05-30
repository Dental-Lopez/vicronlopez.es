import { describe, it, expect } from 'vitest';
import { jsonLdScript } from './jsonLd';

describe('jsonLdScript', () => {
  it('wraps the schema in a JSON-LD script tag', () => {
    const result = jsonLdScript({ '@context': 'https://schema.org', '@type': 'WebSite' });
    expect(result).toBe(
      '<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebSite"}</script>'
    );
  });

  it('escapes "<" so values cannot break out of the script element', () => {
    const result = jsonLdScript({ name: '</script><script>alert(1)</script>' });
    expect(result).not.toContain('</script><script>');
    expect(result).toContain('\\u003c/script>');
  });
});
