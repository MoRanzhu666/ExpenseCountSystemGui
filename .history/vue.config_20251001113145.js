const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 6190,
    host: "0.0.0.0", 
    open: true,
    client: {
      overlay: false
    },
     // 跨域代理配置
    proxy: {
      // 匹配所有以 '/api' 开头的请求路径
      '/api': {
        target: 'http://localhost:8080', // 后端API的基础地址
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          // 将请求路径中的 '/api' 替换为空（根据实际后端接口调整）
          '^/api': ''
        }
      },
      // 可以配置多个代理
      '/ecs': {
        target: 'http://localhost:8080', // 你的后端服务地址
        changeOrigin: true,
        // 如果后端接口本身就以/ecs开头，可不做路径重写
        // pathRewrite: { '^/ecs': '' }
      }
    }
  }
})
    