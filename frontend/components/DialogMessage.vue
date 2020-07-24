<template>
  <v-alert
    dense
    text
    transition="slide-y-transition"
    :type="messageType"
    :value="alert"
  >
  {{ message }}
  </v-alert>
</template>

<script>
export default {
  props: [ 'message', 'messageType', 'alert' ]
}
</script>
