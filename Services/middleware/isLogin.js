/**
 * 通过session的user判断用户是否已经登录
 */
const isLogin = () => {
  return async (ctx, next) => {
    if (!ctx.session.user) {
      return (ctx.body = {
        success: false,
        errCode: 1001,
        errMsg: '登陆信息已失效, 请重新登陆！'
      })
    }
    await next()
  }
}

export default isLogin
