<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      dark
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      dark
      class="hd"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="$auth.loggedIn">
        <span>{{ $auth.user.name }}</span>
        <v-avatar>
          <v-img
            :src="$auth.user.picture"
          >
          </v-img>
        </v-avatar>
        <v-btn @click="$auth.logout()">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
      <div v-else> 
        <span>Guest</span>
        <v-icon>mdi-account</v-icon>
        <v-btn @click="$auth.loginWith('auth0')">
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main class="bg">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
      class="ft"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-pencil',
          title: 'Create a post',
          to: '/review'
        },
        {
          icon: 'mdi-heart',
          title: 'Favorites',
          to: '/favorites'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$pink: #EF9A9A;
$green: #AED581;

.bg {
  background-image: linear-gradient($pink, $green);
}
.hd {
  background-color: $pink;
}
.ft {
  background-color: $green;
}
</style>