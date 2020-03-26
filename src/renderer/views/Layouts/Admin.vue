<template>
  <v-app>

    <v-navigation-drawer
    v-model="primaryDrawer.model"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    app
    overflow
    >
      <sidebar-item :mini="primaryDrawer.mini"></sidebar-item>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn icon color="green darken-1" @click.stop="primaryDrawer.mini = !primaryDrawer.mini">
            <v-icon v-if="primaryDrawer.mini">mdi-arrow-right</v-icon>
            <v-icon v-else>mdi-arrow-left</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
      >
      <!-- <v-app-bar-nav-icon
        @click.stop="primaryDrawer.mini = !primaryDrawer.mini"
      /> -->
      <v-toolbar-title>LGD ERP</v-toolbar-title>
      <v-spacer />
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
      <v-spacer />

      <v-menu bottom left offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            icon
            >
            <v-avatar
              size="32px"
              item
              color="primary"
              >
              <span class="white--text">LN</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item  @click="''">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onLogout">
            <v-list-item-action>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-action>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-sheet
        class="overflow-y-auto"
        max-height="95vh"
        min-height="95vh"
        >
        <v-container 
          fluid
          class="pt-0">
          <v-row
            align="center"
            justify="center"
            class="mr-0"
            >
            <v-col cols="12 py-0">
              <transition name="slide" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
                <router-view></router-view>
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-content>

    <v-footer
      :inset="true"
      app
      >
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { LOGOUT } from './../../store/Actions.type'
  import SidebarItem from './../../components/SidebarItem'

  export default {
    name: 'admin',
    components: {
      SidebarItem
    },
    data: () => ({
      electron: require('electron'),
      primaryDrawer: {
        model: null,
        clipped: true,
        floating: false,
        mini: true
      }
    }),

    methods: {
      onLogout () {
        const self = this
        const { ipcRenderer } = self.electron

        self.$store.dispatch(LOGOUT)
        self.$router.push({ name: 'login' })
        ipcRenderer.send('checkAuth', false)
      }
    },

    created () {
      const self = this
      const { ipcRenderer } = self.electron

      console.log('Admin Created', self.isAuthenticated)
      self.$vuetify.theme.dark = true
      if (!self.isAuthenticated) {
        self.onLogout()
      } else {
        ipcRenderer.send('checkAuth', true)
      }
    },

    computed: {
      ...mapGetters(['isAuthenticated'])
    },

    mounted () {
      console.log('Admin Mounted')
    }
  }
</script>

<style>
</style>
