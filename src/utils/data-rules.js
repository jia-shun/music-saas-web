export function checkNum(value) {
  if (value !== null && value !== '') {
    if (String(value).trim() === '' || Number(value) <= 0) {
      return false
    } else if (String(value).indexOf('.') !== -1 || String(value).indexOf('-') !== -1) {
      return false
    } else {
      return Number(value)
    }
  } else {
    return null
  }
}
export function checkNumLessYear(value) {
  if (value !== '') {
    if (String(value).trim() === '' || Number(value) < 0 || Number(value) > 365) {
      return false
    } else if (String(value).indexOf('.') !== -1 || String(value).indexOf('-') !== -1) {
      return false
    } else {
      return Number(value)
    }
  } else {
    return null
  }
}
