const {
  withModuleFederation,
  MergeRuntime,
} = require('@module-federation/nextjs-mf');
const path = require('path');

module.exports = {
  webpack: (config, options) => {
    const { buildId, dev, isServer, defaultLoaders, webpack } = options;
    const mfConf = {
      name: 'nextApp2',
      library: { type: config.output.libraryTarget, name: 'nextApp2' },
      filename: 'static/runtime/remoteEntry.js',
      remotes: {
        app1: isServer
          ? // note that this is only for local development and is relative to where the remote
            // app is in you folder structure.
            path.resolve(
              __dirname,
              '../Next-MF-app1/.next/server/static/runtime/remoteEntry.js'
            )
          : 'app1', // for client, treat it as a global
      },
      exposes: {},
      shared: [],
    };

    // Configures ModuleFederation and other Webpack properties
    withModuleFederation(config, options, mfConf);

    config.plugins.push(new MergeRuntime());

    if (!isServer) {
      // TODO prefix with NEXT_PUBLIC for browser compatibility:
      // https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
      config.output.publicPath = process.env.NEXT_PUBLIC_PATH;
    }

    return config;
  },
};
