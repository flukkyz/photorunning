<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-img v-if="item.User.avatar" :src="item.User.avatar" />
      <v-img v-else src="/images/icon.png" />
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-html="`${item.User.firstname} ${item.User.lastname}`" />
      <v-list-item-subtitle v-html="item.User.email" />
    </v-list-item-content>
    <v-list-item-action>
      <v-icon
        small
        color="error"
        @click="$emit('delete')"
      >
        fas fa-trash
      </v-icon>
    </v-list-item-action>
  </v-list-item>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>
