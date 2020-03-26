<template>
  <v-container id="users" fluid class="page pl-0 pt-0">
    <v-row class="mr-0">
      <v-col cols="12 py-0 innerpage-wrap pt-3">
        <v-card flat id="users">
          <v-data-table
            :headers="headers"
            :items="users"
            :options.sync="options"
            :server-items-length="totalUsers"
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
                            <v-text-field v-model="userItem.name" label="Name"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field v-model="userItem.email" label="Email"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field type="password" v-model="userItem.password" label="Password"></v-text-field>
                          </v-col>
                          <v-col cols="6">
                            <v-text-field type="password" v-model="userItem.confirmPassword" label="Confirm Password"></v-text-field>
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
                          <v-col cols="6">
                            <v-select
                              v-model="userItem.permissions"
                              :items="permissions"
                              item-text="title"
                              item-value="id"
                              attach
                              chips
                              placeholder="Select Permissions"
                              label="Permissions"
                              multiple
                              deletable-chips
                              append-icon="mdi-plus"
                            ></v-select>
                          </v-col>
                          <v-col cols="12">
                            <h1 class="title"><v-icon>mdi-account-multiple</v-icon> Groups</h1>
                            <v-divider></v-divider>
                          </v-col>
                          <v-col cols="12">
                            <!-- <v-select
                              v-model="userItem.groups"
                              :items="groups"
                              item-text="name"
                              item-value="id"
                              attach
                              chips
                              placeholder="Select Groups"
                              label="Groups"
                              multiple
                              deletable-chips
                              append-icon="mdi-plus"
                            ></v-select> -->
                            <v-switch v-for="(g,k) in groups" :key="k" :label="g.name" v-model="userItem.groups[g.id]"></v-switch>
                            <v-card v-for="(g,k) in groups" :key="k" outlined color="grey">
                              <!-- {{g}} -->
                              <!-- {{k}} -->
                              {{userItem.groups[g.id]}}
                            </v-card>
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
            <template v-slot:item.permissions="{ item }">
              <v-chip v-for="group in item.permissions" :key="group.id" outlined color="grey">
                {{permissions.title}}
              </v-chip>
            </template>
            <template v-slot:item.groups="{ item }">
              <v-chip v-for="group in item.groups" :key="group.id" outlined color="grey">
                {{group.name}}
              </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editUser(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteUser(item)"
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
  import { FETCH_PERMISSIONS, FETCH_GROUPS, FETCH_USERS } from './../../store/Actions.type'

  export default {
    name: 'users',
    data () {
      return {
        dialog: false,
        search: '',
        users: [],
        totalUsers: 0,
        options: {
          itemsPerPage: 10,
          page: 1
        },
        headers: [
          { text: 'Name', align: 'start', value: 'name', sortable: false },
          { text: 'Email', align: 'start', value: 'email', sortable: false },
          { text: 'Permission', value: 'permissions', sortable: false },
          { text: 'Groups', value: 'groups', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        userIndex: -1,
        userItem: {
          id: '',
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          permissions: [],
          groups: []
        },
        defaultItem: {
          id: '',
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          permissions: [],
          groups: []
        },
        permissions: [],
        groups: []
      }
    },

    computed: {
      formTitle () {
        return this.userIndex === -1 ? 'New User' : 'Edit User'
      },
      ...mapState({
        errors: state => state.Users.errors,
        isLoading: state => state.Users.isLoading
      })
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      search: debounce(function (val) {
        this.getUsers()
      }, 500),
      options: {
        handler () {
          this.getUsers()
        },
        deep: true
      }
    },

    methods: {
      getUsers () {
        const params = {
          'q': this.search,
          '_page': this.options.page,
          '_limit': this.options.itemsPerPage
        }

        // TEMP GET TOTAL DATA FROM JSON-SERVER
        this.$store.dispatch(FETCH_USERS, { params: {'q': this.search, '_limit': 1000} })
          .then((totalData) => {
            this.totalUsers = totalData.length

            // ACTUAL FETCH DATA
            this.$store.dispatch(FETCH_USERS, { params: params })
              .then((data) => {
                this.users = data
              })
          })
      },

      getPermissions () {
        this.$store.dispatch(FETCH_PERMISSIONS, {}).then((data) => {
          this.permissions = data
        })
      },

      getGroups () {
        this.$store.dispatch(FETCH_GROUPS, {}).then((data) => {
          this.groups = data
          this.groups.forEach(element => {
            element['selected'] = false
          })
        })
      },

      editUser (user) {
        this.userIndex = this.users.indexOf(user)
        this.userItem = Object.assign({}, user)
        this.dialog = true
      },

      deleteUser (user) {
        const index = this.users.indexOf(user)
        confirm('Are you sure you want to delete this user?') && this.users.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.userItem = Object.assign({}, this.defaultItem)
          this.userIndex = -1
        }, 300)
      },

      save () {
        if (this.userIndex > -1) {
          Object.assign(this.users[this.userIndex], this.userItem)
        } else {
          this.users.push(this.userItem)
        }
        this.close()
      }
    },

    mounted () {
      // this.getUsers()
      this.getPermissions()
      this.getGroups()
      console.log('Users Component mounted.')
    }
  }
</script>

<style scoped>
</style>
