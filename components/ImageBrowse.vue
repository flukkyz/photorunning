<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card class="rounded-0">
      <v-toolbar
        color="bgLight"
        elevation="0"
        flat
      >
        <v-toolbar-title class="d-flex">
          <v-icon class="mr-3" x-large color="primary">
            mdi-face-recognition
          </v-icon>
          <h3 class="primary--text">
            ค้นหาด้วยใบหน้า
          </h3>
        </v-toolbar-title>
        <v-spacer />
        <v-btn fab x-small text @click="closeDialog">
          <v-icon>
            fas fa-times
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text
        class="py-5 px-5"
        @drop.prevent="onDrop"
        @dragover.prevent="dragover = true"
        @dragenter.prevent="dragover = true"
        @dragleave.prevent="dragover = false"
      >
        <input
          ref="inputFiles"
          type="file"
          accept="image/*"
          hidden
          :multiple="multiple"
          @change="onFileChanged($event)"
        >
        <v-btn
          v-if="!oldImg"
          :plain="!dragover"
          :depressed="dragover"
          block
          class="rounded-0"
          height="150"
          @click="selectFile()"
        >
          <v-icon
            :color="dragover ? 'black' : 'grey darken-2'"
            class="mr-3"
            :class="[dragover ? 'mt-2, mb-4' : 'mt-2']"
            size="60"
          >
            mdi-cloud-upload
          </v-icon>

          <span :class="{'black--text': dragover}">
            {{ $t('DRAG_IMAGES_HERE') }}
            <br>
            {{ $t('OR') }}
            {{ $t('CLICK_BROWSE_IMAGES') }}
          </span>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    header: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      valid: true,
      dragover: false,
      oldImg: null,
      params: null,
      rules: {
        image: [
          v => (!!v || !!this.oldImg) || this.$t('IS_REQUIRED', { text: ' Image' }),
          (v) => {
            const mimetypeImages = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg']
            return !v || mimetypeImages.includes(v.type) || this.$t('IMG_ONLY')
          },
          v => !v || v.size <= 5000000 || this.$t('LESS_SIZE', { text: this.$t('FILE'), count: '5 MB' })
        ]
      }
    }
  },
  created () {
    this.$bus.$on(`open-img-browse-form${(this.value ? `-${this.value}` : '')}`, (params) => {
      this.$overlay.showLoading()
      this.params = params
      this.dialog = true
    })
  },
  beforeDestroy () {
    this.$bus.$off(`open-img-browse-form${(this.value ? `-${this.value}` : '')}`)
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    selectFile () {
      const fileInputElement = this.$refs.inputFiles
      fileInputElement.value = null
      fileInputElement.click()
    },
    onFileChanged (e) {
      if (e.target.files && e.target.files.length > 0) {
        this.keepData(e.target.files)
      }
    },
    onDrop (e) {
      this.dragover = false
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.keepData(e.dataTransfer.files)
      }
    },
    keepData (files) {
      this.$emit('selected', this.multiple ? files : files[0], this.params)
      this.dialog = false
    }
  }
}
</script>
