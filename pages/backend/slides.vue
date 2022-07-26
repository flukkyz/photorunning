<template>
  <div v-if="listDatas" class="pb-16">
    <div class="d-flex mb-3">
      <div class="">
        <p class="subtitle-1 font-weight-bold mb-0">
          {{ modelName }}
        </p>
      </div>
      <v-spacer />
      <v-btn v-if="listDatas.length > 0" small class="rounded-0" color="primary" @click="$bus.$emit('open-slide-form')">
        <v-icon small left>
          mdi-plus
        </v-icon>
        {{ modelName }}
      </v-btn>
    </div>
    <v-row v-if="listDatas.length > 0">
      <v-col
        v-for="slideshow in listDatas"
        :key="`slideshow-${slideshow.id}`"
        cols="12"
        md="6"
      >
        <v-hover v-slot="{ hover }">
          <v-img :src="slideshow.url" class="mx-auto d-flex align-end">
            <div class="d-flex mt-1 pa-2" style="background-color: #99999999;">
              <p v-if="slideshow.link" class="mb-0 text-center text-truncate">
                <span class="caption font-weight-bold">
                  Link
                </span>
                <a :href="slideshow.link" target="_blank">
                  {{ slideshow.link }}
                </a>
              </p>
              <v-spacer />
              <div v-if="hover" class="text-center white rounded" style="min-width: 25px;">
                <v-icon small class="mt-n1" color="error" @click="onDelete(slideshow)">
                  fas fa-trash-alt
                </v-icon>
              </div>
            </div>
          </v-img>
        </v-hover>
      </v-col>
    </v-row>
    <div v-else>
      <v-card
        elevation="0"
        @click="$bus.$emit('open-slide-form')"
      >
        <v-card-text>
          <h1 class="display-1 text-center py-5">
            <i class="fas fa-plus mr-3" />
            {{ modelName }}
          </h1>
        </v-card-text>
      </v-card>
    </div>
    <forms-slide @add="saveAdd" />
    <dialogs-delete value="slideshow" @delete="confirmDelete" />
  </div>
</template>

<script>
export default {
  layout: 'back',
  middleware: ['authen', 'backend'],
  data () {
    return {
      modelName: ' Slide Shows ',
      api: `${process.env.apiUrl}${process.env.apiDirectory}slides`,
      listDatas: null
    }
  },
  async mounted () {
    await this.fetchData()
  },
  methods: {
    async fetchData () {
      try {
        const listDatas = await this.$axios.$get(this.api)
        this.listDatas = listDatas
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    },
    async saveAdd (data) {
      const formData = new FormData()
      formData.append('image', data.image)
      formData.append('link', data.link)
      try {
        const result = await this.$axios.$post(`${this.api}`, formData)
        if (result) {
          this.$notifier.showMessage({ title: 'เพิ่มข้อมูลสำเร็จ', content: `เพิ่มข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
          await this.fetchData()
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
      this.$overlay.hide()
    },
    onDelete (item) {
      this.$bus.$emit('open-delete-dialog-slideshow', item.id, this.modelName)
    },
    async confirmDelete (id) {
      try {
        await this.$axios.delete(`${this.api}/${id}`)
        this.fetchData()
        this.$notifier.showMessage({ title: 'ลบข้อมูลสำเร็จ', content: `ลบข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.$overlay.hide()
    }
  }
}
</script>
