<template>
  <div class=" m-2 card col-3">
    <p>{{listData.title}}
      <button class="delete-button" @click="deleteList(listData._id)"><i class="fas fa-ban"></i></button>
    </p>
    <form @submit.prevent="createTask">
      <button type="submit">Create Task</button><br>
      <input type="text" placeholder="title" v-model="taskForm.body" required>
    </form>
    <task v-for="task in tasks" :taskData="task"></task>
  </div>

</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'List',
    props: ['listData'],
    mounted() { },
    data() {
      return {
        taskForm: {
        }
      }
    },
    methods: {
      deleteList(listId) {
        this.$store.dispatch("deleteList", listId)
      },
      createTask() {
        let boardId = this.$store.state.activeBoard._id
        let listId = this.listData._id
        let body = this.taskForm.body
        let payload = {
          boardId,
          listId,
          body
        }
        return this.$store.dispatch('createTask', payload)
      }
    },
    computed: {
      tasks() {
        return this.$store.state.tasks;
      }
    },

    components: {
      Task
    }
  }
</script>

<style scoped>
  .card {
    min-height: 350px;
  }

  .delete-button {
    max-width: 25px;
    border-style: none;
  }
</style>