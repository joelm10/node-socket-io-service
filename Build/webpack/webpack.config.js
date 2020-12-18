const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const pkg = require('../../package.json');

const basePath = path.resolve(__dirname, '../../');

/**
 * NOTE: Simplify and refine for prod vs dev builds
 * TODO: change mode in build to allow deploy to prod build
 */
module.exports = {
    mode: "development",
    entry: `${basePath}/src/socketIO/client/index.js`,
    context: basePath,

    output: {
      path: `${basePath}/dist/`,
      filename: "app.min.js",
      chunkFilename: "[name].js"
    },

    resolve: {
      alias: {
        components: `${basePath}/src/components/`,
        views: `${basePath}/src/views/`,
        utils: `${basePath}/src/utils/`,
        assets: `${basePath}/src/assets/`,
        tests: `${basePath}/tests/`,
        config: `${basePath}/src/config`,
        src: `${basePath}/src/`,
        root: `${basePath}/src/`
      },
      extensions: [
        ".ts",
        ".tsx",
        ".js"
      ],
    },

    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        },
        ]
    },

    performance: {
      hints: false
    },

    optimization: {
      splitChunks: false
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: `${basePath}/src/index.html`,
            filename: `./index.html`
        })
    ]
  }