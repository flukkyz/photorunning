<template>
  <div>
    <div class="">
      <v-carousel
        hide-delimiter-background
        show-arrows-on-hover
        height="500"
        width="100%"
        cycle
      >
        <template v-for="n in 5">
          <v-carousel-item
            :key="n"
            :src="`https://picsum.photos/1500/500?random=${n+1}`"
          />
        </template>
      </v-carousel>
    </div>
    <!-- <image-browse />
    <div class="text-center my-10">
      <v-btn
        x-large
        elevation="0"
        class="rounded-0 px-16 py-12"
        color="primary"
        @click="$bus.$emit('open-img-browse-form')"
      >
        <v-icon class="mr-3" x-large>
          mdi-face-recognition
        </v-icon>
        <p class="headline mb-0">
          ค้นหาด้วยใบหน้า
        </p>
      </v-btn>
    </div> -->
    <div class="grey lighten-5 py-16">
      <v-container :class="{ 'px-16': ['sm', 'xs'].includes($vuetify.breakpoint.name)}">
        <h1 class="mb-8">
          ACTIVE EVENTS
        </h1>
        <v-row>
          <v-col
            v-for="n in 8"
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
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'mock'
}
</script>
