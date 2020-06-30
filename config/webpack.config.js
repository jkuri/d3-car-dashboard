const { resolve } = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: resolve(__dirname, '../src'),
  entry: {
    app: ['./index.tsx']
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }]
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }, 'sass-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader?name=fonts/[name].[ext]']
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebPackPlugin({ template: './index.html' }),
    new CopyPlugin({
      patterns: [{ from: './assets/images', to: './images' }]
    })
  ],
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  stats: {
    assets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    timings: true,
    children: false,
    cachedAssets: false,
    chunkOrigins: false,
    modules: false,
    warnings: false
  }
};
