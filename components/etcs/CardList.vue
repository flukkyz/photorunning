<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? '5' : '0'"
      class="mx-auto rounded-0"
      :to="localePath({ name: 'events-id',params: {id: n+1} })"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        />
      </template>

      <v-img
        height="250"
        :src="`https://picsum.photos/200/300?random=${n+1}`"
      />

      <v-card-title>
        งานวิ่ง Cafe Badilico
      </v-card-title>

      <v-card-text>
        <div class="d-flex mb-1">
          <v-icon small>
            mdi-map-marker
          </v-icon>
          <p class="caption mb-0 ml-1">
            ห้วยตึงเฒ่า, Chiang Mai
          </p>
        </div>
        <div class="d-flex">
          <v-icon small>
            mdi-run-fast
          </v-icon>
          <p class="caption mb-0 ml-1">
            {{ $dateText(null,'medium','short') }}
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    n: {
      type: Number,
      default: null
    }
  }
}
</script>
