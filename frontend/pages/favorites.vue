<template>
  <v-layout
    column
    justify-center
    align-center
  >
  <h1>My favorites</h1>
  <v-spacer></v-spacer>
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-left">
        <review-items favorite-only="true" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ReviewItems from '~/components/ReviewItems.vue'

export default {
  components: {
    ReviewItems
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin: 10vh;
  color: #263238;
}
</style>
