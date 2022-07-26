<template>
  <v-container v-if="setting">
    <v-row justify="center" class="mb-10">
      <v-col cols="12">
        <v-card class="rounded-0 shadow mb-5" color="grey lighten-5">
          <v-card-title>
            <h3 class="mr-3 info--text">
              ข้อมูลทั่วไป
            </h3>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="setting.app_name"
              class="rounded-0"
              label="ชื่อเว็บไซต์"
              outlined
              @change="changeAppname"
            />
            <v-row>
              <v-col cols="12" md="6">
                <v-textarea
                  v-model="setting.contact_address"
                  rows="5"
                  class="rounded-0"
                  label="ที่อยู่"
                  outlined
                  dense
                  hide-details
                  @change="save(setting)"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="setting.contact_email"
                  class="mb-3 rounded-0"
                  label="E-mail"
                  outlined
                  dense
                  hide-details
                  @change="save(setting)"
                />
                <v-text-field
                  v-model="setting.contact_tel"
                  class="mb-3 rounded-0"
                  :label="$t('PHONE_NUMBER')"
                  outlined
                  dense
                  hide-details
                  @change="save(setting)"
                />
                <v-text-field
                  v-model="setting.contact_map_url"
                  class="rounded-0"
                  label="Url แผนที่"
                  outlined
                  dense
                  hide-details
                  @change="save(setting)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="rounded-0 shadow mb-5" color="grey lighten-5">
          <v-card-title>
            <h3 class="mr-3 info--text">
              ข้อมูลเครดิต
            </h3>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-currency-field
                  v-model.number="setting.credit_regis"
                  :decimal-length="0"
                  label="เครดิตเริ่มแรกหลังการสมัคร"
                  class="rounded-0"
                  outlined
                  dense
                  suffix="เครดิต"
                  :min="0"
                  :max="999999999999"
                  @change="save(setting)"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card class="rounded-0 shadow mb-5" color="grey lighten-5">
          <v-card-title>
            <h3 class="mr-3 info--text">
              ข้อมูลหน้า About
            </h3>
            <v-spacer />
            <v-btn
              fab
              class="shadow rounded-0"
              x-small
              color="warning"
              @click="$bus.$emit('open-popup-form', setting,'about_page','หน้า About')"
            >
              <v-icon small>
                fas fa-edit
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div v-if="setting.about_page" class="pa-8 rounded-0 white">
              <div class="ck-content" v-html="setting.about_page" />
            </div>
            <h2 v-else class="pa-8 text-center grey--text">
              ยังไม่มีข้อมูล
            </h2>
          </v-card-text>
        </v-card>

        <v-card class="rounded-0 shadow mb-5" color="grey lighten-5">
          <v-card-title>
            <h3 class="mr-3 info--text">
              ข้อมูล Pop up หน้าแรก
            </h3>
            <v-switch
              v-model="setting.popup_show"
              inset
              class="ml-1"
              :color="setting.popup_show ? 'success' : 'error'"
              @change="save(setting)"
            >
              <template #label>
                <span v-if="setting.popup_show" class="success--text font-weight-bold title">
                  เปิดการแสดงข้อมูลในหน้าหลัก
                </span>
                <span v-else class="error--text font-weight-bold title">
                  ปิดการแสดงข้อมูลในหน้าหลัก
                </span>
              </template>
            </v-switch>
            <v-checkbox
              v-model="setting.popup_close"
              class="ml-3"
              :disabled="!setting.popup_show"
              label="แสดงปุ่ม ปิด Pop up"
              @change="save(setting)"
            />
            <v-spacer />
            <v-btn
              fab
              class="shadow rounded-0"
              x-small
              color="warning"
              @click="$bus.$emit('open-popup-form', setting,'popup_content',' Pop up หน้าแรก')"
            >
              <v-icon small>
                fas fa-edit
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div v-if="setting.popup_content" class="pa-8 rounded-0 white">
              <div class="ck-content" v-html="setting.popup_content" />
            </div>
            <h2 v-else class="pa-8 text-center grey--text">
              ยังไม่มีข้อมูล
            </h2>
          </v-card-text>
        </v-card>

        <v-card class="rounded-0 shadow mb-5" color="grey lighten-5">
          <v-card-title>
            <h3 class="mr-3 info--text">
              ข้อมูล PDPA
            </h3>
            <v-spacer />
            <v-btn
              fab
              class="shadow rounded-0"
              x-small
              color="warning"
              @click="$bus.$emit('open-popup-form', setting,'pdpa',' PDPA',false)"
            >
              <v-icon small>
                fas fa-edit
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <div v-if="setting.pdpa" class="pa-8 rounded-0 white">
              <div class="ck-content" v-html="setting.pdpa" />
            </div>
            <h2 v-else class="pa-8 text-center grey--text">
              ยังไม่มีข้อมูล
            </h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <forms-popup
      @save="save"
    />
  </v-container>
</template>

<script>
export default {
  layout: 'back',
  middleware: ['authen', 'backend'],
  data () {
    return {
      api: `${process.env.apiUrl}${process.env.apiDirectory}setting`,
      modelName: 'ตั้งค่า',
      setting: null
    }
  },
  async fetch () {
    try {
      const setting = await this.$axios.$get(this.api)
      this.setting = setting
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  head () {
    return {
      title: this.modelName
    }
  },
  methods: {
    async changeAppname (val) {
      if (val.trim().length > 0) {
        await this.save(this.setting)
      } else {
        this.$notifier.showMessage({ title: 'บังคับกรอกชื่อเว็บไซต์', content: 'กรุณากรอกชื่อเว็บไซต์', color: 'error' })
      }
    },
    async save (data) {
      if (!this.setting.credit_regis) {
        this.setting.credit_regis = 0
      }

      try {
        const result = await this.$axios.$put(this.api, data)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'ปรับปรุงข้อมูลสำเร็จ', content: 'ปรับปรุงข้อมูลสำเร็จ', color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
      this.$overlay.hide()
    }
  }
}
</script>
