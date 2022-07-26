<template>
  <v-container>
    <v-row justify="center" class="mb-10">
      <v-col cols="12">
        <v-card v-if="listDatas" class="rounded-xl shadow">
          <v-card-title>
            <h3 class="mr-3 info--text">
              {{ modelName }}
            </h3>
            <v-text-field
              v-model="queryParams.q"
              append-icon="mdi-magnify"
              label="ค้นหา"
              outlined
              rounded
              dense
              hide-details
              @input="onSearch"
            />

            <v-spacer />
            <v-btn depressed color="info" rounded @click="addItem">
              <v-icon small class="mr-1">
                fas fa-plus
              </v-icon>
              {{ modelName }}
            </v-btn>
          </v-card-title>
          <v-data-table
            ref="dataTable"
            dense
            disable-pagination
            hide-default-footer
            :headers="tableHeaders"
            :items="listDatas.rows"
          >
            <template #[`header.role`]="{ header }">
              <span class="text-center">
                {{ header.text }}
              </span>
            </template>
            <template #[`header.edit`]="{ header }">
              <div class="text-right">
                {{ header.text }}
              </div>
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
                <span v-else class="red--text">
                  ยังไม่มีข้อมูลการเข้าใช้งาน
                </span>
              </div>
            </template>
            <template #[`item.edit`]="{ item }">
              <div class="text-right">
                <v-icon
                  small
                  @click="editItem(item)"
                >
                  fas fa-edit
                </v-icon>
              </div>
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
            <p class="mt-3  ">
              จำนวนผู้ใช้งานทั้งหมด
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
      modelName: 'Staffs',
      listDatas: null,
      queryParams: {
        size: 20,
        q: '',
        page: 1
      },
      tableHeaders: [
        {
          text: 'ชื่อผู้ใช้งาน',
          value: 'name',
          sortable: false
        },
        {
          text: 'Username',
          value: 'username',
          sortable: false
        },
        {
          text: 'สิทธิ์',
          value: 'role',
          sortable: false
        },
        {
          text: 'ใช้งานล่าสุด',
          value: 'last_login',
          sortable: false
        },
        {
          text: 'แก้ไข',
          value: 'edit',
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
