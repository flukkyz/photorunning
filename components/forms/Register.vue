<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-text-field
        v-model="form.firstname"
        :label="$t('FIRSTNAME')"
        outlined
        class="rounded-0"
        autofocus
        :rules="rules.firstname"
        required
      />
      <v-text-field
        v-model="form.lastname"
        :label="$t('LASTNAME')"
        outlined
        class="rounded-0"
        :rules="rules.lastname"
        required
      />
      <v-text-field
        v-model="form.email"
        label="E-mail"
        outlined
        class="rounded-0"
        autocomplete="off"
        :rules="rules.email"
        :hint="$t('INPUT_HINT',{text: ' E-mail '})"
        :error-messages="errors"
        required
        @input="checkDuplicate"
      />
      <v-text-field
        v-model="form.password"
        type="password"
        label="Password"
        outlined
        class="rounded-0"
        autocomplete="off"
        :rules="rules.password"
        :hint="$t('INPUT_HINT',{text: ' Password '})"
        required
      />
      <v-text-field
        v-model="form.confirm_password"
        type="password"
        :label="$t('USER_CONFIRM_PASSWORD')"
        outlined
        class="rounded-0"
        autocomplete="off"
        :rules="rules.confirmPassword"
        :hint="$t('INPUT_HINT',{text: $t('USER_CONFIRM_PASSWORD')})"
        required
      />
      <v-btn
        color="primary"
        x-large
        elevation="0"
        class="rounded-0"
        block
        type="submit"
        :disabled="saving || !valid"
        :loading="saving"
      >
        {{ $t("REGISTER") }}
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkMemberApi: `${process.env.apiUrl}${process.env.apiDirectory}members-check`,
      valid: true,
      saving: false,
      incorrect: false,
      errors: [],
      rules: {
        firstname: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('FIRSTNAME') })
        ],
        lastname: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('LASTNAME') })
        ],
        email: [
          v => !!v || this.$t('IS_REQUIRED', { text: ' E-mail ' }),
          v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || this.$t('INVALID', { text: ' E-mail ' })
        ],
        password: [
          v => !!v || this.$t('IS_REQUIRED', { text: ' Password ' }),
          v => !v || (!!v && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(v)) || this.$t('INVALID_PASSWORD')
        ],
        confirmPassword: [
          v => !this.form.password || (!!this.form.password && v === this.form.password) || this.$t('PASSWORD_NOT_MATCH')
        ]
      },
      form: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: ''
      },
      debounce: null
    }
  },
  created () {
    setTimeout(() => {
      if (this.$refs.form) {
        this.$refs.form.resetValidation()
      }
    })
  },
  methods: {
    checkDuplicate (val) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(async () => {
        this.errors = []
        if (val.length >= 5) {
          try {
            const res = await this.$axios.$post(this.checkMemberApi, { email: val })
            if (res) {
              this.errors = [this.$t('ALREADY', { text: ' E-mail ' })]
            }
          } catch (e) {

          }
        }
      }, 600)
    },
    save () {
      if (this.$refs.form.validate() && this.errors.length === 0) {
        this.oneClick = true
        this.$emit('save', this.form)
        this.dialog = false
      }
    }
  }
}
</script>
