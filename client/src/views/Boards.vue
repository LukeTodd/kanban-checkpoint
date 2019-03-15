<template>

  <div class="row boards">
    <div class="col-12">
      <h1>My Boards</h1>
      <form @submit.prevent="addBoard">
        <input class="form" type="text" placeholder="Title" v-model="newBoard.title" required>
        <input class="form" type="text" placeholder="Description" v-model="newBoard.description" required>
        <button class="button board-button" type="submit">+ Board</button>
      </form>
    </div>
    <board-display v-for="board in boards" :boardData="board"></board-display>
  </div>

</template>

<script>
  import BoardDisplay from '@/components/BoardDisplay.vue'
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      }
    },
    components: {
      BoardDisplay
    }
  };
</script>

<style>
  .boards {
    margin-top: -55px;
  }

  h1 {
    margin-bottom: 15px;
    font-family: 'ABeeZee', sans-serif;
    color: white;
    text-shadow: 1px 1px rgb(0, 0, 0);
    margin-bottom: 30px;
  }

  .form {
    border-radius: 5px;
    border: solid yellow;
    box-shadow: 3px 3px 5px black;
    background-color: rgb(255, 255, 147);
    margin: 5px;
  }

  .board-button {
    border-radius: 5px;
    border: solid yellow;
    box-shadow: 3px 3px 5px rgb(0, 0, 0);
    background-color: rgb(255, 255, 147);
    margin: 5px;
  }

  .banana-peel {
    max-height: 35px;
  }
</style>