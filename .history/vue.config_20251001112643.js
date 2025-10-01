const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
   devServer: {
    port: 6190,
    host: "0.0.0.0", 
    open: true 
  },
  plugins: [vue()],
  // 配置开发服务器
  server: {
    // 关闭错误覆盖层
    overlay: false,
    // 或者只在生产环境关闭
    // overlay: process.env.NODE_ENV === 'production' ? false : true
  }
})
