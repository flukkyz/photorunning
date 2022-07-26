<template>
  <div class="grey lighten-5 d-flex align-center justify-center py-16">
    <div class="">
      <v-card
        class="rounded-0 shadow"
        width="500"
      >
        <v-card-text class="px-12 py-8">
          <h3 class="headline text-center mt-2 mb-5 font-weight-bold mb-1 black--text">
            {{ $t("REGISTER") }}
          </h3>
          <forms-register @save="save" />

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
                depressed
                block
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
                depressed
                block
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
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <v-card class="rounded-xl">
        <v-card-text class="pa-8 text-center">
          <v-img src="/images/logo.png" max-width="300" class="mx-auto" />
          <p class="mt-8">
            {{ $t('SEND_EMAIL_SUCCESS', {email: email.toLowerCase(), before: $t('VERIFY_EMAIL_BEFORE'), after: $t('VERIFY_EMAIL_AFTER')}) }}
          </p>
          <v-btn
            color="primary"
            depressed
            rounded
            @click="closeDialog"
          >
            <span class="white--text">
              {{ $t('CLOSE') }}
            </span>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  data () {
    return {
      dialog: false,
      email: '',
      api: `${process.env.apiUrl}${process.env.apiDirectory}auth/signup`,
      apiOauth: `${process.env.apiUrl}${process.env.apiDirectory}auth/oauth/`,
      pageName: this.$t('REGISTER')
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
    closeDialog () {
      this.dialog = false
      this.$router.push(this.localePath({ name: 'login' }))
    },
    async save (data) {
      this.email = data.email
      try {
        await this.$axios.$post(this.api, data)
        this.dialog = true
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    }
  }
}
</script>
