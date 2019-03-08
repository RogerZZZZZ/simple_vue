import SimpleVue from './vue'

const vue = new SimpleVue({
  el: '#app',
  data: {
    title: 'title',
    content: 'content'
  }
})

const test = vue.title
vue.title = 'new Title'