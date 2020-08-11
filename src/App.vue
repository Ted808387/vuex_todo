<template>
  <div id="app">
    <div id="nav">
      <router-link to="/all">All</router-link> |
      <router-link to="/active">Active</router-link> |
      <router-link to="/complete">Complete</router-link>
    </div>
    <TodoInput />
    <div id="list">
      <TodoList v-for="index in todoIndex" :key="index" :index=index />
    </div>
  </div>
</template>

<script>
import TodoInput from '@/components/Todoinput.vue'
import TodoList from '@/components/Todolist.vue'
export default {
  components: {
    TodoInput,
    TodoList
  },
  computed: {
    todoIndex () {
      return this.$store.getters.getTodoIndex
    }
  },
  mounted () {
    this.$store.dispatch('INIT_TODOS')
  }
}
</script>

<style src="@/assets/style/all.css"></style>
