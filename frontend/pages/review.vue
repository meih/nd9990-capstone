<template>
  <v-layout
    column
  >
    <h1>{{ headText }} post:</h1>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <ReviewForm :reviewId="reviewId" />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import ReviewForm from '~/components/ReviewForm.vue'

export default {
  data() {
    return {
      reviewId: this.$route.query.reviewId,
      headText: this.$route.query.reviewId ? 'Update my' : 'Create a'
    }
  },
  components: {
    ReviewForm
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Galada&display=swap');

h1 {
  font-family: 'Galada', cursive;
  font-size: 8vh;
  color: #263238;
}
</style>
