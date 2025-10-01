const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   devServer: {
    port: 6190,
    host: "0.0.0.0", 
    open: true 
  },
  plugins: [vue()],
  server: {
    overlay: false,
  }
})
