const Observer = function(el) {
  this.el = el
  this.init()
}

Observer.prototype = {
  init: function() {
    Object.keys(this.el).forEach((key) => {
      this.bindInterceptor(key, this.el, this.el[key])
    })
  },
  bindInterceptor: function(key, data) {
    let val = data[key]
    observe(val)
    const dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get: function getter() {
        if (Dep.target) {
          dep.add(Dep.target)
        }
        return val
      },
      set: function setter(newVal) {
        if (newVal !== val) {
          val = newVal
          dep.notify()
        }
      }
    })
  }
}

export const observe = function(el) {
  if (!el || typeof el !== 'object') {
    return
  }

  new Observer(el)
}

export const Dep = function() {
  this.deps = []
}

Dep.prototype = {
  add: function(watcher) {
    this.deps.push(watcher)
  },
  notify: function() {
    this.deps.forEach((dep) => {
      dep.update()
    })
  }
}

Dep.target = null