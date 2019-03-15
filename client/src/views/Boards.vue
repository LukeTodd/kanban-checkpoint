<template>

  <div class="row">
    <div class=" offset-1 col-10 boards">
      <h1>My Boards</h1>
    </div>
    <div class="col-12">
      <form @submit.prevent="addBoard">
        <input class="form" type="text" placeholder="Add Board Title" v-model="newBoard.title" required>
        <input class="form" type="text" placeholder="Add Board Description" v-model="newBoard.description" required>
        <button class="button board-button" type="submit"></button>
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
    font-family: 'Sniglet', cursive;
    color: #fbda0f;
    text-shadow: 2px 2px black;
    margin-bottom: 30px;
  }

  .form {
    border-radius: 5px;
    box-shadow: 3px 3px 5px black;
    margin: 5px;
  }

  .board-button {
    background-color: rgba(255, 255, 255, 0);
    border-style: none;
  }

  .banana-peel {
    max-height: 35px;
  }
</style>