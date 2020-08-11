<template>
  <div>
    <div class="todoInput">
      <input
        type="text"
        placeholder="Enter Todo"
        v-model.trim="todo"
        @keyup.enter="submitHandler"
        v-focus
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      todo: ''
    }
  },
  methods: {
    submitHandler () {
      if (!this.todo) return // 沒資料，跳出
      this.$store.commit('ADD_TODOS', {
        content: this.todo,
        complete: false
      })
      this.todo = ''
    }
  }
}
</script>
