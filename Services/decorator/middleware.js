// 中间件装饰器类
import required from '../middleware/required'
import isLogin from '../middleware/isLogin'
import Help from '../utils/Help'
class MiddlewareDecorator {
  Required = parmas => Help.convert(required(parmas))

  Auth = Help.convert(isLogin())
}
export default new MiddlewareDecorator()
