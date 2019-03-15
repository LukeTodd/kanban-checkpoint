<template>
  <drop class=" m-2 card-list col-3" @drop="dragDrop">
    <div class="row list-title">
      <div class="col-9 ">
        <h3>{{listData.title}}</h3>
      </div>
      <div class="col-3 ml-auto">
        <div class="dropdown">
          <button class="dropdown-toggle list-drop" type="button" id="dropdownMenuButton" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">Edit List Name</a>
            <a @click="deleteList(listData._id)" class="dropdown-item" href="#">Delete List</a>
          </div>
        </div>
        <!-- <button class="delete-button" @click="deleteList(listData._id)"><i class="fas fa-ban"></i></button> -->
      </div>
      <div class="col-12">
        <form @submit.prevent="createTask">
          <input type="text" placeholder="Add Task" v-model="taskForm.body" required>
          <button class="add-task" type="submit">+</button>
        </form>
      </div>
    </div>
    <div class="row">
      <task v-for="task in tasks" :taskData="task"></task>
    </div>
  </drop>

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
      },
      dragDrop(task) {
        let list = this.listData
        let payload = {
          listId: list._id,
          task: task,
          body: task.body
        }
        this.$store.dispatch('dragDrop', payload)
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
  .list-title {
    position: sticky;
    top: 0px;
    z-index: 1;
    background-color: rgb(230, 230, 230);
    padding-bottom: 10px;
  }

  h3 {
    margin-top: 10px;
  }

  .email {
    background-color: transparent;
    border: none;
    border-bottom: solid;
    border-width: 1px;
    margin-bottom: 5px;
    border-color: rgb(179, 178, 178);
    font-family: 'Kanit', sans-serif;
  }

  .card-list {
    height: 72vh;
    max-width: 275px;
    background-color: rgba(230, 230, 230, 0.945);
    overflow-y: scroll;
    border-radius: 8px;
    box-shadow: 5px 5px 3px rgba(58, 58, 58, 0.63);
  }

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #e7e7e7;
    margin-top: 5px;
    margin-bottom: 5px;
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

  .list-drop {
    background-color: rgba(0, 0, 0, 0);
    border-width: 0px;
    margin-left: 20px;
    max-width: 20px;
    max-height: 20px;
    border: none;
  }

  .list-drop:hover {
    background-color: rgba(0, 0, 0, 0);
  }

  .list-drop:focus {
    outline: none;
  }

  .dropdown:focus {
    background-color: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
  }

  .dropdown-toggle {
    background-color: rgba(0, 0, 0, 0, );
    color: none;
  }
</style>