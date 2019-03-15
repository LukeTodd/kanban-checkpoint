<template>
  <div class="comment col-12 text-center">
    <p>{{commentData.body}}
      <button class="delete-comment" @click="deleteComment(commentData)">-</button>
    </p>
  </div>
</template>


<script>
  export default {
    name: 'comment',
    props: ['commentData'],
    data() {
      return {}
    },
    computed: {

    },
    methods: {
      deleteComment(payload) {
        return this.$store.dispatch('deleteComment', payload)
      }
    },
    components: {}
  }
</script>


<style scoped>
  .delete-comment {
    border-style: none;
    background-color: rgba(0, 0, 0, 0);
    color: red;

  }
</style>