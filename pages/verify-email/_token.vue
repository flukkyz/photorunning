<template>
  <div class="grey lighten-5 d-flex align-center justify-center py-16">
    <div v-if="verified" class="">
      <v-card
        class="rounded-0 shadow"
        width="500"
      >
        <v-card-text class="px-12 py-8 text-center">
          <p class="title mb-1 font-weight-bold">
            {{ $t('VERIFY_SUCCESS') }}
          </p>
          <p>
            {{ $t('VERIFY_SUCCESS_DETAIL') }}
          </p>
          <nuxt-link :to="localePath({ name: 'login' })">
            <p class="info--text mb-0">
              {{ $t('GO_TO_',{text: $t('LOGIN')}) }}
            </p>
          </nuxt-link>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  validate ({ params }) {
    return !!params.token
  },
  data () {
    return {
      pageName: this.$t('VERIFY_EMAIL'),
      verified: false,
      timeoutGoToLogin: null
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.pageName,
      urlPath: this.$route.fullPath
    })
  },
  beforeDestroy () {
    clearTimeout(this.timeoutGoToLogin)
  },
  async mounted () {
    try {
      await this.$axios.$post(`${process.env.apiUrl}${process.env.apiDirectory}auth/verify`, { token: this.$route.params.token })
      this.verified = true
      this.timeoutGoToLogin = setTimeout(() => {
        this.$router.push(this.localePath({ name: 'login' }))
      }, 10000)
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  }
}
</script>
