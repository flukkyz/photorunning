<template>
  <v-app dark>
    <client-only>
      <div v-if="['xs', 'sm'].includes($vuetify.breakpoint.name)">
        <v-navigation-drawer
          v-model="drawer"
          width="300"
          class="elevation-1 blurdrop"
          color="transparent"
          overlay-opacity="0"
          app
        >
          <nuxt-link :to="localePath({name: 'index'})">
            <div class="mt-8 mb-5 mx-10">
              <v-img src="/images/logo.png" contain width="162" height="45" class="mx-auto" />
            </div>
          </nuxt-link>

          <v-list class="mx-10">
            <v-list-item
              router
              exact
              :to="localePath({ name: 'mock-home'})"
            >
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="$t('HOME')" />
            </v-list-item>
            <v-list-item
              router
              exact
              :to="localePath({ name: 'mock-events'})"
            >
              <v-list-item-icon>
                <v-icon>mdi-run-fast</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="$t('EVENTS')" />
            </v-list-item>
            <v-list-item
              router
              exact
              :to="localePath({ name: 'mock-about'})"
            >
              <v-list-item-icon>
                <v-icon>mdi-information</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="$t('ABOUT')" />
            </v-list-item>
            <v-list-item
              router
              exact
              :to="localePath({ name: 'mock-contact-us'})"
            >
              <v-list-item-icon>
                <v-icon>mdi-contacts</v-icon>
              </v-list-item-icon>
              <v-list-item-title v-text="$t('CONTACT_US')" />
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>

      <v-app-bar
        color="white"
        elevation="0"
        height="60"
        fixed
        flat
      >
        <v-container class="d-flex align-center">
          <img
            v-if="['xs', 'sm'].includes($vuetify.breakpoint.name)"
            src="/images/icon.png"
            class="mr-2 pointer"
            width="50"
            @click.stop="toggleDrawer"
          >
          <!-- <v-app-bar-nav-icon v-if="['xs', 'sm'].includes($vuetify.breakpoint.name)" class="mr-2" @click.stop="toggleDrawer" /> -->
          <NuxtLink v-if=" ['xl', 'lg','md'].includes($vuetify.breakpoint.name)" :to="localePath({name: 'index'})">
            <v-toolbar-title :class="{'ml-n4': ['xl', 'lg','md'].includes($vuetify.breakpoint.name)}">
              <div class="d-flex align-end">
                <img src="/images/logo.png" :height="['xl', 'lg'].includes($vuetify.breakpoint.name) ? '40' : '30'" contain alt="Logo">
              </div>
            </v-toolbar-title>
          </NuxtLink>

          <v-btn
            v-if="['xl', 'lg','md'].includes($vuetify.breakpoint.name)"
            active-class="font-weight-bold border-b rounded-0"
            plain
            :class="{'ml-1 mr-3': ['xl', 'lg'].includes($vuetify.breakpoint.name)}"
            :small="['md'].includes($vuetify.breakpoint.name)"
            color="primary"
            :to="localePath({ name: 'mock-home' })"
          >
            {{ $t('HOME') }}
          </v-btn>
          <v-btn
            v-if="['xl', 'lg','md'].includes($vuetify.breakpoint.name)"
            active-class="font-weight-bold border-b rounded-0"
            plain
            :class="{'mr-3': ['xl', 'lg'].includes($vuetify.breakpoint.name)}"
            :small="['md'].includes($vuetify.breakpoint.name)"
            color="primary"
            :to="localePath({ name: 'mock-events' })"
          >
            {{ $t('EVENTS') }}
          </v-btn>
          <v-btn
            v-if="['xl', 'lg','md'].includes($vuetify.breakpoint.name)"
            active-class="font-weight-bold border-b rounded-0"
            plain
            :class="{'mr-3': ['xl', 'lg'].includes($vuetify.breakpoint.name)}"
            :small="['md'].includes($vuetify.breakpoint.name)"
            color="primary"
            :to="localePath({ name: 'mock-about' })"
          >
            {{ $t('ABOUT') }}
          </v-btn>
          <v-btn
            v-if="['xl', 'lg','md'].includes($vuetify.breakpoint.name)"
            active-class="font-weight-bold border-b rounded-0"
            plain
            :class="{'mr-3': ['xl', 'lg'].includes($vuetify.breakpoint.name)}"
            :small="['md'].includes($vuetify.breakpoint.name)"
            color="primary"
            :to="localePath({ name: 'mock-contact-us' })"
          >
            {{ $t('CONTACT_US') }}
          </v-btn>

          <v-spacer />

          <v-menu
            offset-y
            bottom
            left
          >
            <template #activator="{ on, attrs }">
              <v-btn
                small
                v-bind="attrs"
                text
                color="info"
                class="px-1"
                v-on="on"
              >
                <v-avatar size="18" class="mr-1">
                  <v-img :src="`https://flagcdn.com/h20/${$i18n.localeProperties.countryCode}.webp`" />
                </v-avatar>
                <span v-if="['xl', 'lg','md'].includes($vuetify.breakpoint.name)">
                  {{ $i18n.localeProperties.name }}
                </span>
                <v-icon>
                  mdi-menu-down
                </v-icon>
              </v-btn>
            </template>

            <v-list class="py-0">
              <v-subheader>{{ $t('CHANGE', {text: $t('LANGUAGE')}) }}</v-subheader>
              <v-list-item
                v-for="lang in $i18n.locales"
                :key="lang.code"
                :to="switchLocalePath(lang.code)"
              >
                <v-list-item-avatar size="30">
                  <v-img :src="`https://flagcdn.com/h40/${lang.countryCode}.webp`" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title :class="$hexIsLight($vuetify.theme.themes.light.topbar) ? 'accent--text' : 'white--text'" v-text="lang.name" />
                  <v-list-item-subtitle v-text="lang.subName" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            icon
            class="ml-3 elevation-0"
            :to="localePath({ name: 'mock-cart' })"
          >
            <v-icon>
              mdi-cart-variant
            </v-icon>
          </v-btn>

          <v-menu
            offset-y
            bottom
            left
            nudge-bottom="10"
          >
            <template #activator="{ on, attrs }">
              <v-btn
                icon
                small
                class="ml-3 elevation-0"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-account-circle
                </v-icon>
              </v-btn>
            </template>

            <v-list class="py-0" color="grey lighten-5">
              <v-subheader>Jack Kerby</v-subheader>
              <v-list-item v-for="(item,index) in profiles" :key="`${item.text}-${index}`">
                <v-list-item-icon class="mr-2">
                  <v-icon>
                    {{ item.icon }}
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t(item.text) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item :to="localePath({ name: 'logout' })">
                <v-list-item-icon class="mr-2">
                  <v-icon>
                    mdi-logout
                  </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('LOGOUT') }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-container>
      </v-app-bar>
    </client-only>
    <v-main style="margin-top: 50px;">
      <breadcrumbs />
      <nuxt />
    </v-main>
    <client-only>
      <snackbar />
      <overlay />
      <b-t-t v-if="!$vuetify.breakpoint.mobile" />

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
                  บริษัท โฟโต้รันนิ่ง จำกัด
                </h3>
                <p class="mb-0" :class="{'text-center': ['sm', 'xs'].includes($vuetify.breakpoint.name)}">
                  99 ถนนสุเทพ ตำบลสุเทพ อำเภอเมือง จังหวัดเชียงใหม่ 50000
                </p>
                <v-row class="my-5">
                  <v-col cols="12" sm="6" md="12" lg="6">
                    <div class="d-flex align-center mb-5">
                      <a href="mailto:photorunning@gmail.com" target="_blank">
                        <v-icon color="primary" large>
                          mdi-email
                        </v-icon>
                      </a>
                      <div class="ml-3">
                        <p class="mb-0 ">
                          E-mail
                        </p>
                        <a href="mailto:photorunning@gmail.com" target="_blank">
                          <p class="mb-0  black--text font-weight-bold">
                            photorunning@gmail.com
                          </p>
                        </a>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="12" lg="6">
                    <div class="d-flex align-center mb-5">
                      <a href="telto:0999999999" target="_blank">
                        <v-icon color="primary" large>
                          mdi-phone
                        </v-icon>
                      </a>
                      <div class="ml-3">
                        <p class="mb-0 ">
                          โทร.
                        </p>
                        <a href="telto:0999999999" target="_blank">
                          <p class="mb-0  black--text font-weight-bold">
                            099 999 9999
                          </p>
                        </a>
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <!-- </div> -->
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
            ©  {{ new Date().getFullYear() }} PhotoRunning. All Rights Reserved.
          </v-col>
        </v-footer>
      </div>
    </client-only>
  </v-app>
