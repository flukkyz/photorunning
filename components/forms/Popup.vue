<template>
  <v-dialog v-model="dialog" persistent scrollable :retain-focus="false" max-width="1400">
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-card class="rounded-0">
        <v-toolbar
          color="bgLight"
          elevation="0"
          flat
        >
          <v-toolbar-title>
            <h3 class="primary--text">
              ปรับปรุงข้อมูล{{ modelName }}
            </h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn fab x-small text @click="closeDialog">
            <v-icon>
              fas fa-times
            </v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text v-if="loaded">
          <client-only placeholder="Loading...">
            <ck-editor
              v-model="form[field]"
              :config="upload ? $ckConfig(uploadConfig) : $ckConfig()"
            />
          </client-only>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn
            color="info rounded-0"
            x-large
            block
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
      uploadConfig: {
        uploadUrl: `${process.env.apiUrl}${process.env.apiDirectory}upload-img`,
        headers: {
          Authorization: this.$auth.strategy.token.get()
        }
      },
      dialog: false,
      valid: true,
      saving: false,
      loaded: false,
      form: null,
      field: '',
      modelName: '',
      upload: true
    }
  },
  created () {
    this.$bus.$on('open-popup-form', (oldData, field, modelName, upload = true) => {
      this.$overlay.showLoading()
      this.saving = false
      this.field = field
      this.modelName = modelName
      this.upload = upload
      this.form = { ...oldData }
      this.dialog = true
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
      setTimeout(() => {
        this.loaded = true
      }, 500)
    })
  },
  beforeDestroy () {
    this.$bus.$off('open-popup-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.loaded = false
      this.$overlay.hide()
    },
    save () {
      if (this.$refs.form.validate()) {
        this.saving = true
        this.$emit('save', this.form)
        this.dialog = false
        this.loaded = false
      }
    }
  }
}
</script>
