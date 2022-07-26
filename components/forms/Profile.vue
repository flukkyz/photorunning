<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="800">
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-card class="rounded-xl">
        <v-toolbar
          color="bgLight"
          elevation="0"
          flat
        >
          <v-toolbar-title>
            <h3 class="primary--text">
              {{ edit ? $t('EDIT', { text: $t('PROFILE')}) : $t('PROFILE') }}
            </h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn v-if="edit" fab x-small text @click="closeDialog">
            <v-icon>
              fas fa-times
            </v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <v-row>
            <v-col md="6">
              <v-text-field
                v-model="form.firstname"
                :label="$t('FIRSTNAME')"
                outlined
                class="rounded-lg"
                :rules="rules.firstname"
                required
              />
            </v-col>
            <v-col md="6">
              <v-text-field
                v-model="form.lastname"
                :label="$t('LASTNAME')"
                outlined
                class="rounded-lg"
                :rules="rules.lastname"
                required
              />
            </v-col>
          </v-row>
          <v-textarea
            v-model="form.address"
            :label="$t('ADDRESS')"
            rows="3"
            outlined
            class="rounded-lg"
            :rules="rules.address"
            required
          />
          <v-row>
            <v-col md="5">
              <v-text-field
                v-model="form.zipcode"
                :label="$t('ZIPCODE')"
                type="number"
                outlined
                class="rounded-lg"
                :rules="rules.zipcode"
                required
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="form.tel"
            :label="$t('PHONE_NUMBER')"
            type="number"
            outlined
            class="rounded-lg"
            :rules="rules.tel"
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
  data () {
    return {
      checkZipcodeApi: `${process.env.apiUrl}${process.env.apiDirectory}auth/check-zipcode`,
      dialog: false,
      valid: true,
      saving: false,
      edit: true,
      rules: {
        citizen_id: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('CITIZEN_ID') })
        ],
        firstname: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('FIRSTNAME') })
        ],
        lastname: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('LASTNAME') })
        ],
        address: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('ADDRESS') })
        ],
        zipcode: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('ZIPCODE') })
        ],
        tel: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('PHONE_NUMBER') })
        ]
      },
      form: {}
    }
  },
  created () {
    this.$bus.$on('open-profile-form', (oldData, edit = true) => {
      this.$overlay.showLoading()
      this.saving = false
      this.edit = edit
      this.clearData()
      this.form = { ...this.form, ...oldData }
      this.dialog = true
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    })
  },
  beforeDestroy () {
    this.$bus.$off('open-profile-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    clearData () {
      this.form = {
        citizen_id: '',
        firstname: '',
        lastname: '',
        address: '',
        zipcode: '',
        tel: ''
      }
    },
    async save () {
      if (this.$refs.form.validate()) {
        this.saving = true
        try {
          const result = await this.$axios.$post(this.checkZipcodeApi, {
            zipcode: this.form.zipcode
          })
          if (result.results && result.results[this.form.zipcode] && result.results[this.form.zipcode].length > 0) {
            this.$emit('save', this.form)
            this.dialog = false
          } else {
            this.$notifier.showMessage({ title: this.$t('INVALID', { text: this.$t('ADDRESS') }), content: this.$t('ADDRESS_INVALID_DETAIL'), color: 'error' })
            this.form.zipcode = ''
            this.saving = false
          }
        } catch (e) {
          this.$emit('save', this.form)
          this.dialog = false
        }
      }
    }
  }
}
</script>
