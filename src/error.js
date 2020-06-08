import Vue from 'vue'

Vue.config.errorHandler = e => { // catch가 없으면 여기로 들어온다
  console.log('--------here')
  console.error(e.message)
  Vue.prototype.$toast.error(e.message)
  console.log('--------here')
}
