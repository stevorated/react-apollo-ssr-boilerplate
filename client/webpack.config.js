const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const mode = 'development'
const clientConfig = {
  mode,
  entry: './src/browser/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'build/public'),
    publicPath: '/build/public' 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['last 2 versions']}}], 
              '@babel/preset-react'
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              // Stage 0
              "@babel/plugin-proposal-function-bind",
          
              // Stage 1
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-logical-assignment-operators",
              ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
              ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
              ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
              "@babel/plugin-proposal-do-expressions",
          
              // Stage 2
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-proposal-function-sent",
              "@babel/plugin-proposal-export-namespace-from",
              "@babel/plugin-proposal-numeric-separator",
              "@babel/plugin-proposal-throw-expressions",
          
              // Stage 3
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-syntax-import-meta",
              ["@babel/plugin-proposal-class-properties", { "loose": false }],
              "@babel/plugin-proposal-json-strings"
            ]
          }
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: true
    })
  ],
  resolve: {
    alias: {
      // adjust this path as needed depending on where your webpack config is
      'styled-components': path.resolve('./node_modules/styled-components')
    }
  }
}

const serverConfig = {
  mode,
  target: 'node',
  entry: './src/server/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '/',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: ['last 2 versions']}}], 
              '@babel/preset-react'
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              // Stage 0
              "@babel/plugin-proposal-function-bind",
          
              // Stage 1
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-logical-assignment-operators",
              ["@babel/plugin-proposal-optional-chaining", { "loose": false }],
              ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }],
              ["@babel/plugin-proposal-nullish-coalescing-operator", { "loose": false }],
              "@babel/plugin-proposal-do-expressions",
          
              // Stage 2
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              "@babel/plugin-proposal-function-sent",
              "@babel/plugin-proposal-export-namespace-from",
              "@babel/plugin-proposal-numeric-separator",
              "@babel/plugin-proposal-throw-expressions",
          
              // Stage 3
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-syntax-import-meta",
              ["@babel/plugin-proposal-class-properties", { "loose": false }],
              "@babel/plugin-proposal-json-strings"
            ]
          }
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'public/styles/[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      __isBrowser__: false
    })
    
  ],
  resolve: {
    alias: {
      // adjust this path as needed depending on where your webpack config is
      'styled-components': path.resolve('./node_modules/styled-components')
    }
  }
}

module.exports = [ clientConfig, serverConfig ]