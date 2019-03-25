export default function tohex(n) {
  let retval = ''
  if (n <= 0) {
    retval = '00'
    return retval
  }
  const nt = n
  while (n > 0) {
    let m = n
    n = m >> 4
    m = m % 16
    let string = ''
    if (m < 10) string = '' + m; else {
      switch (m) {
        case 10:
        default:
          string = 'A'
          break

        case 11:
          string = 'B'
          break

        case 12:
          string = 'C'
          break

        case 13:
          string = 'D'
          break

        case 14:
          string = 'E'
          break

        case 15:
          string = 'F'
          break
      }
    }
    retval = string + retval
  }
  if (nt < 16) retval = '0' + retval
  return retval
}
