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
        starlightBlog(
        ),
      	starlightSiteGraph(
          {
            "graphConfig": {
              "actions": [],
              "tagStyles": {},
              "tagRenderMode": "node",
              "enableDrag": false,
              "enableZoom": false,
              "enablePan": false,
              "enableHover": true,
              "enableClick": "disable",
              "depth": 1,
              "depthDirection": "both",
              "followLink": "same",
              "scale": 1.1,
              "minZoom": 0.05,
              "maxZoom": 4,
              "renderLabels": true,
              "renderArrows": true,
              "renderUnresolved": false,
              "renderExternal": true,
              "scaleLinks": true,
              "scaleArrows": true,
              "minZoomArrows": 0.8,
              "labelOpacityScale": 1.3,
              "labelMutedOpacity": 0,
              "labelHoverOpacity": 1,
              "labelAdjacentOpacity": 1,
              "labelFontSize": 12,
              "labelHoverScale": 1,
              "labelOffset": 10,
              "labelHoverOffset": 14,
              "zoomDuration": 75,
              "zoomEase": "out_quad",
              "hoverDuration": 200,
              "hoverEase": "out_quad",
              "nodeDefaultStyle": {
                "shape": "circle",
                "shapeColor": "nodeColor",
                "shapeSize": 10,
                "strokeWidth": 0,
                "colliderScale": 1,
                "nodeScale": 1,
                "neighborScale": 0.5
              },
              "nodeVisitedStyle": {
                "shapeColor": "nodeColorVisited"
              },
              "nodeCurrentStyle": {
                "shapeColor": "nodeColorCurrent"
              },
              "nodeUnresolvedStyle": {
                "shapeColor": "nodeColorUnresolved"
              },
              "nodeExternalStyle": {
                "shape": "square",
                "shapeColor": "nodeColorExternal",
                "strokeColor": "inherit",
                "nodeScale": 0.6
              },
              "tagDefaultStyle": {
                "shape": "circle",
                "shapeSize": 6,
                "shapeColor": "backgroundColor",
                "strokeColor": "nodeColorTag",
                "strokeWidth": 1,
                "colliderScale": 1,
                "nodeScale": 1,
                "neighborScale": 0.7
              },
              "linkWidth": 1,
              "linkHoverWidth": 1,
              "arrowSize": 5,
              "arrowAngle": 0.5235987755982988,
              "centerForce": 0.05,
              "colliderPadding": 20,
              "repelForce": 200,
              "linkDistance": 0,
              "alphaDecay": 0.0228,
              "visibilityRules": ["**/*"],
              "prefetchPages": false
            },
            "sitemapConfig": {},
            "backlinksConfig": {}
          }
	),
      ],
    }),
  ],
});
