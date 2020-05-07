import R from 'ramda'
/**
 * 判断必填参数是否为空
 * @param {array} parmas
 */
const required = parmas => {
  return async (ctx, next) => {
    const requestKey = ctx.method === 'GET' ? 'query' : 'body'
    let errs = [].concat(
      R.filter(name => !R.has(name, ctx.request[requestKey]))(parmas)
    )
    if (!R.isEmpty(errs)) {
      return (ctx.body = {
        success: false,
        errCode: 1002,
        errMsg: `${R.join(', ', errs)} is required`
      })
    }
    await next()
  }
}
export default required
