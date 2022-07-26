<template>
  <div class="grey lighten-5 py-16">
    <v-container :class="{ 'px-16': ['sm', 'xs'].includes($vuetify.breakpoint.name)}">
      <image-browse />
      <div class="d-flex">
        <h1 class="mb-8">
          ALL EVENTS
        </h1>
        <v-spacer />
        <v-btn
          x-large
          elevation="0"
          class="rounded-0"
          color="primary"
          @click="$bus.$emit('open-img-browse-form')"
        >
          <v-icon class="mr-2">
            mdi-face-recognition
          </v-icon>
          ค้นหาด้วยใบหน้า
        </v-btn>
      </div>
      <v-row>
        <v-col
          v-for="n in 20"
          :key="n"
          cols="12"
          md="4"
          lg="3"
          xl="2"
          sm="6"
        >
          <etcs-card-list :n="n" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: this.$t('EVENTS'),
      rate: null
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.pageName,
      urlPath: this.$route.fullPath
    })
  }
}
</script>
