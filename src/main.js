import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import App from './App.vue'
import router from './router'
import store from './store'

import './css/tailwind.css'
import './css/main.css'
import './css/normalize.css'


Vue.config.productionTip = false



const settings = {
    TTable: {
    classes: {
      table: 'min-w-full divide-y divide-gray-100 border-gray-200 border-none',
      thead: 'border-t ',
      theadTr: '',
      theadTh: 'px-3 pb-2 pt-3 font-semibold text-left bg-white border-b',
      tbody: 'bg-white divide-y divide-gray-100 t-body-test ',
      tr: '',
      td: 'px-3 py-1 whitespace-no-wrap border-b border-gray-400 ',
      tfoot: '',
      tfootTr: '',
      tfootTd: ''
    },
    variants: {
      thin: {
        td: 'p-1 whitespace-no-wrap text-sm',
        theadTh: 'p-1 font-semibold text-left bg-gray-100 border-b text-sm'
      }
    }
  },
  TDropdown: {
    fixedClasses: {
      button: 'flex items-center text-gray-800  block  transition  duration-100 ease-in-out border border-gray-300 hover:border-green-400  focus:ring-2  focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      wrapper: 'inline-flex flex-col',
      dropdownWrapper: 'relative z-10',
      dropdown: 'origin-top-left absolute left-0  rounded shadow mt-1',
      enterClass: 'opacity-0 scale-95',
      enterActiveClass: 'transition transform ease-out duration-100',
      enterToClass: 'opacity-100 scale-100',
      leaveClass: 'opacity-100 scale-100',
      leaveActiveClass: 'transition transform ease-in duration-75',
      leaveToClass: 'opacity-0 scale-95'
    },
    classes: {
      button: 'px-4 py-2 rounded-2xl font-bold uppercase bg-gray-100 hover:bg-green-200 focus:bg-green-200 test-dropdown',
      dropdown: 'bg-white cursor-pointer w-16'
    },
    variants: {
      sortBy: {
        button: 'px-4 py-1 mb-2 rounded-2xl font-bold bg-white text-sm border-gray-400 hover:bg-green-200 focus:bg-green-20',
        dropdown: 'bg-white cursor-pointer w-40'
      }
    }
  }
}
Vue.use(VueTailwind, settings)

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

if (window.Cypress) {
  // only available during E2E tests
  window.app = app
}
