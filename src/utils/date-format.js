
export function nextDate(data) {
  var next = new Date(Date.parse(data) + 86400000).toISOString().slice(0, 10)
  return next
}


export function getTodaySeconds() {

  let d = new Date();
  var dateSecond = (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) * 1000
  return dateSecond
}

export default { nextDate,getTodaySeconds }
