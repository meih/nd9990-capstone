<template>
  <v-layout
    column
    justify-center
    align-center
  >
  <h1>Got good food to go?  Let the world know!</h1>
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
import TodoItems from '~/components/TodoItems.vue'
import ReviewItems from '~/components/ReviewItems.vue'

export default {
  components: {
    TodoItems,
    ReviewItems
  }
}
</script>

<style lang="scss" scoped>
h1 { padding: 100px; }
body {
  background-image: linear-gradient(#123456, #654321);
}
</style>
