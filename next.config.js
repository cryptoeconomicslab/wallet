const withTypescript = require('@zeit/next-typescript')
module.exports = withTypescript({
  webpack(config, options) {
    // need this line to avoid compilation error of ethers.js
    config.externals = [{ xmlhttprequest: 'XMLHttpRequest' }]
    
    return config
  }
})