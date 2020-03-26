<template>
  <v-container id=activities fluid class="page pl-0 pt-0">
    <v-row class="mr-0">
      <v-col cols="12 pa-0 innerpage-wrap">
        <v-card flat id=activities>
          <v-timeline dense clipped>
            <v-timeline-item
              fill-dot
              class="white--text mb-5"
              color="orange"
              large
              >
              <template v-slot:icon>
                <span>LN</span>
              </template>
              <h1 class="title">Activities</h1>
            </v-timeline-item>
            
            <v-slide-x-transition
              group
              >
              <v-timeline-item
                v-for="event in activities"
                :key="event.id"
                class="mb-4"
                color="pink"
                small
              >
                <v-row justify="space-between">
                  <v-col cols="7" v-text="event.details"></v-col>
                  <v-col class="text-right" cols="5" v-text="event.ago"></v-col>
                </v-row>
              </v-timeline-item>
            </v-slide-x-transition>

            <v-timeline-item
              class="mb-6"
              hide-dot
              >
              <span>TODAY</span>
            </v-timeline-item>

            <v-timeline-item
              class="mb-4"
              color="grey"
              icon-color="grey lighten-2"
              small
              >
              <v-row justify="space-between">
                <v-col cols="7">This order was archived.</v-col>
                <v-col class="text-right" cols="5">15:26 EDT</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
              class="mb-4"
              small
            >
              <v-row justify="space-between">
                <v-col cols="7">
                  <v-chip
                    class="white--text ml-0"
                    color="purple"
                    label
                    small
                  >
                    APP
                  </v-chip>
                  Digital Downloads fulfilled 1 item.
                </v-col>
                <v-col class="text-right" cols="5">15:25 EDT</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
              class="mb-4"
              color="grey"
              small
            >
              <v-row justify="space-between">
                <v-col cols="7">
                  Order confirmation email was sent to John Leider (john@vuetifyjs.com).
                </v-col>
                <v-col class="text-right" cols="5">15:25 EDT</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
              class="mb-4"
              hide-dot
            >
              <v-btn
                class="mx-0"
                color="white"
              >
                Resend Email
              </v-btn>
            </v-timeline-item>

            <v-timeline-item
              class="mb-4"
              color="grey"
              small
            >
              <v-row justify="space-between">
                <v-col cols="7">
                  A $15.00 USD payment was processed on PayPal Express Checkout
                </v-col>
                <v-col class="text-right" cols="5">15:25 EDT</v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
              color="grey"
              small
            >
              <v-row justify="space-between">
                <v-col cols="7">
                  John Leider placed this order on Online Store (checkout #1937432132572).
                </v-col>
                <v-col class="text-right" cols="5">15:25 EDT</v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import { FETCH_ACTIVITIES } from './../../store/Actions.type'

  export default {
    name: 'activities',
    data () {
      return {
        activities: []
      }
    },
    computed: {
      ...mapState({
        errors: state => state.Activities.errors,
        isLoading: state => state.Activities.isLoading
      })
    },
    methods: {
      getActivities () {
        this.$store.dispatch(FETCH_ACTIVITIES, {}).then((data) => {
          this.activities = data
        })
      }
    },
    mounted () {
      this.getActivities()
      console.log('Activities Component mounted.', this.activities)
    }
  }
</script>

<style scoped>
</style>
