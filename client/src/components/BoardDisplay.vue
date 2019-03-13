<template>
  <div class=" offset-1col-4 card board-display">
    <div @click="setActiveBoard(boardData), $router.push({name: 'board', params: {boardId:boardData._id}})">
      <p>{{boardData.title}}</p>
    </div>
    <p>{{boardData.description}}</p>
    <button @click="deleteBoard(boardData._id)"><img class="banana-peel" src="../assets/banana-peel.png"></button>
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