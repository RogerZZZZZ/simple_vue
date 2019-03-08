import { Dep } from './observer'

const Watcher = function(vm, node, exp, callback) {
  this.vm = vm
  this.node = node
  this.exp = exp
  this.update = callback
  this.init()
}

Watcher.prototype = {
  init: function() {
    Dep.target = this
    const tigger = this.vm[this.exp]
    Dep.target = null
  },
}

export default Watcher