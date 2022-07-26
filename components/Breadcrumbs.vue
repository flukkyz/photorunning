<template>
  <div class="greyDark" :class="$vuetify.breakpoint.mobile ? 'px-5' : 'px-16'">
    <client-only>
      <v-breadcrumbs v-if="breadcrumbsItems.length > 0" class="pa-0" :items="breadcrumbsItems">
        <template #divider>
          <v-icon color="white">
            mdi-menu-right
          </v-icon>
        </template>
        <template #item="{ item }">
          <v-breadcrumbs-item :disabled="!item.to">
            <nuxt-link v-if="item.to" class="white--text" :to="localePath(item.to)" v-text="item.text" />
            <span v-else class="white--text" v-text="item.text" />
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </client-only>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbsItems () {
      return this.$store.state.breadcrumbs && this.$store.state.breadcrumbs.breadcrumbsItems ? this.$store.state.breadcrumbs.breadcrumbsItems : []
    }
  }
}
</script>
