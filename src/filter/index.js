export default {
  // 时间转换
  getTime: (time, flag = false) => {
    if (!time) return ''
    time = new Date(time)
    const year = time.getFullYear()
    let month = time.getMonth() + 1
    let day = time.getDate()
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()
    day = day > 9 ? day : '0' + day
    month = month > 9 ? month : '0' + month
    hours = hours > 9 ? hours : '0' + hours
    minutes = minutes > 9 ? minutes : '0' + minutes
    seconds = seconds > 9 ? seconds : '0' + seconds
    if (flag) return `${year}-${month}-${day}`
    return `${year}-${month}-${day}  ${hours}:${minutes}:${seconds}`
  }
}
