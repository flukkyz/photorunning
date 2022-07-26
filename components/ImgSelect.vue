<template>
  <v-dialog v-model="dialog" persistent max-width="1200">
    <v-card v-if="galleries" elevation="0">
      <v-card-title class="pt-2 pb-0 pl-4 pr-0">
        <h3>Choose Images</h3>
        <v-btn
          v-if="galleries.length > 0"
          small
          outlined
          class="ml-3 rounded-lg"
          color="primary"
          @click="$bus.$emit(`open-img-drop${uid ? `-${uid}` : ''}`)"
        >
          <v-icon small left>
            mdi-cloud-upload
          </v-icon>
          UPLOAD NEW IMAGE
        </v-btn>
        <v-spacer />
        <p v-if="multiple && galleries.length > 0" class="mb-0 mr-3 success--text font-weight-bold caption">
          Images picked
          {{ chooseImages.length }}
          <span v-if="!!maxChoose">
            /
            {{ maxChoose }}
          </span>
        </p>
        <v-btn
          v-if="multiple && !dialogImage && galleries.length > 0"
          small
          outlined
          elevation="0"
          class="rounded-lg mr-3"
          :disabled="chooseImages.length === 0"
          color="grey"
          @click="chooseImages = []"
        >
          CLEAR PICKED
        </v-btn>
        <v-btn
          v-if="!dialogImage && galleries.length > 0"
          small
          elevation="0"
          class="rounded-lg"
          :disabled="chooseImages.length === 0"
          color="primary"
          @click="onChooseImage"
        >
          CHOOSE
        </v-btn>
        <v-btn
          v-if="!dialogImage"
          fab
          x-small
          text
          class="float-right ma-2"
          @click="closeDialog"
        >
          <v-icon>
            fas fa-times
          </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text v-if="galleries.length > 0">
        <div class="d-flex mb-2">
          <p class="primary--text mb-0">
            <span class="caption font-weight-bold">
              All
            </span>
              &nbsp;
            {{ $currencyText(galleries.length) }}
          </p>
          <v-divider vertical class="mx-3" />
          <v-btn
            v-if="!showSelect"
            color="primary"
            outlined
            class="rounded-xl"
            x-small
            @click="openSelect"
          >
            Select
          </v-btn>
          <v-btn
            v-else
            color="greyLight"
            outlined
            class="rounded-xl"
            x-small
            @click="closeSelect"
          >
            Close select
          </v-btn>
        </div>
        <div v-if="showSelect" class="d-flex mb-2">
          <div class="d-flex">
            <v-checkbox
              color="black"
              :input-value="selected.length === galleries.length ? 'true' : ''"
              :indeterminate="selected.length > 0 && selected.length < galleries.length"
              hide-details
              class="my-0"
              @click="onSelectAll"
            >
              <template #label>
                <span class="caption" :class="{'font-weight-bold': selected.length === galleries.length}">
                  Select All
                </span>
              </template>
            </v-checkbox>
          </div>
          <div v-if="selected.length > 0" class="d-flex">
            <v-divider vertical class="mx-5" />
            <p class="primary--text mb-0 mt-1">
              <span class="caption font-weight-bold">
                Selected
              </span>
                &nbsp;
              {{ $currencyText(selected.length) }}
            </p>
            <v-divider vertical class="mx-5" />
            <p class="error--text mb-0 mt-1 pointer" @click="onDelete">
              <v-icon color="error">
                mdi-trash-can
              </v-icon>
              Delete
            </p>
          </div>
        </div>
        <v-row class="overflow-auto mt-2 img-lists" style="height: 70vh">
          <div id="top-list-gallery" />
          <v-col
            v-for="(img,i) in galleries"
            :id="`img-${img.product_gallery_id}`"
            :key="`img-${img.product_gallery_id}`"
            cols="4"
            sm="3"
            class="d-flex child-flex"
          >
            <v-hover
              v-slot="{ hover }"
            >
              <v-img
                :src="img.product_gallery_url"
                aspect-ratio="1"
                :lazy-src="img.product_gallery_url"
                :class="{'border-select': chooseImages.map(ele => ele.product_gallery_id).includes(img.product_gallery_id)}"
                eager
                contain
                max-height="200px"
                @click="onPickImage(img)"
              >
                <div class="d-flex w-100 h-100">
                  <div v-if="selected.map(ele => ele.product_gallery_id).includes(img.product_gallery_id)" class="mt-auto pa-3">
                    <v-icon color="white" style="text-shadow: 1px 1px 1px #999;">
                      fas fa-check
                    </v-icon>
                  </div>
                  <div v-if="multiple && chooseImages.map(ele => ele.product_gallery_id).includes(img.product_gallery_id)" class="mb-auto pa-1">
                    <v-chip color="red" class="elevation-1 chip-width justify-center">
                      <span class="white--text">
                        {{ $_.findIndex(chooseImages,{product_gallery_id: img.product_gallery_id})+1 }}
                      </span>
                    </v-chip>
                  </div>
                  <div class="mb-auto ml-auto pa-3">
                    <v-icon
                      v-if="hover"
                      color="white"
                      style="text-shadow: 1px 1px 1px #999;"
                      @click="openDialogImage(img,i)"
                    >
                      fas fa-eye
                    </v-icon>
                  </div>
                </div>
              </v-img>
            </v-hover>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else class="pointer" @click="$bus.$emit(`open-img-drop${uid ? `-${uid}` : ''}`)">
        <h1 class="display-2 text-center grey--text pt-16 mt-16 font-weight-light">
          No Image
        </h1>
        <p class="headline mb-16 pb-16 text-center primary--text">
          Click here to Upload Image
        </p>
      </v-card-text>
    </v-card>

    <dialogs-delete :value="`gallery-${uid}`" @delete="confirmDelete" />

    <img-drop :uid="uid" :max-file-size="maxFileSize" @refresh="refresh" />

    <v-dialog v-model="dialogImage" :retain-focus="false" content-class="elevation-0 overflow-hidden" persistent>
      <div class="d-flex mb-1">
        <div class="ml-auto">
          <v-btn
            small
            elevation="0"
            :disabled="multiple && chooseImages.length === maxChoose && photoIndex !== null && !chooseImages.map(ele => ele.product_gallery_id).includes(galleries[photoIndex].product_gallery_id)"
            class="mr-3 rounded-lg"
            color="primary"
            @click="onChooseThisImage"
          >
            {{ multiple ? (photoIndex !== null && chooseImages.map(ele => ele.product_gallery_id).includes(galleries[photoIndex].product_gallery_id) ? 'UNPICK' : 'PICK') : 'CHOOSE' }}
          </v-btn>
          <v-icon color="white" @click="dialogImage = false">
            mdi-close
          </v-icon>
        </div>
      </div>
      <v-carousel
        v-model="photoIndex"
        hide-delimiter-background
        show-arrows-on-hover
        hide-delimiters
        height="100%"
        width="100%"
      >
        <v-carousel-item v-for="img in galleries" :key="`carousel-${img.product_gallery_id}`">
          <v-img
            max-height="1000"
            max-width="1000"
            :src="img.product_gallery_url"
            :lazy-src="img.product_gallery_url"
            contain
            aspect-ratio="1.1618"
            eager
            class="mx-auto"
          >
            <div class="d-flex w-100 h-100">
              <div v-if="multiple && chooseImages.map(ele => ele.product_gallery_id).includes(img.product_gallery_id)" class="mb-auto mx-auto mt-5">
                <v-chip color="red" large class="elevation-1 chip-width-big justify-center">
                  <span class="white--text headline">
                    {{ $_.findIndex(chooseImages,{product_gallery_id: img.product_gallery_id})+1 }}
                  </span>
                </v-chip>
              </div>
            </div>
          </v-img>
        </v-carousel-item>
      </v-carousel>
    </v-dialog>
  </v-dialog>
