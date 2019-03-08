import SimpleVue from './vue'

const vue = new SimpleVue({
  el: '#el',
  data: {
    title: 'title',
    content: 'content'
  }
})

const test = vue.title
vue.title = 'new Title'
console.log(test)