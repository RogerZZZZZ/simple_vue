import SimpleVue from './vue'

const vue = new SimpleVue({
  el: '#app',
  data: {
    title: 'title',
    test: {
      a: 2
    },
    content: 'content'
  }
})

const test = vue.title
vue.data.title = 'new Title'
vue.data.test.a = 3