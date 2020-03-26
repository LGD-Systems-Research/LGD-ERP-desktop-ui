<template>
  <v-card flat id="announcements" class="page">
    Announcements
  </v-card>
</template>

<script>
  export default {
    name: 'announcements',
    data () {
      return {
        test: 'test'
      }
    },
    mounted () {
      console.log('Announcements Component mounted.')
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
