<template>
  <div class="row">
    <div class="col">
      <div class="bg row">
        <div class="offset-1 col-10">
          <h1>{{board.title}}</h1>

        </div>
      </div>
      <div class="row">
        <div class="col-12 ">
          <form @submit.prevent="createList">
            <input class="list-form" type="text" placeholder="Add List Title" v-model="listForm.title" required>
            <button class="list-button" type="submit"></button>
          </form>
        </div>
      </div>
      <div class="row flex-nowrap scroll-x">
        <list v-for="list in lists" :listData='list'></list>
      </div>
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
    margin-top: -55px;
  }

  .scroll-x {
    overflow-x: scroll;
    width: 100vw;
    position: fixed;
    bottom: 5px;
  }

  .list-button {
    background-color: rgba(255, 255, 255, 0);
    border-style: none;
  }

  .list-form {
    margin-top: -15px;
    box-shadow: 5px 5px 3px black;
    border-radius: 8px;
  }
</style>