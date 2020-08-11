import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 使用一個object去包裹功能
const LS = {
  load () {
    return JSON.parse(localStorage.getItem('todo-list') || '[]')
  },
  save (data) {
    localStorage.setItem('todo-list', JSON.stringify(data))
  }
}
const filter = {
  all (todos) {
    return todos
  },
  active (todos) {
    return todos.filter(item => {
      return item.complete === true
    })
  },
  complete (todos) {
    return todos.filter(item => {
      return item.complete === false
    })
  }
}

export default new Vuex.Store({
  strict: true,
  state: {
    todos: [ // 資料內容
    ]
  },
  getters: {
    getTodoIndex (state) { // 從全部資料取出index
      return filter[state.route.name](state.todos).map(item =>
        state.todos.indexOf(item)) // 找出todos內相同的item的index
    }
  },
  mutations: { // 只有state方法
    SET_TODOS (state, data) { // 讀取回來後將資料塞回state
      state.todos = data
      // save localStorage
      LS.save(state.todos)
    },
    ADD_TODOS (state, data) {
      state.todos.push(data)
      LS.save(state.todos) // 要存回localStorage
    },
    UPDATE_TODOS (state, { index, data }) {
      state.todos[index].complete = data.complete
      state.todos[index].content = data.content
      LS.save(state.todos) // 要存回localStorage
    },
    DEL_TODOS (state, index) {
      state.todos.splice(index, 1)
      LS.save(state.todos) // 要存回localStorage
    }
  },
  actions: { // commit內有許多方法
    INIT_TODOS ({ commit }) { // 一開始出使化讀取localStorage
      // load localStorage
      commit('SET_TODOS', LS.load()) // 將內容讀回來
    }
  },
  modules: {
  }
})
