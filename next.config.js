const {
  withModuleFederation,
  MergeRuntime,
} = require("@module-federation/nextjs-mf");
const path = require("path");

module.exports = {
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      name: "nextApp2",
      library: { type: config.output.libraryTarget, name: "nextApp2" },
      filename: "static/runtime/remoteEntry.js",
      remotes: {
        app1: isServer
          ? path.resolve(
              __dirname,
              "../app1/.next/server/static/runtime/remoteEntry.js"
            )
          : "app1", // for client, treat it as a global
      },
      exposes: {},
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!isServer) {
      config.output.publicPath = process.env.PUBLIC_PATH;
    }

    return config;
  },
};