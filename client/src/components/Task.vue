<template>
  <div class="task col-12">
    <h4>{{taskData.body}}
      <button class="delete-button" @click="deleteTask(taskData)"><i class="fas fa-ban"></i></button></h4>
    <div class="row">
      <comment v-for="comment in comments" :commentData="comment"></comment>
      <div class="col-12">
        <form @submit.prevent="createComment">
          <input type="text" placeholder="Comment Title" v-model="commentForm.body" required>
          <button type="submit">Create Comment</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
  import Comment from '@/components/Comment.vue'
  export default {
    name: 'task',
    props: ['taskData'],
    data() {
      return {
        commentForm: {}
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
  .delete-button {
    max-width: 25px;
    border-style: none;
  }
</style>