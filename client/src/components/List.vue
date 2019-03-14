<template>
  <div class=" m-2 card-list col-3">
    <div class="row">
      <div class="col">
        <h3>{{listData.title}}</h3>
      </div>
      <div class="col-2 ml-auto">
        <button class="delete-button" @click="deleteList(listData._id)"><i class="fas fa-ban"></i></button>
      </div>
    </div>
    <form @submit.prevent="createTask">
      <button type="submit">Task</button><br>
      <input type="text" placeholder="title" v-model="taskForm.body" required>
    </form>
    <div class="row">
      <task v-for="task in tasks" :taskData="task"></task>
    </div>
  </div>

</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'List',
    props: ['listData'],

    data() {
      return {
        taskForm: {
        }
      }
    },
    mounted() {
      payload: {
        let boardId = this.$route.params.boardId;
        let listId = this.listData._id
        let payload = {
          boardId,
          listId
        }
        this.$store.dispatch('getTasks', payload)
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
        return this.$store.state.tasks[this.listData._id];
      }
    },
    components: {
      Task
    }
  }
</script>

<style>
  .card-list {
    min-height: 65vh;
    min-width: 300px;
    background-color: rgb(230, 230, 230);
    overflow-y: scroll;
    max-height: 66vh;
    border-radius: 8px;
    box-shadow: 5px 5px 5px rgb(58, 58, 58);
  }

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #e7e7e7;
    margin-top: 5px;
    border-radius: 9px;
    border-style: solid;
    border-color: #e7e7e7;
  }

  ::-webkit-scrollbar-thumb {
    background: rgb(160, 160, 160);
    border-radius: 9px;
    border-style: solid;
    border-color: rgb(160, 160, 160);
  }

  .delete-button {
    max-width: 20px;
    border-style: none;
    background-color: rgba(255, 255, 255, 0);
  }
</style>