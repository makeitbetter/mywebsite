// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";
import starlightBlog from 'starlight-blog';
import starlightSiteGraph from 'starlight-site-graph'

export default defineConfig({
  site: 'https://neilsmalley.com',
  // ...
  integrations: [
    starlight({
      title: 'Neil Smalley',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/makeitbetter' },{ icon: 'linkedin', label: 'Linkedin', href: 'https://www.linkedin.com/in/neilmsmalley/' } ],
      plugins: [
        catppuccin({
          dark: { flavor: "macchiato", accent: "lavender" },
          light: { flavor: "latte", accent: "lavender" },
        }),
        starlightBlog(),
        starlightSiteGraph({

        }),
      ],
    }),
  ],
});
