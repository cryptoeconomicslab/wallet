const withTypescript = require('@zeit/next-typescript')
const Dotenv = require('dotenv-webpack')

module.exports = withTypescript({
  webpack(config, options) {
    config.plugins.push(new Dotenv())

    // need this line to avoid compilation error of ethers.js
    config.externals = [{ xmlhttprequest: 'XMLHttpRequest' }]
    
    return config
  }
})