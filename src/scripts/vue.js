import { observe } from './observer'
import Compile from './compile'

const SimpleVue = function(options) {
  this.data = options.data
  Object.keys(this.data).forEach((key) => this.proxyKeys(key))
  observe(this.data)
  new Compile(this, options.el)
}

SimpleVue.prototype = {
  proxyKeys: function(key) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function getter () {
          return this.data[key];
      },
      set: function setter (newVal) {
        this.data[key] = newVal;
      }
    })
  }
}

export default SimpleVue