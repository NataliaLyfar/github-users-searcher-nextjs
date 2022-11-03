module.exports = {
  webpack: (
    config,
    { webpack, buildId, dev, isServer, defaultLoaders, nextRuntime }
  ) => {
    config.plugins.push(new webpack.IgnorePlugin(/\/tests\//));
    return config;
  },
};
