<template>
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
        class="rounded-0"
        :class="{'ml-1 mr-3': ['xl', 'lg'].includes($vuetify.breakpoint.name)}"
        :small="['md'].includes($vuetify.breakpoint.name)"
        color="primary"
        :to="localePath({ name: 'home' })"
      >
        {{ $t('HOME') }}
      </v-btn>
      <v-btn
        v-if="['xl', 'lg','md'].includes($vuetify.breakpoint.name)"
        active-class="font-weight-bold border-b rounded-0"
        plain
        class="rounded-0"
        :class="{'mr-3': ['xl', 'lg'].includes($vuetify.breakpoint.name)}"
        :small="['md'].includes($vuetify.breakpoint.name)"
        color="primary"
        :to="localePath({ name: 'events' })"
      >
        {{ $t('EVENTS') }}
      </v-btn>
      <v-btn
        v-if="['xl', 'lg','md'].includes($vuetify.breakpoint.name)"
        active-class="font-weight-bold border-b rounded-0"
        plain
        class="rounded-0"
        :class="{'mr-3': ['xl', 'lg'].includes($vuetify.breakpoint.name)}"
        :small="['md'].includes($vuetify.breakpoint.name)"
        color="primary"
        :to="localePath({ name: 'about' })"
      >
        {{ $t('ABOUT') }}
      </v-btn>
      <v-btn
        v-if="['xl', 'lg','md'].includes($vuetify.breakpoint.name)"
        active-class="font-weight-bold border-b rounded-0"
        plain
        class="rounded-0"
        :class="{'mr-3': ['xl', 'lg'].includes($vuetify.breakpoint.name)}"
        :small="['md'].includes($vuetify.breakpoint.name)"
        color="primary"
        :to="localePath({ name: 'contact-us' })"
      >
        {{ $t('CONTACT_US') }}
      </v-btn>

      <v-spacer />

      <v-menu
        v-if="!$auth.loggedIn"
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
            class="px-1 rounded-0"
            v-on="on"
          >
            <v-avatar size="18" class="mr-1" tile>
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
            <v-list-item-avatar size="30" tile>
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
        :to="localePath({ name: 'cart' })"
      >
        <v-icon>
          mdi-cart-variant
        </v-icon>
      </v-btn>

      <v-menu
        v-if="$auth.loggedIn"
        offset-y
        bottom
        left
        nudge-bottom="10"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            class="ml-3 elevation-0"
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar
              v-if="$auth.user.avatar"
              size="28"
            >
              <v-img :src="$auth.user.avatar" />
            </v-avatar>
            <v-icon v-else>
              mdi-account-circle
            </v-icon>
          </v-btn>
        </template>

        <v-list class="py-0" color="primary" dark>
          <v-subheader>{{ `${$auth.user.firstname} ${$auth.user.lastname}` || $auth.user.email }}</v-subheader>
          <v-list-item v-for="(item,index) in profiles" :key="`${item.text}-${index}`" :to="localePath({ name: item.url })">
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
          <v-divider v-if="$auth.loggedIn && permissionToBackend" />
          <v-list-item v-if="$auth.loggedIn && permissionToBackend" :to="localePath({ name: 'backend' })">
            <v-list-item-icon class="mr-2">
              <v-icon small>
                fas fa-tasks
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('BACKEND_MANAGE') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider v-if="$auth.loggedIn && permissionToBackend" />
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
      <v-btn
        v-if="!$auth.loggedIn"
        small
        text
        color="primary"
        class="ml-1 rounded-0"
        :to="localePath({ name: 'login' })"
      >
        <span class="font-weight-bold">
          {{ $t('LOGIN') }}
        </span>
      </v-btn>
      <v-btn
        v-if="!$auth.loggedIn"
        small
        depressed
        color="info"
        class="ml-1 rounded-0"
        :to="localePath({ name: 'register' })"
      >
        <span class="font-weight-bold">
          {{ $t('REGISTER') }}
        </span>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    profiles () {
      return this.$store.state.profiles
    },
    permissionToBackend () {
      return ['admin'].includes(this.$auth.user.role)
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
</style>
