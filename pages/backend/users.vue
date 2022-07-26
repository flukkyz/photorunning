<template>
  <v-container>
    <v-row justify="center" class="mb-10">
      <v-col cols="12">
        <v-card v-if="listDatas" class="rounded-0 shadow">
          <v-card-title>
            <h3 class="mr-3">
              {{ modelName }}
            </h3>
            <v-spacer />
            <v-text-field
              v-model="queryParams.q"
              append-icon="mdi-magnify"
              label="ค้นหา"
              outlined
              class="rounded-0"
              dense
              hide-details
              @input="onSearch"
            />
          </v-card-title>
          <v-data-table
            ref="dataTable"
            dense
            disable-pagination
            hide-default-footer
            item-key="id"
            show-expand
            :headers="tableHeaders"
            :items="listDatas.rows"
            single-expand
          >
            <template #[`item.name`]="{ item }">
              {{ `${item.firstname} ${item.lastname}` }}
            </template>
            <template #[`item.country_id`]="{ item }">
              <span v-if="item.Country">
                {{ item.Country.name }}
              </span>
              <span v-else class="red--text">
                -
              </span>
            </template>
            <template #[`item.last_login`]="{ item }">
              <div>
                <template v-if="item.AccessTokens.length > 0">
                  {{ $dateText(item.AccessTokens[0].createdAt,'short','long') }}
                  &nbsp;
                  <span class="caption teal--text">
                    <span class="font-weight-bold">
                      ip
                    </span>
                    {{ item.AccessTokens[0].ip }}
                  </span>
                </template>
                <span v-else class="red--text very-small">
                  ยังไม่มีข้อมูลการเข้าใช้งาน
                </span>
              </div>
            </template>
            <template #expanded-item="{ headers, item }">
              <td :colspan="headers.length" class="pa-5">
                <v-row class="" justify="center">
                  <v-col md="2">
                    <div class="text-center">
                      <v-avatar size="100" class="shadow">
                        <v-img v-if="item.avatar" :src="item.avatar" />
                        <v-img v-else src="/images/logo.png" />
                      </v-avatar>
                    </div>
                  </v-col>
                  <v-col md="5">
                    <div class="">
                      <div class="mb-3">
                        <p class="mb-0 font-weight-bold mr-5 body-1">
                          E-mail
                        </p>
                        <p class="mb-0 title primary--text">
                          {{ item.email }}
                        </p>
                      </div>
                      <div class="mb-3">
                        <p class="mb-0 font-weight-bold mr-5 caption">
                          {{ $t('CITIZEN_ID') }}
                        </p>
                        <p class="mb-0">
                          {{ item.citizen_id || '-' }}
                        </p>
                      </div>
                      <div class="mb-3">
                        <p class="mb-0 font-weight-bold mr-5 caption">
                          {{ $t('NAME') }}
                        </p>
                        <p class="mb-0">
                          {{ item.firstname || '-' }}
                          {{ item.lastname }}
                        </p>
                      </div>
                      <div class="mb-3">
                        <p class="mb-0 font-weight-bold mr-5 caption">
                          {{ $t('ADDRESS') }}
                        </p>
                        <p class="mb-0">
                          {{ item.address || '-' }}
                          {{ item.zipcode }}
                        </p>
                      </div>
                      <div class="mb-3">
                        <p class="mb-0 font-weight-bold mr-5 caption">
                          {{ $t('COUNTRY') }}
                        </p>
                        <div v-if="item.Country" class="d-flex align-center">
                          <v-avatar
                            size="20"
                            class="mr-2"
                          >
                            <v-img :src="`https://flagcdn.com/h20/${item.Country.code.toLowerCase()}.webp`" />
                          </v-avatar>
                          <p class="mb-0">
                            {{ item.Country.name }}
                          </p>
                        </div>
                        <p v-else class="mb-0">
                          -
                        </p>
                      </div>
                      <div class="mb-3">
                        <p class="mb-0 font-weight-bold mr-5 caption">
                          {{ $t('PHONE_NUMBER') }}
                        </p>
                        <p v-if="item.Country && item.tel" class="mb-0">
                          <a :href="`tel:+${item.Country.phone} ${item.tel}`" class="black--text">
                            <span class="font-weight-bold">
                              {{ `(+${item.Country.phone})` }}
                            </span>
                            {{ item.tel }}
                          </a>
                        </p>
                        <p v-else class="mb-0">
                          -
                        </p>
                      </div>
                    </div>
                  </v-col>
                  <v-col md="5">
                    <p class="mb-0 font-weight-bold mr-5 body-1">
                      เลขบัญชีธนาคาร
                    </p>
                    <v-list v-if="item.BankAccounts.length > 0" three-line class="pa-0 mb-3 rounded-0">
                      <template v-for="(bankbook, index) in item.BankAccounts">
                        <v-list-item
                          :key="`bankbook-${bankbook.id}`"
                        >
                          <v-list-item-avatar size="50">
                            <img :src="`/images/banks/${bankbook.Bank.code}.png`">
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <div class="">
                              <p class="mb-1 small info--text" v-html="bankbook.Bank[`name_${$lang.l()}`]" />
                              <p class="mb-0" v-html="bankbook.account_no" />
                              <p class="caption grey--text mb-2" v-html="bankbook.account_name" />
                              <p class="mb-0 very-small grey--text">
                                <span class="font-weight-bold">
                                  {{ $t('UPDATED_AT') }}
                                </span>
                                {{ $dateText(bankbook.updatedAt,'short','short') }}
                              </p>
                            </div>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider
                          v-if="index < item.BankAccounts.length - 1"
                          :key="`bankbook-divider-${bankbook.id}`"
                        />
                      </template>
                    </v-list>
                    <div v-else class="py-5">
                      <h2 class="text-center grey--text">
                        ยังไม่มีข้อมูลเลขบัญชีธนาคาร
                      </h2>
                    </div>
                  </v-col>
                </v-row>
              </td>
            </template>
          </v-data-table>
          <v-divider />
          <v-card-text class="py-1">
            <div class="float-right">
              <v-pagination
                v-if="listDatas.totalPages > 1"
                v-model="queryParams.page"
                :length="listDatas.totalPages"
                :total-visible="5"
                @input="pageClick"
              />
            </div>
            <p class="mt-3">
              จำนวน{{ modelName }}ทั้งหมด
              {{ listDatas.totalItems }}
              รายการ
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <forms-user
      @add="submitAdd"
      @edit="submitEdit"
    />
  </v-container>
