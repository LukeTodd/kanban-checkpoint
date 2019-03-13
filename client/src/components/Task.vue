<template>
  <div class="task col">
    <div>
      {{taskData.body}}
    </div>
    <comment></comment>

  </div>
</template>


<script>
  import Comment from '@/components/Comment.vue'
  export default {
    name: 'task',
    props: ['listData', 'taskData'],
    data() {
      return {}
    },
    computed: {},
    methods: {},
    components: {
      Comment
    }
  }
</script>


<style scoped>

</style>