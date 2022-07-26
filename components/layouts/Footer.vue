<template>
  <div class="">
    <v-footer class="pt-16 pb-5" color="white">
      <v-container justify="center">
        <v-row>
          <v-col cols="12" md="4">
            <nuxt-link :to="localePath({name: 'index'})">
              <v-img src="/images/logo.png" contain max-width="150" class="mx-auto" />
            </nuxt-link>
          </v-col>
          <v-col cols="12" md="8">
            <h3>
              {{ setting.app_name }}
            </h3>
            <p class="mb-0" :class="{'text-center': ['sm', 'xs'].includes($vuetify.breakpoint.name)}">
              {{ setting.contact_address }}
            </p>
            <v-row class="my-5">
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
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
    <v-divider />
    <v-footer padless color="white">
      <v-col
        class="text-center grey--text"
        cols="12"
      >
        ©  {{ new Date().getFullYear() }} {{ setting.app_name }}. All Rights Reserved.
      </v-col>
    </v-footer>
  </div>
</template>

<script>
export default {
  computed: {
    setting () {
      return this.$store.state.setting
    }
  }
}
</script>
