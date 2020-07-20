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
        hover="true"
        rounded="true"
        outlined="true"
        mb-10
        pb-5
      >
        <div v-if="item.attachmentUrl">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="item.attachmentUrl"
          >
          {{ item.name }}
          </v-img>
        </div>
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-subtitle>{{ item.dueDate }}</v-card-subtitle>
      </v-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { getTodos } from '../middleware/api/todo';
  
  export default {
    data() {
      return {
        num: 1,
        loading: true,
        items: []
      }
    },
    mounted () {
      this.setTodoItems()
    },
    methods: {
      async setTodoItems() {
        if (this.$auth.loggedIn) {
          try {
            console.log(this.$auth.getToken('auth0'))
            this.items = await getTodos(this.$auth.getToken('auth0'));
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
</style>
