<template>
  <div class="py-8 grey lighten-5">
    <v-container class="px-16">
      <h1 class="mb-3 font-weigth-bold text-center">
        {{ pageName }}
      </h1>
      <p class="text-center">
        {{ $t('FORGOT_PASSWORD_DETAIL') }}
      </p>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-form ref="form" v-model="valid" @submit.prevent="save">
            <div class="d-flex px-16 mx-8">
              <div class="flex-grow-1 flex-shrink-0">
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  :rules="rules.email"
                  class="rounded-0"
                  outlined
                  required
                  dense
                />
              </div>
              <v-btn
                color="primary"
                class="ml-3 rounded-0"
                style="height: 40px;"
                rounded
                depressed
                type="submit"
                :disabled="sending || !valid"
                :loading="sending"
              >
                {{ $t("SEND") }}
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600"
      >
        <v-card class="rounded-xl">
          <v-card-text class="pa-8 text-center">
            <v-img src="/images/logo.png" max-width="300" class="mx-auto" />
            <p class="mt-8">
              {{ $t('SEND_EMAIL_SUCCESS', {email: email.toLowerCase(), before: $t('RESET_PASSWORD_EMAIL_BEFORE'), after: $t('RESET_PASSWORD_EMAIL_AFTER')}) }}
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
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  data () {
    return {
      pageName: this.$t('FORGOT_PASSWORD'),
      dialog: false,
      valid: true,
      sending: false,
      email: '',
      rules: {
        email: [
          v => !!v || this.$t('IS_REQUIRED', { text: ' E-mail ' }),
          v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || this.$t('INVALID', { text: ' E-mail ' })
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
  methods: {
    closeDialog () {
      this.dialog = false
      this.email = ''
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    },
    async  save () {
      if (this.$refs.form.validate()) {
        this.sending = true
        try {
          await this.$axios.$post(`${process.env.apiUrl}${process.env.apiDirectory}auth/forgot-password`, { email: this.email })
          this.dialog = true
        } catch (e) {
          this.$notifier.showMessage({ title: this.$t('NOT_FOUND_ACCOUNT'), content: this.$t('NOT_FOUND_ACCOUNT_DETAIL'), color: 'warning' })
        }
      }
      this.sending = false
    }
  }
}
</script>
