<template>
  <div class="grey lighten-5 py-16">
    <v-container :class="{ 'px-16': ['sm', 'xs'].includes($vuetify.breakpoint.name)}">
      <v-row>
        <v-col cols="12" md="5">
          <v-card class="rounded-0 shadow">
            <v-card-text class="px-8 py-16">
              <h1 class="display-1 font-weight-bold mb-5">
                {{ $t('CONTACT_US') }}
              </h1>
              <forms-contact />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" offset-md="1">
          <div class="mt-10">
            <p class="headline mb-1 font-weight-bold">
              {{ $t('ADDRESS') }}
            </p>
            <p class="title">
              บริษัท โฟโต้รันนิ่ง จำกัด 99 ถนนสุเทพ ตำบลสุเทพ อำเภอเมือง จังหวัดเชียงใหม่ 50000
            </p>
            <v-row>
              <v-col cols="12" sm="6" md="12" lg="6">
                <div class="d-flex align-center mb-5">
                  <a href="mailto:photorunning@gmail.com" target="_blank">
                    <v-icon color="primary" large>
                      mdi-email
                    </v-icon>
                  </a>
                  <div class="ml-3">
                    <p class="mb-0 ">
                      E-mail
                    </p>
                    <a href="mailto:photorunning@gmail.com" target="_blank">
                      <p class="mb-0  black--text font-weight-bold">
                        photorunning@gmail.com
                      </p>
                    </a>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="12" lg="6">
                <div class="d-flex align-center mb-5">
                  <a href="telto:0999999999" target="_blank">
                    <v-icon color="primary" large>
                      mdi-phone
                    </v-icon>
                  </a>
                  <div class="ml-3">
                    <p class="mb-0 ">
                      โทร.
                    </p>
                    <a href="telto:0999999999" target="_blank">
                      <p class="mb-0  black--text font-weight-bold">
                        099 999 9999
                      </p>
                    </a>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.372368709891!2d98.99388401502758!3d18.781551566041806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3b741ee61e11%3A0xbc97d78d0e2017eb!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4p-C4teC4p-C4reC4peC4lOC4teC5guC4nyDguIjguLPguIHguLHguJQ!5e0!3m2!1sth!2sth!4v1646585287314!5m2!1sth!2sthhttps://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.7015489415953!2d98.98197751540324!3d18.811449365121806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30da3b4f4eecb30d%3A0x9b667008231cb4f3!2z4LmB4Lii4LiB4LiC4LmI4Lin4LiH4Liq4Li04LiH4Lir4LmM!5e0!3m2!1sth!2sth!4v1657465231110!5m2!1sth!2sth"
            width="100%"
            height="400"
            class="rounded-0 mt-16"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'mock',
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.$t('CONTACT_US'),
      urlPath: this.$route.fullPath
    })
  }
}
</script>
