const webpack = require('webpack')
const withTypescript = require('@zeit/next-typescript')
const Dotenv = require('dotenv-webpack')

module.exports = withTypescript({
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/deposit': { page: '/deposit' },
      '/transfer': { page: '/transfer' }
    }
  },
  webpack(config, options) {
    config.plugins.push(new Dotenv(process.env.NODE_ENV === 'testnet' ? './.env.testnet' : '.env'))
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/^mqtt$/, "mqtt/dist/mqtt.js"))

    // need this line to avoid compilation error of ethers.js
    config.externals = [{ xmlhttprequest: 'XMLHttpRequest' }]

    return config
  }
})