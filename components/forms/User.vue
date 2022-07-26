<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="500">
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-card class="rounded-xl">
        <v-toolbar
          color="info"
          dark
          flat
        >
          <v-toolbar-title>
            <v-icon class="mr-2">
              {{ headerIcon }}
            </v-icon>
            {{ headerText }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn fab x-small text @click="closeDialog">
            <v-icon>
              fas fa-times
            </v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pt-5">
          <!-- <v-row> -->
          <!-- <v-col cols="12" md="8"> -->
          <v-text-field
            v-model="form.name"
            label="ชื่อผู้ใช้งาน"
            outlined
            class="rounded-lg"
            :autofocus="mode === 'add'"
            :rules="rules.nameRules"
            required
          />
          <v-text-field
            v-if="mode === 'add'"
            v-model="form.username"
            label="Username"
            outlined
            class="rounded-lg"
            autocomplete="off"
            :rules="rules.usernameRules"
            :hint="$t('INPUT_HINT',{text: ' Username '})"
            :error-messages="errors"
            required
            @input="checkDuplicate"
          />
          <p v-else>
            <span class="font-weight-bold subtitle-1">
              Username
            </span>
                  &nbsp;
            <span class="black--text title">
              {{ form.username }}
            </span>
          </p>
          <v-text-field
            v-model="form.password"
            type="password"
            label="Password"
            outlined
            class="rounded-lg"
            autocomplete="off"
            :rules="rules.passwordRules"
            :hint="$t('INPUT_HINT',{text: ' Password '})"
            required
          />
          <v-text-field
            v-model="form.confirm_password"
            type="password"
            :label="$t('USER_CONFIRM_PASSWORD')"
            outlined
            class="rounded-lg"
            autocomplete="off"
            :rules="rules.confirmPasswordRules"
            :hint="$t('INPUT_HINT',{text: $t('USER_CONFIRM_PASSWORD')})"
            required
          />
          <!-- </v-col> -->
          <!-- <v-col cols="12" md="4">
                <label for="form.role" v-text="$t('ROLE')" />
                <v-radio-group
                  v-model="form.role"
                  column
                  :rules="rules.roleRules"
                  required
                >
                  <v-radio
                    v-for="(value, name) in roleTexts"
                    :key="name"
                    :label="value"
                    :value="name"
                  />
                </v-radio-group>
              </v-col> -->
          <!-- </v-row> -->
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn
            color="info"
            x-large
            block
            rounded
            type="submit"
            :disabled="oneClick"
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
  data () {
    return {
      checkUserApi: `${process.env.apiUrl}${process.env.apiDirectory}users/username`,
      modelName: 'ผู้ใช้งาน',
      dialog: false,
      mode: '',
      valid: true,
      oneClick: false,
      errors: [],
      rules: {
        nameRules: [
          v => !!v || this.$t('IS_REQUIRED', { text: 'ชื่อผู้ใช้งาน' })
        ],
        usernameRules: [
          v => !!v || this.$t('IS_REQUIRED', { text: ' Username ' }),
          v => v.length >= 5 || this.$t('GREATER_LENGTH', { text: ' Username ', count: 5 })
        ],
        passwordRules: [
          v => (!!v && this.mode === 'add') || this.mode === 'edit' || this.$t('IS_REQUIRED', { text: ' Password ' }),
          v => !v || (!!v && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(v)) || this.$t('INVALID_PASSWORD')
        ],
        confirmPasswordRules: [
          v => !this.form.password || (!!this.form.password && v === this.form.password) || this.$t('PASSWORD_NOT_MATCH')
        ],
        roleRules: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('ROLE') })
        ]
      },
      roleTexts: {
        admin: this.$t('USER_ROLE_ADMIN'),
        executive: this.$t('USER_ROLE_EXECUTIVE'),
        editor: this.$t('USER_ROLE_EDITOR'),
        author: this.$t('USER_ROLE_AUTHOR')
      },
      form: {}
    }
  },
  computed: {
    headerText () {
      return this.mode === 'add' ? `เพิ่ม${this.modelName}` : `แก้ไข${this.modelName}`
    },
    headerIcon () {
      return this.mode === 'add' ? 'fas fa-plus' : 'fas fa-edit'
    }
  },
  created () {
    this.$bus.$on('open-user-form', (data) => {
      this.$overlay.showLoading()
      this.oneClick = false
      this.clearData()
      this.mode = 'add'
      if (data) {
        this.mode = 'edit'
        this.form = { ...data }
        this.form.password = ''
      }
      this.dialog = true
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    })
  },
  beforeDestroy () {
    this.$bus.$off('open-user-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    async checkDuplicate (val) {
      this.errors = []
      if (val.length >= 5) {
        try {
          const res = await this.$axios.$get(`${this.checkUserApi}/${val}`)
          if (res) {
            this.errors = [this.$t('ALREADY', { text: ' Username ' })]
          }
        } catch (e) {

        }
      }
    },
    clearData () {
      this.form = {
        username: '',
        password: '',
        confirm_password: '',
        role: 'admin'
      }
    },
    save () {
      if (this.$refs.form.validate() && this.errors.length === 0) {
        if (!this.form.password) {
          delete this.form.password
        }
        this.oneClick = true
        this.$emit(this.mode, this.form)
        this.dialog = false
      }
    }
  }
}
</script>
