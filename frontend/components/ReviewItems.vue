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
                max-width="360px"
                color="brown lighten-5"
                rounded
                ma-10
                pa-10
              >
                <v-card dark color="brown darken-4">
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
                      class="image"
                    >
                    <v-icon centered xl12>mdi-silverware-variant</v-icon>
                    </v-card>
                  </div>
                  <v-card-title>{{ item.caption }}</v-card-title>
                  <v-card-subtitle>
                    <div v-if="item.createdAt">
                      <v-icon left>mdi-clock</v-icon>
                      Posted on: {{ item.createdAt.replace(/T.*$/, "") }}
                    </div>
                  </v-card-subtitle>
                </v-card>
                <v-card-text>
                <span>Location: </span>
                <v-chip
                  class="ma-2"
                  color="deep-purple darken-4"
                  outlined
                  dark
                  @click="openLink(item.shopUrl)"
                >
                  <v-icon left>mdi-silverware-variant</v-icon>
                  {{ item.name }}
                </v-chip>
                <br />
                <span>Posted by: </span>
                <v-chip
                  class="ma-2"
                  color="deep-purple darken-4"
                  outlined
                >
                  <div v-if="$auth.user.sub === item.userId">
                    <v-avatar left>
                      <v-img
                        :src="$auth.user.picture"
                      >
                      </v-img>
                    </v-avatar>
                    Me
                  </div>
                  <div v-else>
                    <v-icon left>mdi-account</v-icon>
                    A Reviewer
                  </div>
                </v-chip>
                </v-card-text>
                <div class="review">
                  <v-card-text>{{ item.review }}</v-card-text>
                </div>
                <div v-if="$auth.user.sub === item.userId">
                  <v-bottom-navigation
                    class="d-flex justify-3 mb-0"
                    grow
                  >
                    <v-btn :to="{ path: 'review', query: { reviewId: item.reviewId }}" nuxt>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="toggleFavorite(item.reviewId)">
                      <div v-if="favoriteItems.find(s => s === item.reviewId)">
                        <v-icon color="pink">mdi-heart</v-icon>
                      </div>
                      <div v-else>
                        <v-icon>mdi-heart-outline</v-icon>
                      </div>
                    </v-btn>
                    <v-btn @click="deleteFoodReview(item.reviewId)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-bottom-navigation>
                </div>
                <div v-else>
                  <v-bottom-navigation
                    class="d-flex justify-1 mb-0"
                    grow
                  >
                    <v-btn @click="toggleFavorite(item.reviewId)">
                      <div v-if="favoriteItems.find(s => s === item.reviewId)">
                        <v-icon color="pink">mdi-heart</v-icon>
                      </div>
                      <div v-else>
                        <v-icon>mdi-heart-outline</v-icon>
                      </div>
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
import { getFavoriteReviews, createFavoriteReview, deleteFavoriteReview } from '../middleware/api/favoriteReview';
import DialogMessage from '~/components/DialogMessage.vue'

export default {
  data() {
    return {
      loading: true,
      items: [],
      favoriteItems: []
    }
  },
  mounted () {
    this.getFoodReviewItems(),
    this.getFavoriteReviewItems()
  },
  components: {
    DialogMessage
  },
  methods: {
    async getFoodReviewItems() {
      if (this.$auth.loggedIn) {
        try {
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
          alert('Your review is successfully deleted.');
        }
        catch(error) {
          console.log(error)
        }
        finally {
          this.getFoodReviewItems()
        }
      }
    },
    async getFavoriteReviewItems() {
      if (this.$auth.loggedIn) {
        try {
          this.favoriteItems = await getFavoriteReviews(
            this.$auth.getToken('auth0')
          );
          console.log(this.favoriteItems)
        }
        catch(error) {          
          console.log(error)
        }
      }
    },
    async createFavoriteReview(reviewId) {
      if (this.$auth.loggedIn) {
        try {
          await createFavoriteReview(
            this.$auth.getToken('auth0'),
            reviewId
          );
        }
        catch(error) {
          console.log(error)
        }
      }
    },
    async deleteFavoriteReview(reviewId) {
      if (this.$auth.loggedIn) {
        try {
          await deleteFavoriteReview(
            this.$auth.getToken('auth0'),
            reviewId
          );
        }
        catch(error) {
          console.log(error)
        }
      }
    },
    async toggleFavorite(reviewId) {
      const index = this.favoriteItems.findIndex(item => item === reviewId) 
      if (index >= 0) {
        await this.deleteFavoriteReview(reviewId)
        this.favoriteItems.splice(index, 1)
      }
      else {
        await this.createFavoriteReview(reviewId)
        this.favoriteItems.push(reviewId)
      }
      console.log(this.favoriteItems)
    },
    openLink(url) {
      window.open(url)
    }
  },
}
</script>

<style lang="scss" scoped>
.review {
  background-color: aliceblue;
  border-radius: 10px;
  margin: 8px;
  padding: 4px;
}
.image {
  background: linear-gradient(45deg, red, blue);
}
</style>
