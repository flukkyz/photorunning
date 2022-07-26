<template>
  <div class="grey lighten-5 py-16">
    <v-container :class="{ 'px-16': ['sm', 'xs'].includes($vuetify.breakpoint.name)}">
      <v-row>
        <v-col cols="12" md="5">
          <v-card class="rounded-0 shadow">
            <v-card-text class="px-8 py-16">
              <h1 class="display-1 font-weight-bold mb-5">
                {{ $t('CONTACT_US') }}
              </h1>
              <forms-contact />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" offset-md="1">
          <div class="mt-10">
            <p class="headline mb-1 font-weight-bold">
              {{ setting.app_name }}
            </p>
            <p class="title">
              {{ setting.contact_address }}
            </p>
            <v-row>
              <v-col cols="12" sm="6" md="12" lg="6">
                <div v-if="setting.contact_email" class="d-flex align-center mb-5">
                  <a :href="`mailto:${setting.contact_email}`" target="_blank">
                    <v-icon color="primary" large>
                      mdi-email
                    </v-icon>
                  </a>
                  <div class="ml-3">
                    <p class="mb-0 ">
                      E-mail
                    </p>
                    <a :href="`mailto:${setting.contact_email}`" target="_blank">
                      <p class="mb-0  black--text font-weight-bold">
                        {{ setting.contact_email }}
                      </p>
                    </a>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="12" lg="6">
                <div v-if="setting.contact_tel" class="d-flex align-center mb-5">
                  <a :href="`telto:${setting.contact_tel}`" target="_blank">
                    <v-icon color="primary" large>
                      mdi-phone
                    </v-icon>
                  </a>
                  <div class="ml-3">
                    <p class="mb-0 ">
                      {{ $t('PHONE_NUMBER') }}
                    </p>
                    <a :href="`telto:${setting.contact_tel}`" target="_blank">
                      <p class="mb-0  black--text font-weight-bold">
                        {{ setting.contact_tel }}
                      </p>
                    </a>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <iframe
            v-if="setting.contact_map_url"
            :src="setting.contact_map_url"
            width="100%"
            height="400"
            class="rounded-0 mt-16"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.$t('CONTACT_US'),
      urlPath: this.$route.fullPath
    })
  },
  computed: {
    setting () {
      return this.$store.state.setting
    }
  }
}
</script>
