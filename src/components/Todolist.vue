<template>
    <div>
      <div class="todolist">
        <input
          class="todolist_change"
          type="text"
          v-model.trim="edit"
          v-focus
          v-if="edit !== null"
          @blur="cancelHandler"
          @keyup.esc="cancelHandler"
          @keyup.enter="updateTodos"
        >
        <template v-else>
          <input class="todolist_complete" type="checkbox" v-model="complete">
          <label @dblclick="editHandler">
            <del v-show="complete" class="cancel">{{ todo.content }}</del>
            <div v-show="!complete">{{ todo.content }}</div>
          </label>
          <button class="destroy" @click="destroyHandler">X</button>
        </template>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      edit: null
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    todo () {
      return this.$store.state.todos[this.index]
    },
    complete: {
      get () {
        return this.todo.complete
      },
      set (val) {
        this.$store.commit('UPDATE_TODOS', {
          index: this.index,
          data: {
            content: this.todo.content,
            complete: val
          }
        })
      }
    }
  },
  methods: {
    destroyHandler () {
      if (confirm(`是否確認刪除 ${this.todo.content}`)) {
        this.$store.commit('DEL_TODOS', this.index)
      }
    },
    editHandler () {
      this.edit = this.todo.content
    },
    cancelHandler () {
      this.edit = null
    },
    updateTodos () {
      if (!this.edit) return
      this.$store.commit('UPDATE_TODOS', {
        index: this.index,
        data: {
          content: this.edit,
          complete: this.todo.complete
        }
      })
      this.cancelHandler()
    }
  }
}
</script>
