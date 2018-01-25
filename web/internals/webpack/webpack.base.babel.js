/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require("path");
const webpack = require("webpack");

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), "build"),
    publicPath: "/",
  }, options.output), // Merge with env dependent settings
  module: {
    noParse: /moment\.js/,
    rules: [
      {
        test: /react-icons\/(.)*(.js)$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"],
        },
      },
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          plugins: [
            ["import", {
              libraryName: "antd",
              style: "css",
            }],
          ],
        },
      },
      {
        test: /\.jsx?$/, // Transform all .js/.jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: options.babelQuery,
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ["style-loader", "css-loader"],
          // {
          //   loader: "css-loader",
          //   options: {
          //     modules: true,
          //   },
          // }],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: "file-loader",
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
            },
          },
          {
            loader: "image-webpack-loader",
            query: {
              mozjpeg: {
                progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: "65-90",
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.json$/,
        use: "json-loader",
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: "exports-loader?self.fetch!whatwg-fetch",
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({/* eslint quotes: ["error", "double"]*/
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        ELASTICSEARCH_PROXY_MODE: JSON.stringify(process.env.ELASTICSEARCH_PROXY_MODE) || "http",
        ELASTICSEARCH_PROXY_HOST: JSON.stringify(process.env.ELASTICSEARCH_PROXY_HOST || "localhost"),
        ELASTICSEARCH_PROXY_PORT: JSON.stringify(process.env.ELASTICSEARCH_PROXY_PORT || "9200"),
        ELASTICSEARCH_PROXY_PREFIX: JSON.stringify(process.env.ELASTICSEARCH_PROXY_PREFIX || ""),
        FIREBASE_ENDPOINT: JSON.stringify(process.env.FIREBASE_ENDPOINT || "https://nutry-v1.firebaseio.com"),
        FIREBASE_DB_VERSION: JSON.stringify(process.env.FIREBASE_DB_VERSION || "v1"),
      },
    }),
    new webpack.NamedModulesPlugin(),
  ]),
  resolve: {
    modules: ["app", "node_modules"],
    extensions: [
      ".js",
      ".jsx",
      ".react.js",
    ],
    alias: {
      moment$: "moment/moment.js",
    },
    mainFields: [
      "browser",
      "jsnext:main",
      "main",
    ],
  },
  devtool: options.devtool,
  target: "web", // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
