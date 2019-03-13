<template>

  <div class="col-3">

    <task></task>
  </div>

</template>

<script>
  import Task from '@/components/Task.vue'
  export default {
    name: 'List',
    props: ['listData'],
    mounted: {},
    data() {
      return {

      }
    },
    methods: {
    },
    computed: {

    },

    components: {
      Task
    }
  }
</script>

<style scoped>
</style>