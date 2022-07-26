<template>
  <div class="py-8 grey lighten-5">
    <v-container class="px-16">
      <h2 class="mb-2">
        รายการสั่งซื้อ
        &nbsp;
        <span class="body-1">
          3 รายการ
        </span>
      </h2>
      <v-row>
        <v-col cols="12" md="9">
          <v-list>
            <template v-for="n in 3">
              <v-list-item :key="n">
                <v-list-item-avatar class="rounded-0" size="100">
                  <v-img :src="`https://picsum.photos/${$randomNumber(0,3) === 1 ? '300/400': '400/300'}?random=${n+1}`" contain />
                </v-list-item-avatar>
                <v-list-item-content class="">
                  <v-list-item-title class="ml-1 black--text font-weight-bold" v-text="`PID12345${n}`" />
                  <p class="caption ml-1 mb-0">
                    งานวิ่ง ABC
                  </p>
                  <div class="d-flex mt-2 ml-1">
                    <div class="d-flex align-center">
                      <p class="mb-0">
                        Size
                      </p>
                      <div style="width: 118px;" class="ml-3">
                        <v-select
                          :items="sizeItems"
                          value="S"
                          outlined
                          hide-details
                          dense
                        />
                      </div>
                    </div>
                    <div class="ml-16 mt-2">
                      <p class="mb-0 font-weight-bold">
                        <span class="caption">
                          ราคา
                        </span>
                        {{ $currencyText(100,{minimumFractionDigits: 2, maximumFractionDigits: 2}) }}
                        <span class="caption">
                          บาท
                        </span>
                      </p>
                    </div>
                  </div>
                </v-list-item-content>
                <v-list-item-action class="align-self-start">
                  <v-icon
                    color="error"
                  >
                    mdi-trash-can
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="n < 3"
                :key="`cart-divider-${n}`"
              />
            </template>
          </v-list>
        </v-col>
        <v-col cols="12" md="3" class="py-0">
          <v-card
            class="rounded-0 mt-3"
            elevation="0"
          >
            <v-card-text class="d-flex">
              <p class="mb-0 font-weight-bold">
                ราม
                <span class="caption">
                  3 รายการ
                </span>
              </p>
              <v-spacer />
              <p class="mb-0 font-weight-bold">
                <span class="body-1 font-weight-bold">{{ $currencyText(300,{minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</span>
                <span class="caption">
                  บาท
                </span>
              </p>
            </v-card-text>
          </v-card>
          <div class="">
            <v-btn
              x-large
              class="rounded-0 my-3"
              block
              elevation="0"
              depressed
              color="black"
            >
              <span class="white--text">
                ชำระเงิน
              </span>
            </v-btn>
            <v-btn
              x-large
              class="rounded-0"
              outlined
              block
              elevation="0"
              :to="localePath({ name: 'mock-events' })"
            >
              เลือกรูปต่อ
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'mock',
  data () {
    return {
      sizeItems: [
        'S',
        'M',
        'L',
        'XL',
        'Original'
      ]
    }
  }
}
</script>
