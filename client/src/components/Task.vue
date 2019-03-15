<template>
  <drag class="task-card col-11 card" :transfer-data="taskData">
    <h4>{{taskData.body}}
      <button class="delete-button" @click="deleteTask(taskData)">-</i></button></h4>
    <div class="row">
      <comment v-for="comment in comments" :commentData="comment"></comment>
      <div class="col-12">
        <button @click="showForm = !showForm " class="comment-btn">Reply</button>
        <form v-if="showForm" @submit.prevent="createComment">
          <input type="text" placeholder="Add Comment" v-model="commentForm.body" required>
          <footer>
            <button class="reply-button" type="submit"></button>
          </footer>
        </form>
      </div>
    </div>
  </drag>
</template>


<script>
  import Comment from '@/components/Comment.vue'
  export default {
    name: 'task',
    props: ['taskData'],
    data() {
      return {
        commentForm: {},
        showForm: false
      }
    },
    mounted() {
      payload: {
        let boardId = this.$route.params.boardId;
        let listId = this.taskData.listId;
        let taskId = this.taskData._id;
        let payload = {
          boardId,
          listId,
          taskId
        }
        this.$store.dispatch('getComments', payload)
      }
    },
    computed: {
      comments() {
        return this.$store.state.comments[this.taskData._id] || [];
      },
    },
    methods: {
      deleteTask(payload) {
        this.$store.dispatch("deleteTask", payload)
      },
      createComment() {
        let boardId = this.$store.state.activeBoard._id
        let listId = this.taskData.listId
        let taskId = this.taskData._id
        let body = this.commentForm.body
        let payload = {
          boardId,
          listId,
          taskId,
          body
        }
        return this.$store.dispatch('createComment', payload)
      }
    },
    components: {
      Comment
    }
  }
</script>


<style scoped>
  .reply-button {
    background-color: rgba(255, 255, 255, 0);
    border-style: none;
  }

  .delete-button {
    max-width: 25px;
    color: red;
  }

  .task-card {
    background-color: rgba(75, 73, 73, 0.514);
    margin-top: 20px;
    margin-left: 10px;
    border-radius: 8px;
    min-height: 150px;
    max-width: 255px;
  }

  .comment-btn {
    background-color: rgba(0, 0, 0, 0);
    border: none;
  }

  .comment-btn:focus {
    outline: none;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center
  }
</style>