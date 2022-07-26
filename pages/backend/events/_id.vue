<template>
  <div v-if="data">
    <v-card class="mx-auto mb-5 shadow rounded-0">
      <v-card-title class="align-start py-3">
        <v-img
          v-if="data.cover_url"
          :src="data.cover_url"
          max-width="150"
          class="mr-5  red"
        />
        <div>
          <p class="headline mb-0">
            {{ data.title }}
          </p>
          <etcs-field
            label="สถานที่จัดงาน"
            :value="`${data.event_location}`"
          />
          <etcs-field
            label="จำนวนนักวิ่งสูงสุดในงาน"
            :value="`${data.maximum_runners}`"
          />
          <etcs-field
            label="ผู้รับผิดชอบโครงการ"
            :value="`${data.header_name}`"
          />
          <etcs-field
            label="วันที่จัดงาน"
            :value="`${data.event_date}`"
          />
        </div>
        <v-spacer />
        <div class="d-flex flex-column text-right">
          <nuxt-link class="mr-4" :to="localePath({ name: 'backend-events-form-id', params: { id: $route.params.id } })">
            <v-icon
              small
              color="warning"
            >
              fas fa-edit
            </v-icon>
            <span class="warning--text caption">
              แก้ไข
            </span>
          </nuxt-link>
        </div>
      </v-card-title>
      <v-card-text>
        <client-only v-if="data.description" placeholder="Loading...">
          <div class="ck-content" v-html="data.description" />
        </client-only>
        <div class="d-flex align-start">
          <div class="">
            <etcs-field
              label="วันที่ลงทะเบียน"
              :value="`${$dateText(data.regis_start,'medium','short')} - ${$dateText(data.regis_end,'medium','short')}`"
            />
            <etcs-field
              label="วันที่จำหน่ายรูป"
              :value="`${$dateText(data.sell_photo_start,'medium','short')} - ${$dateText(data.sell_photo_end,'medium','short')}`"
            />
          </div>
          <v-spacer />
          <div>
            <p class="mb-0 subtitle-1 font-weight-bold text-ce">
              การติดต่อ
            </p>
            <p class="caption mb-0">
              <v-icon x-small class="mr-1">
                fas fa-phone
              </v-icon>
              <span v-if="data.tel">
                <a :href="`tel:${data.tel}`" target="_blank">
                  {{ data.tel }}
                </a>
              </span>
              <span v-else class="red--text">-</span>
            </p>
            <p class="caption mb-0">
              <v-icon x-small class="mr-1">
                fas fa-envelope
              </v-icon>
              <span v-if="data.email">
                <a :href="`mailto:${data.email}`" target="_blank">
                  {{ data.email }}
                </a>
              </span>
              <span v-else class="red--text">-</span>
            </p>
            <p v-if="data.facebook_url" class="caption mb-0">
              <v-icon x-small class="mr-1">
                fab fa-facebook
              </v-icon>
              <a :href="data.facebook_url" target="_blank">
                {{ data.facebook_url }}
              </a>
            </p>
            <p v-if="data.youtube_url" class="caption mb-0">
              <v-icon x-small class="mr-1">
                fab fa-youtube
              </v-icon>
              <a :href="data.youtube_url" target="_blank">
                {{ data.youtube_url }}
              </a>
            </p>
            <p v-if="data.twitter_url" class="caption mb-0">
              <v-icon x-small class="mr-1">
                fab fa-twitter
              </v-icon>
              <a :href="data.twitter_url" target="_blank">
                {{ data.twitter_url }}
              </a>
            </p>
            <p v-if="data.line_id" class="caption mb-0">
              <v-icon x-small class="mr-1">
                fab fa-line
              </v-icon>
              {{ data.line_id }}
            </p>
          </div>
        </div>
        <div class="">
          <p class="mb-0 subtitle-1 font-weight-bold text-ce">
            รูปภาพประกอบ
          </p>
          <v-slide-group
            v-if="data.EventImages.length > 0"
            class="pa-4"
            show-arrows
          >
            <v-slide-item
              v-for="(img,i) in data.EventImages"
              :key="`slide-group-${img.id}`"
              v-slot="{ }"
            >
              <v-card
                class="ma-4 rounded-0 my-auto"
                elevation="0"
                width="200"
              >
                <v-img
                  :src="img.url"
                  aspect-ratio="1"
                  class="mx-auto pointer"
                  @click="openDialogImage(i)"
                />
              </v-card>
            </v-slide-item>
          </v-slide-group>

          <v-dialog v-model="dialogImage" :retain-focus="false" content-class="elevation-0 overflow-hidden" persistent>
            <div class="d-flex mb-1">
              <div class="ml-auto">
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
              <v-carousel-item
                v-for="img in data.EventImages"
                :key="`carousel-${img.id}`"
              >
                <v-img
                  max-height="1000"
                  max-width="1000"
                  :src="img.url"
                  :lazy-src="img.url"
                  contain
                  aspect-ratio="1.1618"
                  eager
                  class="mx-auto"
                />
              </v-carousel-item>
            </v-carousel>
          </v-dialog>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mx-auto mb-5 shadow rounded-0">
      <v-card-title class="primary white--text">
        <div>
          <p class="title mb-0">
            ช่างภาพ
            &nbsp;
            <span v-if="data.EventPhotographers.length > 0" class="caption">
              {{ data.EventPhotographers.length }} คน
            </span>
            <span v-else class="caption warning--text">
              ยังไม่มีข้อมูล
            </span>
          </p>
        </div>
        <v-spacer />
        <v-btn
          outlined
          color="white"
          class="rounded-0"
          small
          @click="$bus.$emit('open-photographer-form')"
        >
          <v-icon
            left
            small
          >
            fas fa-plus
          </v-icon>
          เพิ่ม
        </v-btn>
      </v-card-title>
      <v-list class="py-0">
        <etcs-list-event-photographer
          v-for="photographer in data.EventPhotographers"
          :key="`list-photographer-${photographer.id}`"
          :item="photographer"
          @delete="$bus.$emit('open-delete-dialog', photographer.id, `${photographer.User.firstname} ${photographer.User.lastname}`, 'events/photographers')"
        />
      </v-list>
    </v-card>
    <forms-event-photographer :event="data" @save="submitAddEventPhotographer" />
    <dialogs-delete @delete="submitDelete" />
  </div>
