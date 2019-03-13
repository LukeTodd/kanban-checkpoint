<template>
  <div class="row">
    <div class="col">
      <form @submit.prevent="addBoard">
        <input type="text" placeholder="title" v-model="newBoard.title" required>
        <input type="text" placeholder="description" v-model="newBoard.description">
        <button type="submit">Create Board</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'List',
    props: ['boardData']
  }
</script>

<style scoped>
</style>