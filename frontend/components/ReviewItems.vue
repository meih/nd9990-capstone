<template>
  <div>
    <div v-if="$auth.loggedIn">
      <div v-if="loading">Loading...</div>
      <div
        v-else
        v-for="item in items"
        :key="item.id"
      >
        <v-card
          class="mx-auto"
          max-width="400"
          hover
          rounded
          outlined
          mb-10
          pb-5
        >
          <div v-if="item.attachmentUrl">
            <v-img
              class="white--text align-end"
              height="200px"
              :src="item.attachmentUrl"
            >
            </v-img>
          </div>
          <div v-else
            height="200px"
          >

          </div>
          <v-card-title>{{ item.caption }}</v-card-title>
          <v-card-subtitle>
            <v-chip
              class="ma-2"
              color="deep-purple accent-4"
              outlined
            >
              <v-icon left>mdi-silverware-variant</v-icon>
              {{ item.name }}
            </v-chip>
          </v-card-subtitle>
          <v-chip
            class="ma-2"
            color="deep-purple accent-4"
            outlined
          >
            <div v-if="$auth.userId === item.userId">
              <v-avatar>
                <v-img
                  :src="$auth.user.picture"
                >
                </v-img>
              </v-avatar>
            </div>
            <div v-else>
              <v-icon left>mdi-account</v-icon>
            {{ $auth.user.name }}
            </div>
          </v-chip>
          <div class="review">
            <v-card-text>{{ item.review }}</v-card-text>
          </div>
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
        </v-card>
      </div>
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
import { getTodos, createTodo } from '../middleware/api/todo';
import { getFoodReviews, deleteFoodReview } from '../middleware/api/foodReview';
import { createTodoRequest } from '../middleware/types/CreateTodoRequest'
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
      if (this.$auth.loggedIn) {
        try {
          console.log(this.$auth.getToken('auth0'))
          console.log(reviewId)
          this.items = await deleteFoodReview(
            this.$auth.getToken('auth0'),
//            this.selectedReviewId
            reviewId
          );
          this.loading = false;
        }
        catch(error) {
          console.log(error)
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
