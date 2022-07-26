<template>
  <div class="py-8 grey lighten-5">
    <v-container class="px-16">
      <h2 class="mb-8 font-weigth-bold text-center">
        {{ pageName }}
      </h2>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-form ref="form" v-model="valid" @submit.prevent="save">
            <v-text-field
              v-model="newPassword"
              type="password"
              :label="$t('_NEW',{text: ' Password ' })"
              outlined
              class="rounded-0"
              autocomplete="off"
              :rules="rules.passwordRules"
              :hint="$t('INPUT_HINT',{text: $t('_NEW',{text: ' Password ' })})"
              required
            />
            <v-text-field
              v-model="confirmPassword"
              type="password"
              :label="$t('USER_CONFIRM_PASSWORD')"
              outlined
              class="rounded-0"
              autocomplete="off"
              :rules="rules.confirmPasswordRules"
              :hint="$t('INPUT_HINT',{text: $t('USER_CONFIRM_PASSWORD')})"
              required
            />
            <v-btn
              color="primary"
              block
              x-large
              class="rounded-0"
              depressed
              type="submit"
              :disabled="saving || !valid"
              :loading="saving"
            >
              {{ $t("SAVE") }}
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
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
      checkPasswordTokenApi: `${process.env.apiUrl}${process.env.apiDirectory}auth/check-password-token`,
      api: `${process.env.apiUrl}${process.env.apiDirectory}auth/reset-password`,
      pageName: this.$t('RESET_PASSWORD'),
      valid: true,
      saving: false,
      newPassword: '',
      confirmPassword: '',
      rules: {
        passwordRules: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('_NEW', { text: ' Password ' }) }),
          v => !v || (!!v && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(v)) || this.$t('INVALID_PASSWORD')
        ],
        confirmPasswordRules: [
          v => (!!this.newPassword && v === this.newPassword) || this.$t('PASSWORD_NOT_MATCH')
        ]
      }
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.pageName,
      urlPath: this.$route.fullPath
    })
  },
  async mounted () {
    try {
      await this.$axios.$post(this.checkPasswordTokenApi, { token: this.$route.params.token })
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  methods: {
    async  save () {
      if (this.$refs.form.validate()) {
        this.saving = true
        try {
          await this.$axios.$put(`${this.api}/${this.$route.params.token}`, { password: this.newPassword })
          this.$notifier.showMessage({ title: this.$t('RESET_PASSWORD_SUCCESS'), content: this.$t('RESET_PASSWORD_SUCCESS_DETAIL'), color: 'success' })
          setTimeout(() => {
            this.$router.push(this.localePath({ name: 'login' }))
          }, 2000)
        } catch (e) {
          this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
        }
      }
    }
  }
}
</script>
