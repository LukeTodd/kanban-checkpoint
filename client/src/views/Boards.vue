<template>
  <div class="row boards">
    .<div class="col-12">
      <h2>Banana Boards Baby!</h2>
      <form @submit.prevent="addBoard">
        <input class="form" type="text" placeholder="title" v-model="newBoard.title" required>
        <input class="form" type="text" placeholder="description" v-model="newBoard.description" required>
        <button class="button" type="submit">Create Board</button>
      </form>
    </div>
    <div class=" offset-1col-4 card" v-for="board in boards" :key="board._id">
      <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
      <button @click="deleteBoard(board._id)"><img class="banana-peel" src="../assets/banana-peel.png"></button>
    </div>
  </div>
</template>

<script>
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
    }
  };
</script>

<style>
  .boards {
    margin-top: 50px;
  }

  h2 {
    margin-bottom: 15px;
    font-family: 'Sniglet', cursive;
    color: yellow;
    text-shadow: 1px 1px rgb(255, 241, 118);
  }

  .form {
    border-radius: 5px;
    border: solid yellow;
    box-shadow: 3px 3px 5px black;
    background-color: rgb(255, 255, 147);
    margin: 5px;
  }

  .button {
    border-radius: 5px;
    border: solid brown;
    box-shadow: 3px 3px 5px black;
    background-color: yellow;
    margin: 5px;
  }

  .banana-peel {
    max-height: 35px;
  }
</style>