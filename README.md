## 实现功能包括: 
   - 注册/登录/退出
   - 文章发表/修改/列表/分页/标签/详情/点赞/取消点赞、
   - 个人中心
   - 个人信息更新


[部署成功的服务器地址](http://106.75.191.167:3000)

踩坑记录：
   - element-ui 中，使用 button 按钮要绑定 form 表单事件，需要去除 type="button" ，才能提交事件
   - 在 axios 请求中，使用 post 请求，需要 data 传递数据
     get 请求，需要 params 传递数据
   - 对接 github-actions 时需要正确书写 文件夹名称 workflows
   - 自动化部署环境，需要基础的 npm，pm2 
     [相关配置文档]('https://gitee.com/lagoufed/fed-e-questions/tree/master/part3/%E7%AC%94%E8%AE%B01-%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%B4%AD%E4%B9%B0%E4%B8%8E%E5%88%9D%E5%A7%8B%E5%8C%96#%E6%B3%A8%E5%86%8C--%E8%B4%AD%E4%B9%B0')
   - 自动化部署，需要检查 nuxt.config 文件、pm2.config 文件是否配置正确
     ```js
         // nuxt.config
         // 虽然 nuxt 官网写的默认，但对应端口号，和 host 还是需要配置，不然部署，不报错，但也不生效
         module.exports = {
            server: {
               open: true,
               autoOpenBrowser: true,
               host: '0.0.0.0',
               port: 3000  
            }
         }

         // PM2 配置，注意 args 不要写错了
         {
            "apps": [
               {
                  "name": "RealWorld",
                  "script": "npm",
                  "args": "start"
               }
            ]
         }
     ```