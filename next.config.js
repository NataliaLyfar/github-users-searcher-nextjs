module.exports = {
  webpack: (
    config,
    { webpack, buildId, dev, isServer, defaultLoaders, nextRuntime }
  ) => {
    config.module.rules.push({
      test: /\.mdx/,
    });
    return config;
  },
};
