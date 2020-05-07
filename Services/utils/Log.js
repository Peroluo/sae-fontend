import log4js from 'log4js'
import Help from './Help'
class Log {
  /**
   * 日志生成工具
   * @param {日志类型} type
   */
  static initLog(type, withDate = true) {
    const filename = withDate
      ? `./Services/logs/${type}.${Help.newDateYYMMDD()}.log`
      : `./Services/logs/${type}.log`
    log4js.configure({
      appenders: {
        logs: {
          type: 'dateFile',
          filename,
          pattern: '.yyyy-MM-dd',
          alwaysIncludePattern: false
        }
      },
      categories: {
        default: { appenders: ['logs'], level: 'debug' }
      }
    })
    return log4js.getLogger('SERVICELOG')
  }

  /**
   * @param {error日志信息} errorMsg
   */
  static error(errorMsg) {
    this.initLog('Error').error(errorMsg)
    this.initLog('Log', false).error(errorMsg)
  }

  /**
   * @param {Info日志信息} infoMsg
   */
  static info(infoMsg) {
    this.initLog('Info').info(infoMsg)
    this.initLog('Log', false).info(infoMsg)
  }
}
export default Log
