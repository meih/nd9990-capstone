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

          <v-btn @click="showAlert">Alert</v-btn>
        </v-card-text>
        <dialog-test />
        <dialog-message :message="message" :messageType="messageType" :alert="alert" />
        <v-btn
          color="primary"
          @click="alert = !alert"
        >
          Toggle
        </v-btn>
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
      num: 1,
      loading: true,
      items: [],
      caption: '',
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
          alert('Your review is posted!');
        }
        catch(error) {
          console.log(error)
          this.message = 'An error occurred. Please try again.'
        }
        finally {
          this.loading = false;
          this.alert = true;
          this.message = 'Your review is successfully posted!'
          alert('Your review is successfully posted!');
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
        }
        catch(error) {
          console.log(error)
          this.message = 'An error occurred. Please try again.'
        }
        finally {
          this.loading = false;
          this.alert = true;
          this.message = 'Your review is successfully posted!'
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
            this.hasValidReviewId = true;
          }
        }
        catch(error) {
          console.log(error)
          this.message = 'An error occurred. Please try again.'
        }
        finally {
          this.loading = false;
          this.alert = true;
          this.message = 'Your review is successfully posted!'
        }
      }
    },
    async getImageUrl() {
      if (this.$auth.loggedIn) {
        try {
          console.log(this.$auth.getToken('auth0'))
          this.uploadUrl = await getUploadUrl(
            this.$auth.getToken('auth0'),
            this.reviewId
          );
        }
        catch(error) {
          console.log(error)
          this.message = 'An error occurred. Please try again.'
        }
        finally {
          console.log("uploadUrl: " + this.uploadUrl)
          this.loading = false;
          this.alert = true;
//          this.message = 'Your image is successfully posted!'
        }


      }
    },
  },
}
</script>