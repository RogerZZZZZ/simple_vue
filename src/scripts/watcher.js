import { Dep } from './observer'
import { getDataFromChain } from './compile'

const Watcher = function(node, vm, exp, cb) {
  this.node = node
  this.update = cb
  this.exp = exp
  this.vm = vm
  this.init()
}

Watcher.prototype = {
  init: function() {
    Dep.target = this
    const val = getDataFromChain(this.vm, this.exp)
    Dep.target = null
  },
}

export default Watcher