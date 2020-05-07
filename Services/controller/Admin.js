import { Controller, RequestMapping } from '../decorator'
import middleware from '../decorator/middleware'
const { Required, Auth } = middleware
import http from '../utils/Http'
@Controller
class Admin {
  @RequestMapping({ method: 'get', url: '/test/:id' })
  // url非必填,不填则是/getUserInfo
  async getUserInfo(ctx) {
    debugger
    const data = await http.httpRequest(
      'http://202.96.155.121:8888/api/auth/loginByMobile',
      {
        mobile: '15323807318',
        password: '123456'
      }
    )
    ctx.body = { ...data }
  }

  @RequestMapping({ method: 'get' })
  async getGoods(ctx) {
    const data = await http.httpRequest(
      'http://202.96.155.121:8888/api/goods/category',
      {
        id: '1008008'
      },
      'get'
    )
    ctx.body = { ...data }
  }
}
export default Admin
