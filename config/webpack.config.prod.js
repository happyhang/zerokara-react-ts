const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const tsNameof = require("ts-nameof");
const TsForkChecker = require('fork-ts-checker-webpack-plugin');
const EsLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';

// Define the project root path.
const projectPath = path.resolve('./');

// Define the application source folder. All application code should only be here.
const appSrc = path.resolve('./src');

// Define the public asset folder.
const publicResourceSrc = path.resolve('./public');
const publicHtml = path.join(appSrc, 'index.html');

// Get the environment variables
const getEnvVariables = env => require(`./env.${(env && env.APP_ENV) || 'staging'}`);

// Storing CSS preprocessors for reuse.
const cssPreprocessors = [{
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: [
        require('postcss-import'),
        require('autoprefixer'),
        require('postcss-preset-env'),
        require('cssnano')({ preset: 'default' }),
      ],
    }
  }
},
  'sass-loader?sourceMap',
{
  loader: 'sass-resources-loader',
  options: {
    sourceMap: true,
    // Add all SASS variables/mixins to inject to every file here.
    resources: [
      path.join(appSrc, 'styles/globalMixin.scss'),
    ],
  },
}];

module.exports = env => ({
  mode: 'production',

  // Don't attempt to continue if there are any errors.
  bail: true,

  // You can add some polyfills before index.tsx.
  entry: ['./config/polyfill.js', './src/index.tsx'],

  devtool: 'source-map',
  resolve: {
    extensions: [
      '.mjs',
      '.web.js',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    alias: {
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
      // To prevent other library using jquery to include the full library (huge!)
      'jquery': 'jquery/dist/jquery.slim.js',
      
      'context': path.join(appSrc, 'context'),
      'common': path.join(appSrc, 'common'),
      'assets': path.join(appSrc, 'assets'),
    },
  },
  output: {
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: '[name].[contenthash].js',

    // This is the URL that app is served from. We use "/" in development.
    publicPath,

    // Build the project to the dist folder.
    path: path.join(projectPath, 'dist'),
  },
  module: {
    rules: [
      {
        // Compiles TS to JS.
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              // ForkTsCheckerWebpackPlugin will do the actual checking and linting in another process.
              transpileOnly: true,
              getCustomTransformers: () => ({ before: [tsNameof] }),
            },
          },
        ],
        include: appSrc,
      },
      {
        // Compiles SCSS modules.
        test: /\.module\.scss$/,
        include: appSrc,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-modules-typescript-loader'),
            options: {
              // Allow CI build to run in verify mode to ensure the typings match the scss
              mode: process.env.CI ? 'verify' : 'emit',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 3,
              // CSS Module requires the below 2 configs.
              modules: {
                localIdentName: '[local]-[contenthash:base64:10]',
              },
            }
          },
          ...cssPreprocessors,
        ],
      },
      {
        // Compiles css and scss.
        test: /\.s?css$/, // SCSS is superset of CSS, so it can be compiled fine (should be).
        include: appSrc,
        exclude: /\.module\.[a-z]+$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 3,
            }
          },
          ...cssPreprocessors,
        ],
      },
      {
        // Grab images.
        test: /\.(jpe?g|png|gif|svg|bmp)$/i,
        include: appSrc,
        type: 'asset',
      }
    ],
  },
  plugins: [
    // Define additional environment variables to be used in app.
    new webpack.EnvironmentPlugin(getEnvVariables(env)),
    // Delete previous built files before building a new one.
    new CleanWebpackPlugin(),
    // Copy public assets.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicResourceSrc,
        },
      ],
    }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: publicHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
      },
    }),
    new EsLintPlugin({
      eslintPath: require.resolve('eslint'),
      overrideConfigFile: "./config/.eslintrc.json",
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
    new TsForkChecker(),
    // Extract css to separate files.
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    // Code splitting.
    splitChunks: {
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      // Minify JS
      new TerserPlugin({
        parallel: true,
      })
    ],
  },
  performance: {
    hints: "warning",
  },
});
