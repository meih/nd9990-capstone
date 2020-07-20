<template>
  <v-layout
    column
    justify-center
    align-center
  >
  <h1>Got good food to go?  Let's share it!</h1>
  <v-spacer></v-spacer>
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <todo-items />
      </div>

      <v-card>
        <v-card-title class="headline">
          New user here?
        </v-card-title>
        <v-card-text></v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            nuxt
            to="/inspire"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import TodoItems from '~/components/TodoItems.vue'

export default {
  components: {
    TodoItems
  }
}
</script>

<style lang="scss" scoped>
h1 { padding: 100px; }
body {
  background-image: linear-gradient(#123456, #654321);
}
</style>
