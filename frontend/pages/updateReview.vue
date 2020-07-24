<template>
  <v-layout
    column
  >
    <h1>Update post:</h1>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <ReviewForm />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import ReviewForm from '~/components/ReviewForm.vue'

export default {
  components: {
    ReviewForm
  }
}
</script>

<style lang="scss" scoped>
/*
div {
  background-image: url('../assets/img/background.jpeg');
}
*/
</style>
