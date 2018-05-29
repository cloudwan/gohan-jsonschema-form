const path = require('path');
const gitSync = require('git-rev-sync');
const process = require('process');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devServerPort = 8080;
const devServerHostname = 'localhost';
const sourcePath = path.join(__dirname, '/src');
const outputPath = path.join(__dirname, '/dist');
const ENV = process.env.NODE_ENV;

function version() {
  return {
    hash: gitSync.long(),
    tag: gitSync.tag(),
    version: process.env.npm_package_version,
  };
}

module.exports = {
  cache: true,
  context: __dirname,
  entry: {
    polyfill: 'babel-polyfill',
    index: './demo/index',
  },
  mode: ENV,
  output: {
    path: outputPath,
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /\*\.test\.ts(x?)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        include: __dirname,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        include: __dirname,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false,
                sourceMap: true,
                modules: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                minimize: false,
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: false,
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true,
                minimize: false,
                javascriptEnabled: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)([\?]?.*)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      process: {
        env: {
          ENV: JSON.stringify(ENV),
          NODE_ENV: JSON.stringify(ENV),
        },
      },
      VERSION: JSON.stringify(version()),
    }),
  ],
  performance: {
    hints: false,
  },
  devtool: 'source-map',
  devServer: {
    compress: false,
    host: devServerHostname,
    port: devServerPort,
    hot: true,
    inline: true,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
    },
  },
};
