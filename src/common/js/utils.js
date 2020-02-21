function deepCopy (o) {
  if (o instanceof Array) {
    let n = []
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else if (o instanceof Object) {
    let n = {}
    for (let i in o) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else {
    return o
  }
}

export { deepCopy }
