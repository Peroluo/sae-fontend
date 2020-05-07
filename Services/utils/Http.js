import axios from 'axios'
class Http {
  /**
   * 初始化Sever相关属性
   * @param timeout 请求过期时间
   */
  constructor(timeout = 10000, baseURL = '') {
    this.Server = axios.create({
      baseURL,
      timeout,
      withCredentials: true
    })
    this.TIMEOUT = timeout || 10000
  }

  /**
   * 普通http请求
   * @param ctx
   * @param url
   * @param params
   * @param method
   * @returns {Promise<void>}
   */
  async httpRequest(url, params, method = 'post') {
    const obj =
      method === 'get'
        ? { params }
        : {
            ...params
          }
    return (await this.Server[method](url, obj)).data
  }

  // 添加其他请求(文件上传....) todo
}
module.exports = new Http()
