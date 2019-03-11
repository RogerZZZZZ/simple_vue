import Watcher from './watcher'

const Compile = function(vm, selector) {
  this.vm = vm
  this.root = document.querySelector(selector)
  this.fragment = null
  this.init(this.root)
}

Compile.prototype = {
  init: function(node) {
    if (node) {
      this.fragment = this.nodeToFragment(node)
      this.compileNode(this.fragment)
    } else {
      console.error('Fail to find node')
    }
    this.root.appendChild(this.fragment)
  },
  nodeToFragment: function(node) {
    const fragment = document.createDocumentFragment()
    let child = node.firstChild;
    while(child) {
      fragment.appendChild(child)
      child = node.firstChild
    }
    return fragment
  },
  compileNode: function(fragment) {
    const childNodes = fragment.childNodes
    childNodes.forEach(node => {
      const content = node.textContent
      if (this.isTextNode(node) && this.isTextPattern(content)) {
        const key = content.match(/\{\{(.*)\}\}/)[1]
        if (key) {
          this.compile(node, key)
        }
      }
    })
  },
  compile: function(node, key) {
    this.updateTextContent(node, getDataFromChain(this.vm, key))
    new Watcher(node, this.vm, key, () => {
      this.updateTextContent(node, getDataFromChain(this.vm, key))
    })
  },
  updateTextContent: function(node, content) {
    node.textContent = content
  },
  isTextNode: function(el) {
    return el.nodeType === Node.ELEMENT_NODE
  },
  isTextPattern: function(target) {
    return /\{\{(.*)\}\}/.test(target)
  },
}

export const getDataFromChain = function(vm, path) {
  const chain = path.split('.')
  if (chain.length < 2) return vm[path]
  let value = vm[chain[0]]
  for (let i = 1; i < chain.length; i++) {
    if (!value) return undefined
    value = value[chain[i]]
  }
  return value
}

export default Compile