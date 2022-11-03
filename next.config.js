module.exports = {
  webpack: (
    config,
    { webpack, buildId, dev, isServer, defaultLoaders, nextRuntime }
  ) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: pluginOptions.options,
        },
      ],
    });
    return config;
  },
};
