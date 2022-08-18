export default class DateUtils {
  static firstDayOfMonth(date = new Date()) {
    const temp = new Date(date)
    temp.setDate(1)
    return temp
  }

  static lastDayOfMonth(date) {
    const auxDate = new Date(date)
    const currentMonth = auxDate.getMonth()
    let lastDay = auxDate.getDate()

    while (currentMonth === auxDate.getMonth()) {
      auxDate.setDate(auxDate.getDate() + 1)
      if (currentMonth === auxDate.getMonth()) {
        lastDay = auxDate.getDate()
      }
    }
    return lastDay
  }

  static justDate(date = new Date()) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }

  static stringJustDate(date = new Date()) {
    return (
      date.getDate().toString().padStart(2, '0') +
      '/' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '/' +
      date.getFullYear()
    )
  }

  static stringJustTime(date = new Date()) {
    return (
      date.getHours().toString().padStart(2, '0') +
      ':' +
      date.getMinutes().toString().padStart(2, '0') +
      ':' +
      date.getSeconds().toString().padStart(2, '0')
    )
  }

  static stringDateTime(date = new Date()) {
    return this.stringJustDate(date) + ' ' + this.stringJustTime(date)
  }

  static stringToDateTime(date) {
    const auxDate = date.split(' ')[0]
    const day = auxDate.split('/')[0]
    const month = auxDate.split('/')[1]
    const year = auxDate.split('/')[2]
    const auxTime = date.split(' ')[1]
    const hours = auxTime.split(':')[0]
    const minutes = auxTime.split(':')[1]
    const seconds = auxTime.split(':')[2]
    return new Date(
      parseInt(year),
      parseInt(month, 10) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds)
    )
  }

  static stringToDate(auxDate) {
    const day = auxDate.split('/')[0]
    const month = auxDate.split('/')[1]
    const year = auxDate.split('/')[2]
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  }
}
