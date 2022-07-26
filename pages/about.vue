<template>
  <div class="py-8 grey lighten-5">
    <v-container class="px-16">
      <client-only v-if="setting.about_page" placeholder="Loading...">
        <div class="ck-content" v-html="setting.about_page" />
      </client-only>
      <div v-else>
        <h1 class="grey--text text-center">
          {{ $t('COMING',{text: pageName }) }}
        </h1>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: this.$t('ABOUT'),
      rate: null
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.pageName,
      urlPath: this.$route.fullPath
    })
  },
  computed: {
    setting () {
      return this.$store.state.setting
    }
  }
}
</script>
