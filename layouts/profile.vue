<template>
  <v-app dark>
    <client-only>
      <layouts-sidebar />
      <layouts-topbar />
    </client-only>
    <v-main style="margin-top: 60px;">
      <breadcrumbs />
      <v-container class="mt-10 mb-16">
        <v-row>
          <v-col v-if="!$vuetify.breakpoint.mobile" cols="12" lg="3">
            <v-list>
              <template v-for="(item, index) in profiles">
                <v-list-item
                  :key="`side-tab-${item.text}-${index}`"
                  router
                  active-class="primary white--text"
                  class="pl-5"
                  exact
                  :to="localePath(item.url)"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title v-text="$t(item.text)" />
                </v-list-item>
              </template>
            </v-list>
          </v-col>
          <v-col cols="12" lg="9">
            <v-tabs
              v-if=" $vuetify.breakpoint.mobile"
              class="mb-3 rounded-0"
              centered
              show-arrows
              icons-and-text
            >
              <v-tabs-slider color="primary" />

              <v-tab
                v-for="item in profiles"
                :key="`top-tab-${item.text}-${index}`"
                :to="localePath(item.url)"
              >
                {{ $t(item.text) }}
                <v-icon>{{ item.icon }}</v-icon>
              </v-tab>
            </v-tabs>
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <client-only>
      <snackbar />
      <overlay />
      <b-t-t v-if="!$vuetify.breakpoint.mobile" />
      <layouts-footer />
    </client-only>
  </v-app>
</template>

<script>
export default {
  name: 'ProfileLayout',
  computed: {
    profiles () {
      return this.$store.state.profiles
    }
  }
}
</script>
