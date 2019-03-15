<template>
  <div class=" ml-2 mt-4 col-2">
    <div class="card"
      @click="setActiveBoard(boardData), $router.push({name: 'board', params: {boardId:boardData._id}})">
      <div class="card-body">
        <h5 class="card-title">
          {{boardData.title}}</h5>

        <p class="card-text">{{boardData.description}}
        </p>

        <button class="delete-board" @click="deleteBoard(boardData._id)">Delete Board</button>
      </div>
    </div>
  </div>

</template>


<script>
  export default {
    name: 'boardDisplay',
    props: ['boardData'],
    methods: {
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId)
      },
      setActiveBoard(boardData) {
        this.$store.dispatch("getActiveBoard", boardData)
      }
    }
  }
</script>

<style>
  .card:hover {
    cursor: pointer;
  }

  .delete-board {
    border-radius: 5px;
    box-shadow: 3px 3px 3px black;
  }
</style>