</template>

<script>
export default {
  layout: 'back',
  middleware: ['authen', 'backend'],
  data () {
    return {
      api: `${process.env.apiUrl}${process.env.apiDirectory}users`,
      modelName: ' Users ',
      listDatas: null,
      queryParams: {
        size: 20,
        q: '',
        page: 1
      },
      tableHeaders: [
        {
          text: 'E-mail',
          value: 'email',
          sortable: false
        },
        {
          text: 'ชื่อ - นามสกุล',
          value: 'name',
          sortable: false
        },
        {
          text: 'ประเทศ',
          value: 'country_id',
          sortable: false
        },
        {
          text: 'ใช้งานล่าสุด',
          value: 'last_login',
          sortable: false
        },
        { text: '', value: 'data-table-expand' }
      ]
    }
  },
  async fetch () {
    this.queryParams = {
      ...this.queryParams,
      ...this.$route.query
    }
    const searchParams = new URLSearchParams(this.queryParams).toString()
    try {
      const users = await this.$axios.$get(`${this.api}${(searchParams ? '?' + searchParams : '')}`)
      this.listDatas = users
      if (this.queryParams.page > this.listDatas.totalPages && this.listDatas.totalPages > 0) {
        this.queryParams.page = this.listDatas.totalPages
        this.$fetch()
      }
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  head () {
    return {
      title: this.modelName
    }
  },
  methods: {
    onSearch () {
      this.queryParams.page = 1
      this.$fetch()
    },
    pageClick () {
      this.$fetch()
    },
    addItem () {
      this.$bus.$emit('open-user-form')
    },
    editItem (item) {
      this.$bus.$emit('open-user-form', item)
    },
    async submitAdd (data) {
      try {
        const result = await this.$axios.$post(`${this.api}`, data)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'เพิ่มข้อมูลสำเร็จ', content: `เพิ่มข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
      this.$overlay.hide()
    },
    async submitEdit (data) {
      try {
        const result = await this.$axios.$put(`${this.api}/${data.id}`, data)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'ปรับปรุงข้อมูลสำเร็จ', content: `ปรับปรุงข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
      this.$overlay.hide()
    }
  }
}
</script>
