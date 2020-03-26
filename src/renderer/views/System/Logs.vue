<template>
  <v-container id=logs fluid class="page pl-0 pt-0">
    <v-row class="mr-0">
      <v-col cols="12 pa-0 innerpage-wrap">
        <v-card flat id=logs>
          
          <v-data-table 
            dense 
            :headers="headers" 
            :options.sync="options"
            :items="logs" 
            :single-expand="true"
            :expanded.sync="expanded"
            item-key="id" 
            show-expand
            class="elevation-1">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>System logs</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">{{ item.stacktrace }}</td>
            </template>
          </v-data-table>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { FETCH_LOGS } from './../../store/Actions.type'

  export default {
    name: 'logs',
    data () {
      return {
        options: {
          itemsPerPage: 15,
          page: 1
        },
        expanded: [],
        logs: [],
        headers: [
          {
            text: 'Component', value: 'component', sortable: false, align: 'start'
          },
          { text: 'Context', value: 'context', sortable: false },
          { text: 'Payload', value: 'payload', sortable: false },
          { text: 'Date', value: 'created_at', sortable: false }
        ]
      }
    },
    computed: {
      ...mapState({
        errors: state => state.Logs.errors,
        isLoading: state => state.Logs.isLoading
      })
    },
    methods: {
      getlogs () {
        this.$store.dispatch(FETCH_LOGS, {}).then((data) => {
          this.logs = data
        })
      }
    },
    mounted () {
      this.getlogs()
      console.log('Logs Component mounted.', this.logs)
    }
  }
</script>

<style scoped>
</style>
