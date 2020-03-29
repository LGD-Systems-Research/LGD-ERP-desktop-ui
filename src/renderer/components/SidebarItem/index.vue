<template>
  <div>
    <v-list dense>
      <template v-for="item in items">
        <v-row
          v-if="item.heading"
          :key="item.heading"
          align="center"
          >
          <v-col cols="8" v-if="!mini">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
          <v-col cols="12" v-else>
            <v-row
              align="center"
              justify="center"
              >
              <v-col cols="10">
                <v-divider />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.icon"
          :append-icon="item['icon-alt']"
          >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
            >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :key="item.text"
          :to="item.link"
          >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      mini: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        items: [
          { icon: 'mdi-view-dashboard', text: 'Home', link: '/' },
          { icon: 'mdi-timetable', text: 'Activities', link: 'activities' },
          { icon: 'mdi-bullhorn', text: 'Announcements', link: 'announcements' },
          { icon: 'mdi-account',
            'icon-alt': 'mdi-chevron-down',
            text: 'User Management',
            model: false,
            children: [
              { icon: 'mdi-account-multiple', text: 'Users', link: 'users' },
              { icon: 'mdi-account-network', text: 'Groups', link: 'groups' },
              { icon: 'mdi-account-key', text: 'Permissions', link: 'permissions' }
            ]
          },
          {
            heading: 'MORE SETTINGS'
          },
          { icon: 'mdi-cogs', text: 'System Settings', link: 'system-settings' },
          { icon: 'mdi-history', text: 'System Logs', link: 'system-logs' }
        ]
      }
    },
    mounted () {
      console.log('NavDrawer Component mounted.')
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
