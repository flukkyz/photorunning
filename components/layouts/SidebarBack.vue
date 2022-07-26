<template>
  <div v-if="$auth.loggedIn && permissionToBackend">
    <v-navigation-drawer
      width="350"
      color="grey lighten-5"
      app
      permanent
      :mini-variant="mini && mobileScale"
    >
      <div class="d-flex">
        <v-btn
          v-if="mobileScale"
          fab
          small
          elevation="0"
          depressed
          class="mt-1"
          :class="mini ? 'mx-auto' : 'ml-auto mr-1'"
          @click="mini = !mini"
        >
          <v-avatar v-if="mini">
            <img
              src="/images/icon.png"
            >
          </v-avatar>
          <v-icon v-else small v-text="mini ? 'mdi-menu' : 'mdi-arrow-left'" />
        </v-btn>
      </div>

      <div v-if="fullSidebar" class="pt-3 pb-1" :class="mobileScale ? 'mx-10 mb-3 mt-n1' : 'mt-10 mx-10 mb-3'">
        <v-img src="/images/logo.png" contain width="162" height="57" class="mx-auto" />
      </div>

      <v-list v-if="fullSidebar" two-line class="mx-8">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="info" large>
              fas fa-user-circle
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="title info--text" v-text="`${$auth.user.firstname} ${$auth.user.lastname}` || $auth.user.email" />
            <v-list-item-subtitle class="grey--text" v-text="$auth.user.role" />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider
        :class="fullSidebar ? 'mx-10' : 'mt-1'"
      />

      <v-list :class="fullSidebar ? 'mx-10' : 'py-0'">
        <template v-for="(item, index) in menus">
          <v-subheader
            v-if="item.header"
            :key="`${item.header}-${index}`"
            class=" font-weight-bold"
            v-text="item.header"
          />

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          />

          <v-list-group
            v-else-if="item.group"
            :key="`${item.group}-${index}`"
            :value="$route.name && item.items.map(ele => ele.url).includes($route.name.replaceAll(/-id|-form/gi,'').slice(0, -5))"
            :prepend-icon="item.icon"
            append-icon=""
          >
            <template #activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.group" />
              </v-list-item-content>
            </template>
            <template #prependIcon>
              <v-icon>{{ item.icon }}</v-icon>
            </template>

            <template v-for="(subItem, i) in item.items">
              <v-list-item
                v-if="!subItem.roles || (subItem.roles && subItem.roles.includes($auth.user.role))"
                :key="`${item.group}-${i}`"
                class="py-0"
                link
                :to="localePath(subItem.url)"
              >
                <v-list-item-title class="py-0" :class="fullSidebar ? '' : 'very-small'" v-text="subItem.text" />
              </v-list-item>
            </template>
          </v-list-group>

          <v-list-item
            v-else-if="!item.roles || (item.roles && item.roles.includes($auth.user.role))"
            :key="`${item.text}-${index}`"
            router
            exact
            :to="localePath(item.url)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </template>
      </v-list>
      <template #append>
        <div :class="fullSidebar ? 'pa-3' : ''">
          <v-btn
            block
            color="info"
            large
            class="rounded-0"
            :class="fullSidebar ? '' : 'mx-auto'"
            dark
            @click.stop="logout"
          >
            <v-icon small :left="fullSidebar">
              fas fa-sign-out-alt
            </v-icon>
            <span v-if="fullSidebar">
              LOGOUT
            </span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mini: false
    }
  },
  computed: {
    mobileScale () {
      return ['md', 'sm', 'xs'].includes(this.$vuetify.breakpoint.name)
    },
    fullSidebar () {
      return !this.mini || !this.mobileScale
    },
    menus () {
      return this.$store.state.backend
    },
    permissionToBackend () {
      return ['admin'].includes(this.$auth.user.role)
    }
  },
  created () {
    this.mini = this.mobileScale
  },
  methods: {
    goTo (link) {
      if (this.$route.name && this.$route.name.substr(0, 5) === 'index' && link.slide) {
        let target = 0
        if (link.url !== 'index') {
          target = '#section-' + link.url
        }
        this.$vuetify.goTo(target, {
          offset: link.offset || 0
        })
        this.$store.commit('setDrawer', false)
      } else {
        this.$router.push(this.localePath(link.url))
      }
    },
    async logout () {
      await this.$auth.logout()
      this.$router.push(this.localePath({ name: 'backend-login' }))
      this.$store.commit('setDrawer', false)
    }
  }
}
</script>

<style lang="scss" scoped>
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
  color: #00A1E9 !important;
}
.v-list-group--active .v-list-item__content, .v-list-group--active .v-list-item__icon .v-icon{
  color: #00A1E9 !important;
}
.v-list-item--active{
  background-color: #00A1E9 !important;
  color: #fff !important;
}
.v-list-item--active .v-icon{
  color: #fff !important;
}
</style>
