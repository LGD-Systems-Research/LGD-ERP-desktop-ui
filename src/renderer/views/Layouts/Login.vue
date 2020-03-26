<template>
  <v-app>
    <v-system-bar window dark>
      <v-spacer></v-spacer>
      <v-icon>mdi-minus</v-icon>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
    <v-card class="elevation-12" 
      :loading="isLoading"
      :disabled="isLoading"
      flat 
      tile
      dark
      height="500">
      
      <v-img src="static/lgd-sr-nobg.png" />
      <v-card-text>
        <div class="d-flex">
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
        </div>
        
        <v-form>
          <v-text-field
            v-model="email"
            filled
            label="Username"
            clearable
          ></v-text-field>

          <v-text-field
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            filled
            label="Password"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn block="" @click="onSubmit">Login</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { LOGIN } from './../../store/Actions.type'

  export default {
    name: 'LgdLogin',
    data () {
      return {
        electron: require('electron'),
        showPassword: false,
        email: '',
        password: '',
        remember: 1
      }
    },
    mounted () {
      this.checkAuth()
    },
    methods: {
      onSubmit () {
        let payload = {
          email: this.email,
          password: this.password,
          remember: this.remember
        }
        console.log('LOGIN:UI', LOGIN, payload)
        this.$store.dispatch(LOGIN, { payload })

        setTimeout(() => {
          this.checkAuth()
        }, 3100)

        // this.$store
        //   .dispatch(LOGIN, { payload })
        //   .then(() => this.$router.push({ name: 'home' }))
      },

      checkAuth () {
        const self = this
        const { ipcRenderer } = self.electron

        if (self.isAuthenticated) {
          self.$router.push({ name: 'dashboard' })
          ipcRenderer.send('checkAuth', true)
        }
      }
    },
    computed: {
      ...mapState({
        errors: state => state.Auth.errors,
        isLoading: state => state.Auth.isLoading
      }),
      ...mapGetters(['isAuthenticated'])
    }
  }
</script>
<style scoped>
v-card {
  height: 100%;
}
</style>

