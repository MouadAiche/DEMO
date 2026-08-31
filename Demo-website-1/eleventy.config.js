import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin);

  eleventyConfig.addPassthroughCopy({
    "src/js": "js",
    "src/components": "components",
    "src/css": "css"
  });

  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
}
