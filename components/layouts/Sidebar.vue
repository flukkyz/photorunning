<template>
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
          :to="localePath({ name: 'home'})"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('HOME')" />
        </v-list-item>
        <v-list-item
          router
          exact
          :to="localePath({ name: 'events'})"
        >
          <v-list-item-icon>
            <v-icon>mdi-run-fast</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('EVENTS')" />
        </v-list-item>
        <v-list-item
          router
          exact
          :to="localePath({ name: 'about'})"
        >
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('ABOUT')" />
        </v-list-item>
        <v-list-item
          router
          exact
          :to="localePath({ name: 'contact-us'})"
        >
          <v-list-item-icon>
            <v-icon>mdi-contacts</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="$t('CONTACT_US')" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  computed: {
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('setDrawer', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
