<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        {{board.title}}

        <list v-for="list in lists" :listData='list'></list>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "board",
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      }
    },
    props: ["boardId"]
  };
</script>