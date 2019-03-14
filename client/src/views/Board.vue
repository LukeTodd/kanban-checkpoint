<template>
  <div class="container-fluid">
    <div class="bg row">
      <div class="col">
        <h2>{{board.title}}</h2>
        <h4>{{}}
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="createList">
          <input type="text" placeholder="title" v-model="listForm.title" required>
          <button type="submit">Create List</button>
        </form>
      </div>
      <list v-for="list in lists" :listData='list'></list>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    mounted() {
      this.$store.dispatch('getLists', this.$route.params.boardId)

    },
    data() {
      return {
        listForm: {
        }
      }
    },
    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      },
      lists() {
        return this.$store.state.lists;
      }
    },
    methods: {
      createList() {
        let boardId = this.$store.state.activeBoard._id
        let title = this.listForm.title
        let payload = {
          title,
          boardId
        }
        return this.$store.dispatch('createList', payload)
      }
    },
    components: {
      List
    },
    props: ["boardId"]
  };
</script>

<style>
  .bg {
    margin-top: 60px;
  }
</style>