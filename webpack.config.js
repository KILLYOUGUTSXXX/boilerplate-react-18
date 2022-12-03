const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const configs = require('./public/config.json')


module.exports = {
  entry: {
    app: './src/index.js'
  },
  mode: configs.env,
  devtool: configs.env === 'production' ? 'source-map' : 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[fullhash]-[id]-bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      manifest: path.resolve(__dirname, 'public', 'manifest.json')
    }),
    new webpack.optimize.SplitChunksPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  devServer: {
    host: configs.host,
    port: configs.port,
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(le|c)ss$/, // styles files
        exclude: '/antd',
        use: [
          'style-loader',
          'css-loader',
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } }
        ]
      },
      {
        test: /\.(jpe?g|gif|png|ico|svg|wof|ttf)$/,
        use: ['file-loader?name=[name].[ext]']
      }
    ]
  },
  optimization: {
    minimize: true,
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    sideEffects: false,
    splitChunks: {
      chunks: 'all'
    }
  }
}