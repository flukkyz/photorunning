<template>
  <div class="grey lighten-5 d-flex align-center justify-center py-16">
    <div class="">
      <v-card
        class="rounded-0 shadow my-16"
        width="500"
      >
        <v-card-text class="px-12 py-8">
          <h3 class="headline text-center mt-2 mb-5 font-weight-bold mb-1 black--text">
            {{ $t("LOGIN") }}
          </h3>
          <forms-login @login="login" />
          <nuxt-link :to="localePath({name: 'forgot-password'})">
            <p class="text-right grey--text mt-2 mb-0">
              {{ $t('FORGOT_PASSWORD') }}
            </p>
          </nuxt-link>
          <div class="d-flex align-center my-5">
            <v-divider class="mr-3" />
            <p class="mb-0">
              {{ $t('OR') }}
            </p>
            <v-divider class="ml-3" />
          </div>
          <div class="">
            <a :href="`${apiOauth}facebook`">
              <v-btn
                x-large
                block
                depressed
                class="mb-3 rounded-0"
                color="#4A589A"
              >
              &nbsp;
              &nbsp;
                <v-icon color="white" class="mr-5">
                  fab fa-facebook-f
                </v-icon>
              &nbsp;
                <span class="white--text">
                  Login with facebook
                </span>
              </v-btn>
            </a>
            <a :href="`${apiOauth}google`">
              <v-btn
                x-large
                block
                depressed
                class="mb-3 rounded-0"
                color="#E94231"
              >
                <v-icon color="white" class="mr-8">
                  fab fa-google
                </v-icon>
                <span class="white--text">
                  Login with Google
                </span>
              </v-btn>
            </a>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  data () {
    return {
      pageName: this.$t('LOGIN'),
      apiOauth: `${process.env.apiUrl}${process.env.apiDirectory}auth/oauth/`
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.pageName,
      urlPath: this.$route.fullPath
    })
  },
  methods: {
    async login (data) {
      try {
        await this.$auth.loginWith('member', { data })
        // this.$router.back()
        this.$router.push(this.localePath({ name: 'index' }, this.$auth.user.lang))
        // window.open(this.localePath({ name: 'index' }, this.$auth.user.lang), '_self')
      } catch (err) {
        if (err.response.status === 403) {
          this.$bus.$emit('not-verify')
        } else {
          this.$bus.$emit('incorrect-login')
        }
      }
    }
  }
}
</script>
