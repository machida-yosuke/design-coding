
export default function searchName() {
  if (process.browser) {
    return window.location.pathname.replace(/\//g, '')
  }
}