</template>

<script>
export default {
  props: {
    maxFileSize: {
      type: Number,
      default: 5000000
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxChoose: {
      type: Number,
      default: null
    },
    uid: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      api: `${process.env.apiUrl}${process.env.apiDirectory}product_gallery`,
      dialog: false,
      showSelect: false,
      selected: [],
      chooseImages: [],
      photoIndex: null,
      doubleClick: false,
      doubleClickTimeout: null,
      dialogImage: false
    }
  },
  computed: {
    galleries () {
      return this.$store.state.references.galleries
    }
  },
  created () {
    this.$bus.$on(`open-img-select${(this.uid ? `-${this.uid}` : '')}`, async (values = '') => {
      this.$overlay.showLoading()
      await this.fetchData()
      this.chooseImages = []
      if (values) {
        if (this.multiple) {
          for (const value of values) {
            console.log('value', value)
            const chooseImage = this.$_.find(this.galleries, { product_gallery_url: value.product_gallery_url })
            console.log('chooseImage', chooseImage)
            if (chooseImage) {
              this.chooseImages.push(chooseImage)
            }
          }
        } else {
          console.log('value', values)
          const chooseImage = this.$_.find(this.galleries, { product_gallery_url: values })
          if (chooseImage) {
            this.chooseImages.push(chooseImage)
            console.log(this.chooseImages)
          }
        }
        if (this.chooseImages[0]) {
          setTimeout(() => {
            this.$vuetify.goTo(`#img-${this.chooseImages[0].product_gallery_id}`, {
              duration: 0,
              container: '.img-lists',
              offset: 100
            })
          }, 100)
        }
      }
      this.dialog = true
    })
  },
  beforeDestroy () {
    this.$bus.$off(`open-img-select${(this.uid ? `-${this.uid}` : '')}`)
  },
  methods: {
    clearChoose () {
      this.chooseImages = []
    },
    closeDialog () {
      this.closeSelect()
      this.dialog = false
      this.$overlay.hide()
    },
    async refresh () {
      await this.fetchData()
      setTimeout(() => {
        this.$vuetify.goTo('#top-list-gallery', {
          duration: 200,
          container: '.img-lists'
        })
      }, 10)
    },
    async fetchData () {
      try {
        const galleries = await this.$axios.$get(this.api)
        this.$store.commit('setGalleries', galleries.data)
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    },
    onSelect (item) {
      const index = this.$_.findIndex(this.selected, { product_gallery_id: item.product_gallery_id })
      if (index !== -1) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(item)
      }
    },
    onSelectAll () {
      this.selected = this.selected.length === this.galleries.length ? [] : [...this.galleries]
    },
    openSelect () {
      this.chooseImages = []
      this.showSelect = true
    },
    closeSelect () {
      this.selected = []
      this.showSelect = false
    },
    openDialogImage (item, index) {
      this.photoIndex = index
      this.dialogImage = true
    },
    onPickImage (item) {
      if (!this.showSelect) {
        if (this.multiple) {
          const indexChoose = this.$_.findIndex(this.chooseImages, { product_gallery_id: item.product_gallery_id })
          if (indexChoose !== -1) {
            this.chooseImages.splice(indexChoose, 1)
          } else if (!this.maxChoose || (this.maxChoose && this.chooseImages.length < this.maxChoose)) {
            this.chooseImages.push(item)
          }
        } else if (this.doubleClick && this.chooseImages.length === 1 && this.chooseImages[0].product_gallery_id === item.product_gallery_id) {
          this.onChooseImage()
        } else if (this.chooseImages.length === 0 || (this.chooseImages.length === 1 && this.chooseImages[0].product_gallery_id !== item.product_gallery_id)) {
          this.chooseImages = []
          this.chooseImages.push(item)
          this.doubleClick = true
          this.doubleClickTimeout = setTimeout(() => {
            this.doubleClick = false
          }, 500)
        } else {
          this.chooseImages = []
        }
      } else {
        this.onSelect(item)
      }
    },
    onDelete () {
      this.$bus.$emit(`open-delete-dialog-gallery${(this.uid ? `-${this.uid}` : '')}`, null, this.selected.length === this.galleries.length ? 'All item' : `${this.selected.length} ${this.selected.length > 1 ? 'items' : 'item'}`)
    },
    async confirmDelete () {
      const itemCount = this.selected.length
      try {
        await this.$axios.post(`${this.api}/delete_multi`, { product_galleries: this.selected.map(ele => ele.product_gallery_id) })
        this.closeSelect()
        this.fetchData()
        this.$notifier.showMessage({ title: 'Deleted', content: `${itemCount} ${itemCount > 1 ? 'items' : 'item'} was deleted successfully`, color: 'success' })
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.$overlay.hide()
    },
    onChooseImage () {
      this.$emit('choose', (this.multiple ? this.chooseImages : this.chooseImages[0]))
      this.closeDialog()
    },
    onChooseThisImage () {
      if (this.multiple) {
        const indexChoose = this.$_.findIndex(this.chooseImages, { product_gallery_id: this.galleries[this.photoIndex].product_gallery_id })
        if (indexChoose !== -1) {
          this.chooseImages.splice(indexChoose, 1)
        } else if (!this.maxChoose || (this.maxChoose && this.chooseImages.length < this.maxChoose)) {
          this.chooseImages.push(this.galleries[this.photoIndex])
        }
      } else {
        this.chooseImages = []
        this.chooseImages.push(this.galleries[this.photoIndex])
        this.dialogImage = false
        this.onChooseImage()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border-select{
  border: solid red 5px;
}
.chip-width{
  min-width: 32px;
}
.chip-width-big{
  min-width: 54px;
}
</style>
