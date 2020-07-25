<template>
  <div>
    <div v-if="$auth.loggedIn">
      <v-container fluid>
        <v-row>
          <div v-if="loading">
            <v-progress-circular
              :width="3"
              indeterminate
            ></v-progress-circular>
            Loading...
          </div>
          <div
            v-else
            v-for="item in items"
            :key="item.id"
          >
            <v-col cols="12">
              <v-card
                class="mx-auto"
                max-width="400"
                hover
                rounded
                outlined
                ma-10
                pb-10
              >
                <div v-if="item.attachmentUrl">
                  <v-img
                    class="white--text align-end"
                    max-height="200px"
                    :src="item.attachmentUrl"
                  >
                  </v-img>
                </div>
                <div v-else>
                  <v-card
                    height="200px"
                  >
                  <v-icon centered xl>mdi-silverware-variant</v-icon>
                  </v-card>
                </div>
                <v-card-title>{{ item.caption }}</v-card-title>
                <v-card-subtitle>Posted on: {{ item.createdAt.replace(/T.*$/, "") }}</v-card-subtitle>
                <v-card-text>
                <span>Location: </span>
                <v-chip
                  class="ma-2"
                  color="deep-purple accent-4"
                  outlined
                >
                  <v-icon left>mdi-silverware-variant</v-icon>
                  <a :href="item.shopUrl">{{ item.name }}</a>
                </v-chip>
                <br />
                <span>Posted by: </span>
                <v-chip
                  class="ma-2"
                  color="deep-purple accent-4"
                  outlined
                >
                  <div v-if="$auth.user.sub === item.userId">
                    <v-avatar left>
                      <v-img
                        :src="$auth.user.picture"
                      >
                      </v-img>
                    </v-avatar>
                    You
                  </div>
                  <div v-else>
                    <v-icon left>mdi-account</v-icon>
                    A Reviewer
                  </div>
                </v-chip>
                </v-card-text>
                <div class="review">
                  <v-card-text class="review">{{ item.review }}</v-card-text>
                </div>
                <div v-if="$auth.user.sub === item.userId">
                  <v-bottom-navigation
                    class="d-flex justify-2 mb-0"
                    grow
                  >
                    <v-btn :to="{ path: 'updateReview', query: { reviewId: item.reviewId }}" nuxt>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="deleteFoodReview(item.reviewId)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-bottom-navigation>
                </div>
              </v-card>
            </v-col>
          </div>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <v-card>
        <v-card-text>
          <v-icon>mdi-info</v-icon>
          <dialog-message message="New user here? Login to check out good food reviews!" messageType="info" :alert="true" />
          <v-btn @click="$auth.loginWith('auth0')">login</v-btn>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getFoodReviews, deleteFoodReview } from '../middleware/api/foodReview';
import DialogMessage from '~/components/DialogMessage.vue'

export default {
  data() {
    return {
      num: 1,
      loading: true,
      items: [],
      selectedReviewId: '',
    }
  },
  mounted () {
    this.getFoodReviewItems()
  },
  components: {
    DialogMessage
  },
  methods: {
    async getFoodReviewItems() {
      if (this.$auth.loggedIn) {
        console.log(this.$auth.user)
        try {
          console.log(this.$auth.getToken('auth0'))
          this.items = await getFoodReviews(
            this.$auth.getToken('auth0')
          );
          this.loading = false;
        }
        catch(error) {
          console.log(error)
        }
      }
    },
    async deleteFoodReview(reviewId) {
      if (
        confirm('Are you sure you want to delete this item?') &&
        this.$auth.loggedIn
        ) {
        try {
          this.items = await deleteFoodReview(
            this.$auth.getToken('auth0'),
            reviewId
          );
          this.loading = false;
        }
        catch(error) {
          console.log(error)
        }
        finally {
          alert('Your review is successfully deleted.');
          this.$router.push('/')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.review {
  background-color: aliceblue;
  border-radius: 10px;
  margin: 4px;
  padding: 2px;
}
// .review::before {
//   font-family: 'Galada', cursive;
//   font-size: 24px;
//   content: '"';
// }
</style>
