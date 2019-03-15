<template>
  <div class="comment col-12">
    <p>{{commentData.body}}
      <button class="delete-comment" @click="deleteComment(commentData)">-</button></p>

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
    max-width: 25px;
    border-style: none;
    background-color: none;
  }
</style>