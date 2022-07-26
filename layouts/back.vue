<template>
  <v-app dark>
    <client-only>
      <layouts-sidebar-back />
    </client-only>
    <v-main>
      <v-container class="pa-12 my-0" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <client-only>
      <snackbar />
      <overlay />
      <b-t-t />
    </client-only>
  </v-app>
</template>

<script>
export default {
  name: 'Back'
}
</script>
