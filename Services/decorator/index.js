import { resolve } from 'path'
import KoaRouter from 'koa-router'
import glob from 'glob'
import R from 'ramda'

const pathPrefix = Symbol('pathPrefix')
const routeMap = []

const resolvePath = R.unless(R.startsWith('/'), R.curryN(2, R.concat)('/'))
const changeToArr = R.unless(R.is(Array), R.of)

export class Route {
  constructor(app, routesPath) {
    this.app = app
    this.router = new KoaRouter()
    this.routesPath = routesPath
  }

  init = () => {
    const { app, router, routesPath } = this
    glob.sync(resolve(routesPath, './*.js')).forEach(require)
    R.forEach(({ target, method, path, callback }) => {
      const prefix = resolvePath(target[pathPrefix])
      router[method](prefix + path, ...callback)
    })(routeMap)

    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

export const RequestMapping = (requestmapping = { method: 'get', url: '' }) => (
  target,
  key,
  descriptor
) => {
  routeMap.push({
    target,
    method: requestmapping.method,
    path: requestmapping.url ? requestmapping.url : `/${descriptor.value.name}`,
    callback: changeToArr(target[key])
  })
  return descriptor
}

export const Controller = target => (target.prototype[pathPrefix] = target.name)
