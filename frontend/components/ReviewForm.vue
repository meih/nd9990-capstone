<template>
  <div>
    <div v-if="$auth.loggedIn">
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="caption"
            label="Caption"
            placeholder="Fresh, delicious sushi to go!"
            v-model="newFoodReviewRequest.caption"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field
            ref="name"
            label="Name of the restaurant, shop, food vendor, etc."
            placeholder="Sushi Saiko"
            v-model="newFoodReviewRequest.name"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-textarea
            outlined
            name="review"
            label="Your review"
            placeholder=""
            v-model="newFoodReviewRequest.review"
            required
          ></v-textarea>
        </v-card-text>
        <v-card-text>
          <div v-if="imageUrl">
            <v-img :src="imageUrl" max-height="200px"></v-img>
          </div>
          <v-file-input
            label="Photo of the food (Optional)"
            filled
            prepend-icon="mdi-camera"
            @change="getImageUrl()"
            v-model="selectedImage"
          ></v-file-input>
        </v-card-text>
        <v-card-text>
          <v-text-field
            ref="url"
            label="URL (Optional)"
            placeholder="https://"
            v-model="newFoodReviewRequest.shopUrl"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <div v-if="hasValidReviewId">
            <v-btn @click="updateReview">Submit</v-btn>
          </div>
          <div v-else>
            <v-btn @click="postReview">Submit</v-btn>
          </div>
        </v-card-text>
        <dialog-message :message="message" :messageType="messageType" :alert="alert" />
      </v-card>
    </div>
    <div v-else>
      <v-card>
        <v-card-text>
          <v-icon>mdi-info</v-icon>
          <dialog-message message="Login to post your review!" messageType="info" :alert="true" />
          <v-btn @click="$auth.loginWith('auth0')">login</v-btn>
        </v-card-text>
      </v-card>
    </div>
  </div>

</template>

<script>
import { getFoodReview, getFoodReviewById, createFoodReview, patchFoodReview, getUploadUrl, uploadFile } from '../middleware/api/foodReview';
import { createFoodReviewRequest } from '../middleware/types/CreateFoodReviewRequest'
import DialogTest from '~/components/Dialog.vue'
import DialogMessage from '~/components/DialogMessage.vue'

export default {
  data() {
    return {
      loading: true,
      items: [],
      dialog: false,
      message: 'Your review is successfully posted!',
      messageType: 'success',
      alert: false,
      newFoodReviewRequest: {
        caption: '',
        name: '',
        review: '',
        shopUrl: '',
        attachmentUrl: ''
      },
      uploadUrl: '',
      imageUrl: '',
      selectedImage: null,
      hasValidReviewId: false
    }
  },
  mounted() {
    if (this.reviewId) {
      this.getExistingReview()
    }
  },
  props: [ 'reviewId' ],
  components: {
    DialogTest,
    DialogMessage
  },
  methods: {
    showAlert() {
      this.dialog = true
    },
    async postReview() {
      if (this.$auth.loggedIn) {
        try {
          if (this.uploadUrl && this.selectedImage) {
            console.log("uploadUrl: " + this.uploadUrl)
            await uploadFile(this.uploadUrl, this.selectedImage)
            this.newFoodReviewRequest.attachmentUrl = this.uploadUrl.replace(/\?.*$/,"");
          }
          this.items = await createFoodReview(
            this.$auth.getToken('auth0'),
            this.newFoodReviewRequest
          );
          alert('Your review is successfully posted!');
          this.message = 'Your review is successfully posted!'
          this.alert = true;
        }
        catch(error) {
          console.log(error)
          this.message = 'An error occurred. Please try again.'
        }
        finally {
          this.loading = false;
          this.$router.push('/')
        }
      }
    },
    async updateReview() {
      if (this.$auth.loggedIn) {
        try {
          if (this.uploadUrl && this.selectedImage) {
            console.log("uploadUrl: " + this.uploadUrl)
            await uploadFile(this.uploadUrl, this.selectedImage)
            this.newFoodReviewRequest.attachmentUrl = this.uploadUrl.replace(/\?.*$/,"");
          }
          this.items = await patchFoodReview(
            this.$auth.getToken('auth0'),
            this.reviewId,
            this.newFoodReviewRequest
          );
          alert('Your review is successfully updated!');
          this.message = 'Your review is successfully updated!'
          this.alert = true;
        }
        catch(error) {
          console.log(error)
          this.message = 'An error occurred. Please try again.'
        }
        finally {
          this.loading = false;
          this.$router.push('/')
        }
      }
    },
    async getExistingReview() {
      if (this.$auth.loggedIn) {
        try {
          this.items = await getFoodReviewById(
            this.$auth.getToken('auth0'),
            this.reviewId
          );
          console.log(this.items);
          if (this.items.length > 0) {
            this.newFoodReviewRequest.caption = this.items[0].caption
            this.newFoodReviewRequest.name = this.items[0].name
            this.newFoodReviewRequest.review = this.items[0].review
            this.newFoodReviewRequest.shopUrl = this.items[0].shopUrl
            this.newFoodReviewRequest.attachmentUrl = this.items[0].attachmentUrl
            this.imageUrl = this.items[0].attachmentUrl
            this.hasValidReviewId = true;
          }
        }
        catch(error) {
          console.log(error)
        }
        finally {
          this.loading = false;
        }
      }
    },
    async getImageUrl() {
      if (this.$auth.loggedIn) {
        try {
          this.uploadUrl = await getUploadUrl(
            this.$auth.getToken('auth0'),
            this.reviewId
          );
          console.log("uploadUrl: " + this.uploadUrl)
        }
        catch(error) {
          console.log(error)
        }

      }
    },
  },
}
</script>
