import Watcher from './watcher'

const Compile = function(vm, el) {
  this.vm = vm
  this.el = document.querySelector(el)
  this.fragment = null
  this.init()
}

Compile.prototype = {
  init: function() {
    if (this.el) {
      this.fragment = this.toFragment(this.el)
      this.compileNode(this.fragment)
      this.el.appendChild(this.fragment)
    } else {
      console.log('can not find this root element')
    }
  },
  toFragment: function(rootDom) {
    const fragment = document.createDocumentFragment()
    let child = rootDom.firstChild
    while(child) {
      fragment.appendChild(child)
      child = rootDom.firstChild
    }
    return fragment
  },
  compileNode: function(fragment) {
    const childNodes = fragment.childNodes
    childNodes.forEach(element => {
      const content = element.textContent
      if (this.isTextNode(element), this.isTextPattern(content)) {
        const exp = this.textExtract(content)
        this.compile(element, exp)
      }
    });
  },
  compile: function(node, exp) {
    this.updateTextNode(node, this.vm[exp])
    const self = this
    new Watcher(this.vm, node, exp, function() {
      self.updateTextNode(node, this.vm[this.exp])
    })
  },
  isTextPattern: function(target) {
    const pattern = /\{\{(.*)\}\}/
    return pattern.test(target)
  },
  textExtract: function(target) {
    const pattern = /\{\{(.*)\}\}/
    return target.match(pattern)[1]
  },
  isTextNode: function(target) {
    return target.nodeType === Node.TEXT_NODE
  },
  updateTextNode: function(target, value) {
    target.textContent = value
  }
}

export default Compile