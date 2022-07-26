<template>
  <div class="grey lighten-5 pิ-16">
    <v-img
      height="500"
      :src="`https://picsum.photos/1500/500?random=1`"
    />
    <image-browse @selected="onShowLists" />
    <div class="text-right mr-10 mt-n15">
      <v-btn
        x-large
        elevation="0"
        class="rounded-0 pa-10"
        color="primary"
        @click="$bus.$emit('open-img-browse-form')"
      >
        <v-icon class="mr-2" large>
          mdi-face-recognition
        </v-icon>
        ค้นหาด้วยใบหน้า
      </v-btn>
    </div>

    <v-container :class="{ 'px-16': ['sm', 'xs'].includes($vuetify.breakpoint.name)}">
      <h2 class="mb-3 text-center">
        งานวิ่ง Vivamus consectetuer hendrerit lacus
      </h2>
      <div class="d-flex mb-1 justify-center">
        <v-icon>
          mdi-run-fast
        </v-icon>
        <p class="body-1 mb-0 ml-1">
          {{ $dateText(null,'medium','short') }}
        </p>
      </div>
      <div class="d-flex justify-center mb-5">
        <v-icon>
          mdi-map-marker
        </v-icon>
        <p class="body-1 mb-0 ml-1">
          ห้วยตึงเฒ่า, Chiang Mai
        </p>
      </div>
      <div v-if="showLists" class="mt-5">
        <p>
          รูปถ่ายทั้งหมด 5,003 รูป
        </p>
        <div class="d-flex flex-wrap justify-center align-center">
          <div v-for="n in 300" :key="n" class="mr-2">
            <img
              height="100"
              :src="`https://picsum.photos/${$randomNumber(0,4) === 1 ? '300/400': '400/300'}?random=${n+1}`"
              @click="$overlay.showImage({url: `https://picsum.photos/${$randomNumber(0,4) === 1 ? '900/1200': '1200/900'}?random=${n+1}`})"
            >
          </div>
        </div>
        <div class="text-center my-8">
          <v-pagination
            :length="6"
          />
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pageName: this.$t('EVENT ID'),
      showLists: false
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.pageName,
      urlPath: this.$route.fullPath
    })
  },
  methods: {
    onShowLists () {
      setTimeout(() => {
        this.showLists = true
        this.$overlay.hide()
      }, 2000)
    }
  }
}
</script>
