<template>
  <v-container id="groups" fluid class="page pl-0 pt-0">
    <v-row class="mr-0">
      <v-col cols="12 py-0 innerpage-wrap pt-3">
        <v-card flat id="groups">
          <v-data-table
            :headers="headers"
            :items="groups"
            :options.sync="options"
            :server-items-length="totalGroups"
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
                            <v-text-field v-model="groupItem.name" label="Name"></v-text-field>
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
                              v-model="groupItem.permissions"
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
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editGroup(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteGroup(item)"
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
  import { FETCH_GROUPS, FETCH_PERMISSIONS } from './../../store/Actions.type'

  export default {
    name: 'groups',
    data () {
      return {
        dialog: false,
        search: '',
        groups: [],
        totalGroups: 0,
        options: {
          itemsPerPage: 10,
          page: 1
        },
        headers: [
          { text: 'Name', align: 'start', value: 'name', sortable: false },
          { text: 'Members', align: 'start', value: 'members_count', sortable: false },
          { text: 'Permission', value: 'permissions', sortable: false },
          { text: 'Date Created', value: 'created_at', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        groupIndex: -1,
        groupItem: {
          id: '',
          name: '',
          permissions: []
        },
        defaultItem: {
          id: '',
          name: '',
          permissions: []
        },
        permissions: []
      }
    },
    computed: {
      formTitle () {
        return this.groupIndex === -1 ? 'New Group' : 'Edit Group'
      },
      ...mapState({
        errors: state => state.Groups.errors,
        isLoading: state => state.Groups.isLoading
      })
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      search: debounce(function (val) {
        this.getGroups()
      }, 500),
      options: {
        handler () {
          this.getGroups()
        },
        deep: true
      }
    },

    methods: {
      getGroups () {
        const params = {
          'q': this.search,
          '_page': this.options.page,
          '_limit': this.options.itemsPerPage
        }

        // TEMP GET TOTAL DATA FROM JSON-SERVER
        this.$store.dispatch(FETCH_GROUPS, { params: {'q': this.search, '_limit': 1000} })
          .then((totalData) => {
            this.totalGroups = totalData.length

            // ACTUAL FETCH DATA
            this.$store.dispatch(FETCH_GROUPS, { params: params })
              .then((data) => {
                this.groups = data
              })
          })
      },

      getPermissions () {
        this.$store.dispatch(FETCH_PERMISSIONS, {}).then((data) => {
          this.permissions = data
        })
      },

      editGroup (groups) {
        this.groupIndex = this.groups.indexOf(groups)
        this.groupItem = Object.assign({}, groups)
        this.dialog = true
      },

      deleteGroup (groups) {
        const index = this.groups.indexOf(groups)
        confirm('Are you sure you want to delete this group?') && this.groups.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.groupItem = Object.assign({}, this.defaultItem)
          this.groupIndex = -1
        }, 300)
      },

      save () {
        if (this.groupIndex > -1) {
          Object.assign(this.groups[this.groupIndex], this.groupItem)
        } else {
          this.groups.push(this.groupItem)
        }
        this.close()
      }
    },

    mounted () {
      this.getPermissions()
      console.log('Groups Component mounted.')
    }
  }
</script>

<style scoped>
</style>
