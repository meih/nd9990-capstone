<template>
  <v-layout
    column
    justify-center
    align-center
  >
  <h1>Got good food to go?<br>Let the world know!</h1>
  <v-spacer></v-spacer>
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-left">
        <review-items />
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
  margin: 100px;
  color: #263238;
  background: linear-gradient(
    to bottom,
    transparent 80%,
    #FFC107 81%,
    transparent 95%,
  )
}
</style>
