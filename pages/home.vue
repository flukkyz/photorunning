<template>
  <div>
    <div v-if="slideshows && slideshows.length> 0" class="">
      <v-carousel
        hide-delimiter-background
        :show-arrows="slideshows.length > 1"
        :hide-delimiters="slideshows.length < 2"
        :show-arrows-on-hover="slideshows.length> 1"
        height="500"
        width="100%"
        cycle
      >
        <template v-for="slideshow in slideshows">
          <a
            v-if="slideshow.link"
            :key="`slideshow-${slideshow.id}`"
            :href="slideshow.link"
            target="_blank"
          >
            <v-carousel-item :src="slideshow.url" />
          </a>
          <v-carousel-item
            v-else
            :key="`slideshow-${slideshow.id}`"
            :src="slideshow.url"
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
            <etcs-card-list :n="n" />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slideshowApi: `${process.env.apiUrl}${process.env.apiDirectory}slides`,
      slideshows: null
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.$t('HOME'),
      urlPath: this.$route.fullPath
    })
  },
  async mounted () {
    const thisTime = this.$dayjs()
    this.thisTime = thisTime
    try {
      const slideshows = await this.$axios.$get(`${this.slideshowApi}`)
      this.slideshows = slideshows
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  }
}
</script>
