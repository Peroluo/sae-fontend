import Log from '../../utils/Log'
import Help from '../../utils/Help'
export const addLog = app => {
  app.use(async (ctx, next) => {
    const startTime = new Date().getTime()
    const reqMethod = ctx.method
    const reqUrl = ctx.request.url
    const parmas =
      reqMethod === 'GET'
        ? JSON.stringify(Help.getRequestParmas(reqUrl))
        : JSON.stringify(ctx.request.body)
    try {
      await next()
      const endTime = new Date().getTime()
      const reqTime = endTime - startTime + 'ms'
      const {
        response: { status, message }
      } = ctx
      const resBody = JSON.stringify(status === 200 ? ctx.body : message)
      const info = `${reqMethod}==>${reqUrl}==>request==>${parmas}==>response==>${resBody}==>${reqTime}`
      status === 200 ? Log.info(info) : Log.error(info)
    } catch (e) {
      const endTime = new Date().getTime()
      const reqTime = endTime - startTime + 'ms'
      const resBody = e.message
      const error = `${reqMethod}==>${reqUrl}==>request==>${parmas}==>response==>${resBody}==>${reqTime}`
      Log.error(error)
      ctx.body = e.message
    }
  })
}
