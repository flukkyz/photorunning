<template>
  <v-container v-if="loaded">
    <v-row justify="center" class="mb-10">
      <v-col cols="12">
        <v-form ref="form" v-model="valid" @submit.prevent="save">
          <v-card class="shadow rounded-0">
            <v-toolbar
              flat
            >
              <v-toolbar-title>
                <v-icon class="mr-2">
                  {{ headerIcon }}
                </v-icon>
                {{ headerText }}
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="form.title"
                label="ชื่อโครงการวิ่ง"
                outlined
                class="rounded-0"
                autofocus
                :rules="rules.title"
                required
              />

              <div class="mb-10">
                <div class="">
                  <div class="d-flex">
                    <p class="font-weight-bold body-1 teal--text">
                      รูปภาพหน้าปก
                    </p>
                    <v-btn
                      class="rounded-0 ml-5"
                      small
                      outlined
                      elevation="0"
                      @click="$bus.$emit('open-img-drop-form-cover')"
                    >
                      {{ $t((form.cover_url || form.cover ? 'CHANGE' : 'NEW'),{text: $t('IMAGE')}) }}
                    </v-btn>
                  </div>
                  <v-card elevation="0">
                    <v-img v-if="coverPreview" :src="coverPreview" max-height="400px" contain />
                    <v-img v-else-if="form.cover_url || form.cover_url !== 'null'" :src="form.cover_url" max-height="400px" contain />
                  </v-card>
                </div>
              </div>

              <ck-editor
                v-model="form.description"
                :config="$ckConfig()"
              />

              <v-text-field
                v-model="form.event_location"
                label="สถานที่จัดงาน"
                outlined
                class="mt-6 rounded-0"
                dense
                :rules="rules.event_location"
                required
              />
              <v-row>
                <v-col md="4" cols="12">
                  <v-currency-field
                    v-model.number="form.maximum_runners"
                    :decimal-length="0"
                    label="จำนวนนักวิ่งสูงสุดในงาน"
                    class="rounded-0"
                    outlined
                    dense
                    suffix="คน"
                    :min="0"
                    :max="999999999999"
                    :rules="rules.maximum_runners"
                  />
                </v-col>
                <v-col md="4" cols="12">
                  <v-text-field
                    v-model="form.header_name"
                    label="ผู้รับผิดชอบโครงการ"
                    outlined
                    class="rounded-0"
                    dense
                    :rules="rules.header_name"
                    required
                  />
                </v-col>
                <v-col md="4" cols="12">
                  <date-picker
                    v-model="form.event_date"
                    dense
                    input-class="rounded-0"
                    label="วันที่จัดงาน"
                    :rules="rules.event_date"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <v-card-text>
              <p class="text-center font-weight-bold body-1 teal--text">
                วันที่ลงทะเบียน
              </p>
              <v-row>
                <v-col md="6" cols="12">
                  <date-time-picker
                    v-model="form.regis_start"
                    class="rounded-0"
                    format="YYYY-MM-DD HH:mm:ss"
                    locale="th"
                    label="วันที่เริ่มต้นลงทะเบียน"
                    @input="$refs.form.validate()"
                  />
                  <v-input
                    v-model="form.regis_start"
                    class="ml-3"
                    :rules="rules.regis_start"
                  />
                </v-col>
                <v-col md="6" cols="12">
                  <date-time-picker
                    v-model="form.regis_end"
                    class="rounded-0"
                    locale="th"
                    format="YYYY-MM-DD HH:mm:ss"
                    label="วันที่สิ้นสุดลงทะเบียน"
                    @input="$refs.form.validate()"
                  />
                  <v-input
                    v-model="form.regis_end"
                    class="ml-3"
                    :rules="rules.regis_end"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <v-card-text>
              <p class="text-center font-weight-bold body-1 teal--text">
                วันที่จำหน่ายรูป
              </p>
              <v-row>
                <v-col md="6" cols="12">
                  <date-time-picker
                    v-model="form.sell_photo_start"
                    class="rounded-0"
                    locale="th"
                    format="YYYY-MM-DD HH:mm:ss"
                    label="วันที่เปิดจำหน่ายรูป"
                    @input="$refs.form.validate()"
                  />
                  <v-input
                    v-model="form.sell_photo_start"
                    class="ml-3"
                    :rules="rules.sell_photo_start"
                  />
                </v-col>
                <v-col md="6" cols="12">
                  <date-time-picker
                    v-model="form.sell_photo_end"
                    class="rounded-0"
                    locale="th"
                    format="YYYY-MM-DD HH:mm:ss"
                    label="วันที่สิ้นสุดจำหน่ายรูป"
                    @input="$refs.form.validate()"
                  />
                  <v-input
                    v-model="form.sell_photo_end"
                    class="ml-3"
                    :rules="rules.sell_photo_end"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <v-card-text>
              <p class="text-center font-weight-bold body-1 teal--text">
                การติดต่อ
              </p>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.tel"
                    label="เบอร์โทรศัพท์"
                    outlined
                    hide-details
                    dense
                    class="rounded-0"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.email"
                    label="E-mail"
                    outlined
                    hide-details
                    dense
                    class="rounded-0"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.facebook_url"
                    label="facebook Page"
                    outlined
                    hide-details
                    dense
                    class="rounded-0"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.youtube_url"
                    label="YouTube Channel"
                    outlined
                    hide-details
                    dense
                    class="rounded-0"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.twitter_url"
                    label="Twitter"
                    outlined
                    hide-details
                    dense
                    class="rounded-0"
                  />
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="form.line_id"
                    label="Line ID"
                    outlined
                    hide-details
                    dense
                    class="rounded-0"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider />
            <v-card-text>
              <div class="mb-13">
                <div class="d-flex mb-3">
                  <p class="font-weight-bold body-1 teal--text">
                    รูปภาพประกอบ
                  </p>
                  <v-btn
                    class="rounded-0 ml-5"
                    small
                    outlined
                    elevation="0"
                    @click="$bus.$emit('open-img-drop-form-images')"
                  >
                    {{ $t('NEW',{text: $t('IMAGE')}) }}
                  </v-btn>
                </div>
                <v-row>
                  <v-col
                    v-for="(image,index) in images"
                    :key="`image-${index}`"
                    cols="4"
                    sm="3"
                    md="4"
                    lg="2"
                  >
                    <v-hover v-slot="{ hover }">
                      <div class="d-flex align-center justify-center" style="height: 100px;">
                        <v-img :src="image.imagePreview" class="d-flex align-end" max-height="100px" contain>
                          <div class="d-flex mt-1 pa-2">
                            <v-spacer />
                            <div v-if="hover" class="text-center white rounded shadow" style="min-width: 25px;">
                              <v-icon small class="mt-n1" color="error" @click="onDeleteImage(image)">
                                fas fa-trash-alt
                              </v-icon>
                            </div>
                          </div>
                        </v-img>
                      </div>
                    </v-hover>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="primary"
                x-large
                block
                class="rounded-0"
                type="submit"
                :disabled="saving || !valid"
                :loading="saving"
              >
                บันทึก
              </v-btn>
            </v-card-actions>
          </v-card>
          <image-drop value="cover" header="รูปภาพหน้าปก" @selected="saveCover" />
          <image-drop value="images" multiple header="รูปภาพประกอบ" @selected="addImage" />
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modelName: 'โครงการวิ่ง',
      valid: true,
      saving: false,
      loaded: false,
      rules: {
        title: [
          v => !!v || 'กรุณากรอกชื่อโครงการวิ่ง'
        ],
        maximum_runners: [
          v => !!v || 'กรุณากรอกจำนวนนักวิ่งสูงสุดในงาน'
        ],
        event_location: [
          v => !!v || 'กรุณากรอกสถานที่จัดงาน'
        ],
        event_date: [
          v => !!v || 'กรุณาเลือกวันที่จัดงาน'
        ],
        regis_start: [
          v => !!v || 'กรุณาเลือกวันที่เริ่มต้นลงทะเบียน',
          v => !this.form.regis_end || (!!this.form.regis_end && new Date(v) < new Date(this.form.regis_end)) || 'วันที่เริ่มต้นลงทะเบียนต้องน้อยกว่าวันที่สิ้นสุดลงทะเบียน'
        ],
        regis_end: [
          v => !!v || 'กรุณาเลือกวันที่สิ้นสุดลงทะเบียน',
          v => !this.form.regis_start || (!!this.form.regis_start && new Date(v) > new Date(this.form.regis_start)) || 'วันที่สิ้นสุดลงทะเบียนต้องมากกว่าวันที่เริ่มต้นลงทะเบียน'
        ],
        header_name: [
          v => !!v || 'กรุณากรอกผู้รับผิดชอบโครงการ'
        ],
        sell_photo_start: [
          v => !!v || 'กรุณาเลือกวันที่เปิดจำหน่ายรูป',
          v => !this.form.sell_photo_end || (!!this.form.sell_photo_end && new Date(v) < new Date(this.form.sell_photo_end)) || 'วันที่เปิดจำหน่ายรูปต้องน้อยกว่าวันที่สิ้นสุดจำหน่ายรูป'
        ],
        sell_photo_end: [
          v => !!v || 'กรุณาเลือกวันที่สิ้นสุดจำหน่ายรูป',
          v => !this.form.sell_photo_start || (!!this.form.sell_photo_start && new Date(v) > new Date(this.form.sell_photo_start)) || 'วันที่สิ้นสุดจำหน่ายรูปต้องมากกว่าวันที่เปิดจำหน่ายรูป'
        ]
      },
      form: { },
      images: [],
      deleteImages: [],
      coverPreview: null
    }
  },
  computed: {
    headerText () {
      return !this.edit ? `เพิ่ม${this.modelName}` : `แก้ไข${this.modelName}`
    },
    headerIcon () {
      return !this.edit ? 'fas fa-plus' : 'fas fa-edit'
    }
  },
  created () {
    this.clearData()
    if (this.edit) {
      this.$overlay.showLoading()
      this.$bus.$on('bind-data', (oldData) => {
        if (oldData) {
          console.log('oldData', oldData)
          this.form = { ...this.form, ...oldData }
          this.form.regis_start = this.$dayjs(this.form.regis_start).format('YYYY-MM-DD HH:mm:ss')
          this.form.regis_end = this.$dayjs(this.form.regis_end).format('YYYY-MM-DD HH:mm:ss')
          this.form.sell_photo_start = this.$dayjs(this.form.sell_photo_start).format('YYYY-MM-DD HH:mm:ss')
          this.form.sell_photo_end = this.$dayjs(this.form.sell_photo_end).format('YYYY-MM-DD HH:mm:ss')
          this.images = oldData.EventImages.map((ele) => {
            return {
              id: ele.id,
              imagePreview: ele.url
            }
          })
        }
        this.loaded = true
        setTimeout(() => {
          if (this.$refs.form) {
            this.$refs.form.resetValidation()
            this.$overlay.hide()
          }
        })
      })
    } else {
      this.loaded = true
    }
  },
  beforeDestroy () {
    this.$bus.$off('bind-data')
  },
  methods: {
    addImage (images) {
      for (const image of images) {
        this.images.push({
          image,
          imagePreview: URL.createObjectURL(image)
        })
      }
      this.$overlay.hide()
    },
    onDeleteImage (image) {
      if (image.id) {
        this.deleteImages.push(image.id)
      }
      const imageIndex = this.$_.findIndex(this.images, { imagePreview: image.imagePreview })
      if (imageIndex !== -1) {
        this.images.splice(imageIndex, 1)
      }
    },
    clearData () {
      this.form = {
        title: '',
        description: '',
        tel: '',
        email: '',
        facebook_url: '',
        twitter_url: '',
        youtube_url: '',
        line_id: '',
        header_name: '',
        regis_start: null,
        regis_end: null,
        event_date: null,
        event_location: '',
        maximum_runners: null,
        sell_photo_start: null,
        sell_photo_end: null,
        upload_status: true,
        status: true,
        cover: null
      }
    },
    saveCover (data) {
      this.form.cover = data
      this.coverPreview = URL.createObjectURL(data)
      this.$overlay.hide()
    },
    save () {
      if (this.$refs.form.validate()) {
        this.saving = true
        if (this.deleteImages.length > 0) {
          this.form.image_delete_id = JSON.stringify(this.deleteImages)
        }
        const formData = new FormData()
        for (const [key, value] of Object.entries(this.form)) {
          formData.append(key, value)
        }
        for (const image of this.images) {
          if (image.image) {
            formData.append('image', image.image)
          }
        }
        this.$emit('save', formData)
      } else {
        this.$nextTick(() => {
          this.$vuetify.goTo('.error--text', { offset: 100 })
        })
      }
    }
  }
}
</script>
