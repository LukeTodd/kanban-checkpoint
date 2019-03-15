<template>
  <div class=" offset-1col-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"
          @click="setActiveBoard(boardData), $router.push({name: 'board', params: {boardId:boardData._id}})">
          {{boardData.title}}</h5>

        <p class="card-text">{{boardData.description}}
        </p>

      </div>
    </div>
    <button @click="deleteBoard(boardData._id)">Delete Board</button>
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