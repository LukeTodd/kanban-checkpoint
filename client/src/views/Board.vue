<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        {{board.title}}
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="createList">
          <button type="submit">Create List</button><br>
          <input type="text" placeholder="title" v-model="listForm.title" required>
        </form>
      </div>
      <list v-for="list in lists" :listData='list'>
      </list>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    data() {
      return {
        listForm: {}
      }
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      getLists(boardId) {
        return this.$store.state.lists
      },
      createList() {
        return this.$store.dispatch('createList', this.listForm)
      }
    },
    components: {
      List
    },
    props: ["boardId"]
  };
</script>