</template>

<script>
export default {
  computed: {
    profiles () {
      return this.$store.state.profiles
    },
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('setDrawer', val)
      }
    }
  },
  methods: {
    toggleDrawer () {
      this.$store.commit('setDrawer', !this.$store.state.drawer)
    }
  }
}
</script>

      <style lang="scss" scoped>
        .border-b{
        border-bottom: solid 2px #224293;
        }
        .blurdrop{
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  background-color: rgba(233, 239, 255,0.5);
}
.v-list.mx-10 > .v-list-item{
  margin-top: 5px;
}
.v-list.mx-10 > .v-list-group{
  margin-top: 5px;
}
.v-list .v-list-group__items > .v-list-item{
  min-height: 40px;
}
.v-list.mx-10 .v-list-group__items > .v-list-item{
  padding-left: 40px !important;
  margin-left: 30px;
  margin-right: -10px;
}
.v-list .v-list-group.v-list-group--active{
  background-color: #e6e6e6;
}
.v-list.mx-10 .v-list-group.v-list-group--active{
  padding-bottom: 15px;
}

.v-list-item, .v-list-item .v-icon, .v-list-group .v-list-item__content, .v-list-group__header .v-icon{
  color: #5f5f5f !important;
}
.v-list-group--active .v-list-item__content, .v-list-group--active .v-list-item__icon .v-icon{
  color: #224293 !important;
}
.v-list-item--active{
  background-color: #224293 !important;
  color: #fff !important;
}
.v-list-item--active .v-icon{
  color: #fff !important;
}
      </style>
