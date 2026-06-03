import { defineConfig } from 'astro/config';

const BASE = '/bandaturriaco';

/** Aggiunge il prefisso base agli src delle immagini nei markdown */
function rehypeFixMarkdownImages() {
  return function (tree) {
    const walk = (node) => {
      if (node.type === 'element' && node.tagName === 'img') {
        const src = node.properties?.src;
        if (typeof src === 'string' && src.startsWith('/asset/')) {
          node.properties.src = BASE + src;
        }
      }
      if (node.children) node.children.forEach(walk);
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://dani-50.github.io',
  base: BASE,
  trailingSlash: 'never',
  markdown: {
    rehypePlugins: [rehypeFixMarkdownImages],
  },
});
