const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 6190,
    host: "0.0.0.0", 
    open: true,
    // 新增配置：关闭全屏错误提示
    client: {
      overlay: false
    }
  }
})
    