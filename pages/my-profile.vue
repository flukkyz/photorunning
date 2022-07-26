<template>
  <div v-if="profile" class="grey lighten-5 pa-5 rounded-0">
    <div class="d-flex">
      <h2 class="mb-5">
        {{ pageName }}
      </h2>
      <v-spacer />
      <p class="caption grey--text mt-2 mb-0 font-weight-bold ml-3">
        {{ $t('YOUR_CODE') }}
      </p>
      <h3 class="primary--text ml-2 mr-3">
        {{ profile.code }}
      </h3>
    </div>
    <div class="d-flex flex-wrap align-center mb-3">
      <p class="body-1 mb-0 font-weight-bold mr-5">
        {{ $t('YOUR_LANGUAGE') }}
      </p>
      <v-btn-toggle
        v-model="profile.lang"
        mandatory
        tile
        color="deep-purple accent-3"
        group
        @change="changeLanguage"
      >
        <v-btn
          v-for="lang in $i18n.locales"
          :key="`lang-${lang.code}`"
          small
          class="py-5 rounded-0"
          :value="lang.code"
        >
          <v-list-item-avatar size="20" class="mr-2">
            <v-img :src="`https://flagcdn.com/h20/${lang.countryCode}.webp`" />
          </v-list-item-avatar>
          {{ lang.name }}
        </v-btn>
      </v-btn-toggle>
    </div>
    <v-row>
      <v-col cols="12" md="5">
        <div class="d-flex flex-column align-center mt-4">
          <p class="body-1 mb-3 font-weight-bold">
            {{ $t('PROFILE_IMAGE') }}
          </p>
          <v-avatar size="120" class="shadow">
            <v-img v-if="imgPreview" :src="imgPreview" />
            <v-img v-else-if="profile.avatar" :src="profile.avatar" />
            <v-img v-else src="/images/logo.png" />
          </v-avatar>
          <div class="d-flex mt-5">
            <v-btn
              class="rounded-0"
              x-small
              outlined
              depressed
              @click="$bus.$emit('open-img-browse-form')"
            >
              {{ $t('CHANGE',{text: $t('IMAGE')}) }}
            </v-btn>
            <v-btn
              v-if="imgPreview"
              class="rounded-0 ml-2"
              x-small
              depressed
              color="primary"
              @click="saveChangeImage"
            >
              {{ $t('SAVE') }}
            </v-btn>
            <v-btn
              v-if="imgPreview"
              class="rounded-0 ml-2"
              x-small
              depressed
              color="error"
              @click="cancelChangeImage"
            >
              {{ $t('CANCEL') }}
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <div class="white px-5 py-3 rounded-0 mt-2">
          <div class="mb-3">
            <p class="mb-0 font-weight-bold mr-5 body-1">
              E-mail
            </p>
            <p class="mb-0 title primary--text white">
              {{ profile.email }}
            </p>
          </div>
          <v-divider class="my-2" />
          <div class="mb-3">
            <p class="mb-0 font-weight-bold mr-5 caption">
              {{ $t('CITIZEN_ID') }}
            </p>
            <p class="mb-0">
              {{ profile.citizen_id || '-' }}
            </p>
          </div>
          <div class="mb-3">
            <p class="mb-0 font-weight-bold mr-5 caption">
              {{ $t('NAME') }}
            </p>
            <p class="mb-0">
              {{ profile.firstname || '-' }}
              {{ profile.lastname }}
            </p>
          </div>
          <div class="mb-3">
            <p class="mb-0 font-weight-bold mr-5 caption">
              {{ $t('ADDRESS') }}
            </p>
            <p class="mb-0">
              {{ profile.address || '-' }}
              {{ profile.zipcode }}
            </p>
          </div>
          <div class="mb-3">
            <p class="mb-0 font-weight-bold mr-5 caption">
              {{ $t('COUNTRY') }}
            </p>
            <div v-if="profile.Country" class="d-flex align-center">
              <v-avatar
                size="20"
                class="mr-2"
              >
                <v-img :src="`https://flagcdn.com/h20/${profile.Country.code.toLowerCase()}.webp`" />
              </v-avatar>
              <p class="mb-0">
                {{ profile.Country.name }}
              </p>
            </div>
            <p v-else class="mb-0">
              -
            </p>
          </div>
          <div class="mb-3">
            <p class="mb-0 font-weight-bold mr-5 caption">
              {{ $t('PHONE_NUMBER') }}
            </p>
            <p v-if="profile.tel" class="mb-0">
              <span v-if="profile.Country" class="font-weight-bold">
                {{ `(+${profile.Country.phone})` }}
              </span>
              {{ profile.tel }}
            </p>
            <p v-else class="mb-0">
              -
            </p>
          </div>
        </div>
        <div class="mt-3">
          <v-btn
            depressed
            class="rounded-0"
            color="info"
            @click="$bus.$emit('open-profile-form',profile)"
          >
            {{ $t('EDIT',{text: $t('PROFILE')}) }}
          </v-btn>
          <v-btn
            v-if="!!profile.password_created_at"
            depressed
            class="rounded-0 ml-2"
            outlined
            color="primary"
            @click="$bus.$emit('open-change-password-form')"
          >
            {{ $t('CHANGE_PASSWORD') }}
          </v-btn>
          <v-btn
            v-else
            depressed
            class="rounded-0 ml-2"
            color="primary"
            @click="$bus.$emit('open-change-password-form')"
          >
            {{ $t('CREATE_PASSWORD') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <forms-profile @save="saveProfile" />
    <forms-change-password :has-password="!!profile.password_created_at" @save="savePassword" />
    <image-browse :header="$t('PROFILE_IMAGE')" @selected="saveImage" />
  </div>
</template>

<script>
export default {
  layout: 'profile',
  middleware: ['authen'],
  data () {
    return {
      updateProfileApi: `${process.env.apiUrl}${process.env.apiDirectory}auth/update-profile`,
      updatePasswordApi: `${process.env.apiUrl}${process.env.apiDirectory}auth/update-password`,
      updateAvatarApi: `${process.env.apiUrl}${process.env.apiDirectory}auth/update-avatar`,
      pageName: this.$t('PROFILE_INFO'),
      profile: null,
      imgPreview: null
    }
  },
  async fetch () {
    try {
      await this.$auth.fetchUser()
      this.profile = { ...this.$auth.user }
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
    this.$overlay.hide()
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.pageName,
      urlPath: this.$route.fullPath
    })
  },
  mounted () {
    // setTimeout(() => {
    //   if (!this.profile.citizen_id ||
    //     !this.profile.firstname ||
    //     !this.profile.lastname ||
    //     !this.profile.tel ||
    //     !this.profile.address ||
    //     !this.profile.zipcode ||
    //     !this.profile.country_id) {
    //     this.$bus.$emit('open-profile-form', this.profile, false)
    //   } else if (this.profile.BankAccounts.length === 0) {
    //     this.$router.push(this.localePath({ name: 'my-bankbook' }))
    //   }
    // }, 1000)
  },
  methods: {
    async changeLanguage (val) {
      await this.saveProfile(this.profile, false)
      this.$router.push(this.switchLocalePath(val))
    },
    saveImage (data) {
      this.profile.avatar_img = data
      this.imgPreview = URL.createObjectURL(data)
      this.$overlay.hide()
    },
    async saveChangeImage () {
      this.$overlay.showLoading()
      const formData = new FormData()
      for (const [key, value] of Object.entries(this.profile)) {
        formData.append(key, value)
      }
      try {
        await this.$axios.$post(`${this.updateAvatarApi}`, formData)
        this.$notifier.showMessage({ title: this.$t('UPDATED'), content: this.$t('UPDATED_', { text: this.$t('PROFILE_IMAGE') }), color: 'success' })
        this.imgPreview = null
        await this.$fetch()
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
    },
    cancelChangeImage () {
      this.imgPreview = null
    },
    async saveProfile (data, noti = true) {
      try {
        await this.$axios.$post(`${this.updateProfileApi}`, data)
        if (noti) {
          this.$notifier.showMessage({ title: this.$t('UPDATED'), content: this.$t('UPDATED_', { text: this.$t('PROFILE') }), color: 'success' })
        }
        if (this.profile.BankAccounts.length === 0) {
          this.$router.push(this.localePath({ name: 'my-bankbook' }))
        } else {
          await this.$fetch()
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
    },
    async savePassword (data) {
      try {
        await this.$axios.$post(`${this.updatePasswordApi}`, data)
        this.$notifier.showMessage({ title: this.$t('UPDATED'), content: this.$t('UPDATED_', { text: ' Password ' }), color: 'success' })
        await this.$fetch()
      } catch (e) {
        this.$notifier.showMessage({ title: this.$t('INVALID', { text: this.$t('OLD_PASSWORD') }), content: this.$t('INCORRECT_OLD_PASSWORD_DETAIL'), color: 'error' })
        this.$overlay.hide()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field-text{
  width: 200px;
}
</style>
