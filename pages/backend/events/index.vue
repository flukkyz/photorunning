<template>
  <v-container>
    <v-row justify="center" class="mb-10">
      <v-col cols="12">
        <v-card v-if="listDatas" class="shadow rounded-0">
          <v-card-title>
            <h3 class="mr-3">
              {{ modelName }}
            </h3>
            <v-btn
              depressed
              color="primary"
              class="rounded-0"
              :to="localePath({ name: 'backend-events-form' })"
            >
              <v-icon small left>
                fas fa-plus
              </v-icon>
              เพิ่ม{{ modelName }}
            </v-btn>

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
          <!-- <v-card-title v-if="listDatas.totalItems > 0">
            <v-spacer />
            <v-btn
              color="success"
              outlined
              :disabled="exporting"
              :loading="exporting"
              class="mr-2"
              @click="exportExcel"
            >
              <v-icon small left>
                fas fa-file-excel
              </v-icon>
              Download Excel file
            </v-btn>
          </v-card-title> -->
          <v-data-table
            ref="dataTable"
            disable-pagination
            hide-default-footer
            :headers="tableHeaders"
            :items="listDatas.rows"
          >
            <template #[`item.event`]="{ item }">
              <nuxt-link :to="localePath({ name: 'backend-events-id', params: { id: item.id } })">
                <div class="d-flex py-3 mx-n2 align-center">
                  <v-img
                    v-if="item.cover_url"
                    :src="item.cover_url"
                    aspect-ratio="1"
                    max-width="80"
                    class="mx-3"
                  />
                  <v-img
                    v-else
                    src="/images/icon.png"
                    aspect-ratio="1"
                    max-width="80"
                    class="mx-3"
                  />
                  <div class="">
                    <div class="d-flex">
                      <p
                        class="mb-0 ml-1 body-1 black--text"
                      >
                        {{ item.title }}
                      </p>
                    </div>
                    <div class="d-flex mb-1">
                      <v-icon small>
                        mdi-map-marker
                      </v-icon>
                      <p class="caption mb-0 ml-1">
                        {{ item.event_location }}
                      </p>
                    </div>
                    <div class="d-flex">
                      <v-icon small>
                        mdi-run-fast
                      </v-icon>
                      <p class="caption mb-0 ml-1">
                        {{ $dateText(item.event_date,'medium','short') }}
                      </p>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </template>
          </v-data-table>
          <v-divider />
          <v-card-text v-if="listDatas.totalItems > 0" class="py-1">
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
    <dialogs-delete @delete="submitDelete" />
  </v-container>
</template>

<script>
export default {
  layout: 'back',
  middleware: ['authen', 'backend'],
  data () {
    return {
      api: `${process.env.apiUrl}${process.env.apiDirectory}events`,
      modelName: 'โครงการวิ่ง',
      listDatas: null,
      exporting: false,
      queryParams: {
        size: 20,
        q: '',
        page: 1
      },
      tableHeaders: [
        {
          text: 'โครงการวิ่ง',
          value: 'event',
          sortable: false
        }
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
      const datas = await this.$axios.$get(`${this.api}${(searchParams ? '?' + searchParams : '')}`)
      this.listDatas = datas
      if (this.queryParams.page > this.listDatas.totalPages && this.listDatas.totalPages > 0) {
        this.queryParams.page = this.listDatas.totalPages
        this.$fetch()
      }
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
    this.$breadcrumbs.clear()
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.modelName,
      urlPath: this.$route.fullPath
    })
  },
  methods: {
    onSearch () {
      this.queryParams.page = 1
      this.$fetch()
    },
    pageClick () {
      this.$fetch()
    },
    deleteItem (item) {
      this.$bus.$emit('open-delete-dialog', item.id, item.title)
    },
    async submitDelete (id) {
      try {
        const result = await this.$axios.delete(`${this.api}/${id}`)
        this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'ลบข้อมูลสำเร็จ', content: `ลบข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
      this.$overlay.hide()
    }
  }
}
</script>
