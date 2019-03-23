const webpack = require('webpack')
const withTypescript = require('@zeit/next-typescript')
const Dotenv = require('dotenv-webpack')

module.exports = withTypescript({
  webpack(config, options) {
    config.plugins.push(new Dotenv())
    config.plugins.push(new webpack.NormalModuleReplacementPlugin(/^mqtt$/, "mqtt/dist/mqtt.js"))


    // need this line to avoid compilation error of ethers.js
    config.externals = [{ xmlhttprequest: 'XMLHttpRequest' }]
  
    return config
  }
})