<template>
  <v-app dark>
    <nuxt />
    <client-only>
      <snackbar />
      <overlay />
      <b-t-t />
    </client-only>
  </v-app>
</template>

<script>
export default {
  name: 'BlankLayout'
}
</script>
