<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        {{board.title}}
      </div>
    </div>
    <list v-for="list in lists" :listData='list'></list>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
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