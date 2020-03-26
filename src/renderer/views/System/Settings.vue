<template>
  <v-card flat id="settings" class="page">
    Settings
  </v-card>
</template>

<script>
  export default {
    name: 'settings',
    data () {
      return {
        test: 'test'
      }
    },
    mounted () {
      console.log('Settings Component mounted.')
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
