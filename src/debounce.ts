const debounce = (func: Function, wait: number, leading = false) => {
  let timeout: number | undefined
  return (...args: any) => {
    clearTimeout(timeout)
    if (leading && !timeout) {
      func.apply(this, args)
    }
    timeout = setTimeout(() => {
      timeout = undefined
      if (!leading) {
        func.apply(this, args)
      }
    }, wait)
  }
}

export default debounce
