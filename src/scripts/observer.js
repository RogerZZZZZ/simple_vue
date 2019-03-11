const Observer = function(data) {
  this.data = data
  this.init()
}

Observer.prototype = {
  init: function() {
    Object.keys(this.data).forEach(key => this.walk(this.data, key))
  },
  walk: function(el, exp) {
    const dep = new Dep()
    let val = el[exp]
    observe(el[exp])
    Object.defineProperty(el, exp, {
      enumerable: false,
      configurable: true,
      get: function getter() {
        if (Dep.target) {
          dep.add(Dep.target)
        }
        return val
      },
      set: function setter(newVal) {
        if (val === newVal) {
          return
        }
        val = newVal
        dep.notify()
      }
    })
  },
}

export const observe = function(el) {
  if (el === null || typeof el !== 'object') {
    return null
  }
  return new Observer(el)
}

export const Dep = function () {
  this.queue = []
}

Dep.prototype = {
  add: function(watcher) {
    this.queue.push(watcher)
  },
  notify: function() {
    this.queue.forEach(watcher => watcher.update())
  }
}

Dep.target = null

export default Observer