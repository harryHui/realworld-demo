// 在服务端运行期间都是同一个实例
// 为了防止数据冲突， 务必把 state 定义成一个函数，返回数据对象
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null
  }
}
export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}
export const actions = {
  // nuxtServerInit 是一个特殊的 action 方法
  // 会在服务端渲染期间调用
  // 作用是初始化容器数据， 传递数据给客户端
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      // cookieparser 把 cookie 字符串转换为 js 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}