</template>

<script>
export default {
  layout: 'back',
  middleware: ['authen', 'backend'],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      api: `${process.env.apiUrl}${process.env.apiDirectory}events`,
      eventPhotographerApi: `${process.env.apiUrl}${process.env.apiDirectory}events/photographers`,
      data: null,
      photoIndex: null,
      dialogImage: false
    }
  },
  async fetch () {
    try {
      const data = await this.$axios.$get(`${this.api}/${this.$route.params.id}`)
      this.data = data
      this.$overlay.hide()
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.data ? this.data.title : 'โครงการวิ่ง',
      urlPath: this.$route.fullPath
    })
  },
  methods: {
    openDialogImage (index) {
      this.photoIndex = index
      this.dialogImage = true
    },
    async submitAddEventPhotographer (datas) {
      try {
        for (const data of datas) {
          await this.$axios.$post(`${this.eventPhotographerApi}`, data)
        }
        await this.$fetch()
        this.$notifier.showMessage({ title: 'เพิ่มข้อมูลสำเร็จ', content: `เพิ่มข้อมูลช่างภาพจำนวน ${datas.length} คนสำเร็จ`, color: 'success' })
      } catch (e) {
        this.$notifier.showMessage({ title: 'มีข้อมูลช่างภาพแล้ว', content: 'ไม่สามารถเพิ่มข้อมูลช่างภาพซ้ำได้', color: 'error' })
        this.$overlay.hide()
      }
    },
    async submitDelete (id, key) {
      try {
        const result = await this.$axios.delete(`${this.eventPhotographerApi}/${id}`)
        this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'ลบข้อมูลสำเร็จ', content: 'ลบข้อมูลช่างภาพสำเร็จ', color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
    }
  }
}
</script>
