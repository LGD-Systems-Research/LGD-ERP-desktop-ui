<template>
  <v-card flat id="dashboard" class="page">
    Dashboard
  </v-card>
</template>

<script>
  export default {
    name: 'dashboard',
    data () {
      return {
        test: 'test'
      }
    },
    mounted () {
      console.log('Dashboard Component mounted.')
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
