<template>
  <v-container id="permissions" fluid class="page pl-0 pt-0">
    <v-row class="mr-0">
      <v-col cols="12 py-0 innerpage-wrap pt-3">
        <v-card flat id="permissions">
          <v-data-table
            :headers="headers"
            :items="permissions"
            :options.sync="options"
            :server-items-length="totalPermissions"
            :loading="isLoading"
            sort-by="name"
            >
            <template v-slot:top>
              <v-toolbar flat class="no-drag">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <!-- Dialog -->
                <v-dialog v-model="dialog" max-width="700px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on" depressed>
                      <v-icon dark left>mdi-pen</v-icon> Add
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="6">
                            <v-text-field v-model="permissionItem.title" label="Title"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-textarea
                              v-model="permissionItem.description"
                              label="Description"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <h1 class="title"><v-icon>mdi-account-key</v-icon> Special Permissions</h1>
                            <v-alert color="info" icon="mdi-information-outline" :value="true">
                              Special Permissions are permission exclusive to this user. Permissions defined here
                              are more superior than any permission that is in his group. So if the User belongs to a group that has permission to "create something"
                              but then is denied to "create something" here, the user will be denied on that permission. In short, special permissions
                              has high priority that group permissions.
                            </v-alert>
                            <v-divider></v-divider>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn color="primary" dark class="mb-2 ml-2" depressed>
                  <v-icon dark left>mdi-download</v-icon> Export
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editPermission(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deletePermission(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              <v-alert
                outlined
                type="warning"
                prominent
                border="left"
                >
                Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit hendrerit rutrum. Nullam vel sem. Pellentesque dapibus hendrerit tortor.
              </v-alert>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import debounce from './../../helpers/debounce'
  import { mapState } from 'vuex'
  import { FETCH_PERMISSIONS } from './../../store/Actions.type'

  export default {
    name: 'permissions',
    data () {
      return {
        dialog: false,
        search: '',
        permissions: [],
        totalPermissions: 0,
        options: {
          itemsPerPage: 10,
          page: 1
        },
        headers: [
          { text: 'Title', align: 'start', value: 'title', sortable: false },
          { text: 'Key', align: 'start', value: 'key', sortable: false },
          { text: 'description', value: 'description', sortable: false },
          { text: 'Date Created', value: 'created_at', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        permissionIndex: -1,
        permissionItem: {
          id: '',
          title: '',
          description: '',
          key: ''
        },
        defaultItem: {
          id: '',
          title: '',
          description: '',
          key: ''
        }
      }
    },
    computed: {
      formTitle () {
        return this.permissionIndex === -1 ? 'New Group' : 'Edit Group'
      },
      ...mapState({
        errors: state => state.Permissions.errors,
        isLoading: state => state.Permissions.isLoading
      })
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      search: debounce(function (val) {
        this.getPermissions()
      }, 500),
      options: {
        handler () {
          this.getPermissions()
        },
        deep: true
      }
    },

    methods: {
      getPermissions () {
        const params = {
          'q': this.search,
          '_page': this.options.page,
          '_limit': this.options.itemsPerPage
        }

        // TEMP GET TOTAL DATA FROM JSON-SERVER
        this.$store.dispatch(FETCH_PERMISSIONS, { params: {'q': this.search, '_limit': 1000} })
          .then((totalData) => {
            this.totalPermissions = totalData.length

            // ACTUAL FETCH DATA
            this.$store.dispatch(FETCH_PERMISSIONS, { params: params })
              .then((data) => {
                this.permissions = data
              })
          })
      },

      editPermission (Permissions) {
        this.permissionIndex = this.permissions.indexOf(Permissions)
        this.permissionItem = Object.assign({}, Permissions)
        this.dialog = true
      },

      deletePermission (Permissions) {
        const index = this.permissions.indexOf(Permissions)
        confirm('Are you sure you want to delete this permission?') && this.permissions.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.permissionItem = Object.assign({}, this.defaultItem)
          this.permissionIndex = -1
        }, 300)
      },

      save () {
        if (this.permissionIndex > -1) {
          Object.assign(this.permissions[this.permissionIndex], this.permissionItem)
        } else {
          this.permissions.push(this.permissionItem)
        }
        this.close()
      }
    },

    mounted () {
      console.log('Permissions Component mounted.')
    }
  }
</script>

<style scoped>
</style>
