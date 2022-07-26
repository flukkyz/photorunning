<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="400">
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-card class="rounded-xl">
        <v-toolbar
          color="bgLight"
          elevation="0"
          flat
        >
          <v-toolbar-title>
            <h3 class="black--text">
              {{ hasPassword ? $t('CHANGE_PASSWORD') : $t('CREATE_PASSWORD') }}
            </h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn fab x-small text @click="closeDialog">
            <v-icon>
              fas fa-times
            </v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-text-field
            v-if="hasPassword"
            v-model="form.old_password"
            type="password"
            :label="$t('OLD_PASSWORD')"
            outlined
            class="rounded-lg"
            autocomplete="off"
            :rules="rules.oldPassword"
            :hint="$t('INPUT_HINT',{text: $t('OLD_PASSWORD')})"
            required
          />
          <v-text-field
            v-model="form.password"
            type="password"
            :label="hasPassword ? $t('_NEW',{text: ' Password ' }) : 'Password'"
            outlined
            class="rounded-lg"
            autocomplete="off"
            :rules="rules.password"
            :hint="$t('INPUT_HINT',{text: $t('_NEW',{text: ' Password ' })})"
            required
          />
          <v-text-field
            v-model="form.confirm_password"
            type="password"
            :label="$t('USER_CONFIRM_PASSWORD')"
            outlined
            class="rounded-lg"
            autocomplete="off"
            :rules="rules.confirmPassword"
            :hint="$t('INPUT_HINT',{text: $t('USER_CONFIRM_PASSWORD')})"
            required
          />
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn
            color="primary"
            large
            block
            rounded
            elevation="0"
            type="submit"
            :disabled="saving || !valid"
            :loading="saving"
          >
            {{ $t('SAVE') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  props: {
    hasPassword: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      dialog: false,
      valid: true,
      saving: false,
      rules: {
        oldPassword: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('OLD_PASSWORD') })
        ],
        password: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('_NEW', { text: ' Password ' }) }),
          v => !v || (!!v && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(v)) || this.$t('INVALID_PASSWORD')
        ],
        confirmPassword: [
          v => (!!this.form.password && v === this.form.password) || this.$t('PASSWORD_NOT_MATCH')
        ]
      },
      form: {}
    }
  },
  created () {
    this.$bus.$on('open-change-password-form', () => {
      this.$overlay.showLoading()
      this.saving = false
      this.clearData()
      this.dialog = true
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    })
  },
  beforeDestroy () {
    this.$bus.$off('open-change-password-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    clearData () {
      this.form = {
        old_password: '',
        password: '',
        confirm_password: ''
      }
    },
    save () {
      if (this.$refs.form.validate()) {
        this.saving = true
        this.$emit('save', this.form)
        this.dialog = false
      }
    }
  }
}
</script>
