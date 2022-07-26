<template>
  <div class="grey lighten-5 py-16">
    <v-container :class="{ 'px-16': ['sm', 'xs'].includes($vuetify.breakpoint.name)}">
      <image-browse />
      <div class="d-flex">
        <h1 class="mb-8">
          ALL EVENTS
        </h1>
        <v-spacer />
        <v-btn
          x-large
          elevation="0"
          class="rounded-0"
          color="primary"
          @click="$bus.$emit('open-img-browse-form')"
        >
          <v-icon class="mr-2">
            mdi-face-recognition
          </v-icon>
          ค้นหาด้วยใบหน้า
        </v-btn>
      </div>
      <v-row>
        <v-col
          v-for="n in 20"
          :key="n"
          cols="12"
          md="4"
          lg="3"
          xl="2"
          sm="6"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? '5' : '0'"
              class="mx-auto rounded-0"
              :to="localePath({ name: 'mock-events-id',params: {id: n+1} })"
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
                    mdi-run-fast
                  </v-icon>
                  <p class="caption mb-0 ml-1">
                    {{ $dateText(null,'medium','short') }}
                  </p>
                </div>
                <div class="d-flex">
                  <v-icon small>
                    mdi-map-marker
                  </v-icon>
                  <p class="caption mb-0 ml-1">
                    ห้วยตึงเฒ่า, Chiang Mai
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'mock'
}
</script>
