const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   devServer: {
    port: 335877,
    host: "0.0.0.0", 
    open: true 
  }
})
