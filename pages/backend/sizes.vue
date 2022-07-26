<template>
  <v-container>
    <v-row justify="center" class="mb-10">
      <v-col cols="12">
        <v-card v-if="listDatas" class="rounded-0 shadow">
          <v-card-title>
            <h3 class="mr-3">
              {{ modelName }}
            </h3>
            <v-btn depressed color="primary" class="rounded-0" @click="addItem">
              <v-icon small left>
                fas fa-plus
              </v-icon>
              {{ modelName }}
            </v-btn>
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="ค้นหา"
              outlined
              class="rounded-0"
              rounded
              dense
              hide-details
            />
          </v-card-title>
          <v-data-table
            ref="dataTable"
            dense
            disable-pagination
            hide-default-footer
            :headers="tableHeaders"
            :items="listFilters"
          >
            <template #[`header.edit`]="{ header }">
              <div class="text-right">
                {{ header.text }}
              </div>
            </template>
            <template #[`header.delete`]="{ header }">
              <div class="text-right">
                {{ header.text }}
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
            <template #[`item.delete`]="{ item }">
              <div class="text-right">
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  fas fa-trash
                </v-icon>
              </div>
            </template>
          </v-data-table>
          <v-divider />
          <v-card-text class="py-1">
            <p class="mt-3  ">
              จำนวน{{ modelName }}ทั้งหมด
              {{ listDatas.length }}
              รายการ
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <forms-size
      @add="submitAdd"
      @edit="submitEdit"
    />
    <dialogs-delete @delete="submitDelete" />
  </v-container>
</template>

<script>
export default {
  layout: 'back',
  middleware: ['authen', 'backend'],
  data () {
    return {
      api: `${process.env.apiUrl}${process.env.apiDirectory}sizes`,
      modelName: 'ขนาดรูป',
      listDatas: null,
      onSorting: false,
      search: '',
      tableHeaders: [
        {
          text: 'ขนาดรูป',
          value: 'title'
        },
        {
          text: 'ราคา',
          value: 'price'
        },
        {
          text: 'ขนาดรูปสูงสุด',
          value: 'max_size'
        },
        {
          text: 'เครดิตคืนรูป',
          value: 'credit_back'
        },
        {
          text: 'แก้ไข',
          value: 'edit',
          sortable: false
        },
        {
          text: 'ลบ',
          value: 'delete',
          sortable: false
        }
      ]
    }
  },
  async fetch () {
    try {
      const datas = await this.$axios.$get(`${this.api}`)
      this.listDatas = datas
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
    this.$breadcrumbs.clear()
  },
  head () {
    return {
      title: this.modelName
    }
  },
  computed: {
    listFilters () {
      let listFilters = this.listDatas
      if (this.search) {
        const search = this.search
        listFilters = listFilters.filter((item) => {
          return [
            this.$findSome(search, item.title)
          ].some(ele => ele)
        })
      }
      return listFilters
    }
  },
  methods: {
    addItem () {
      this.$bus.$emit('open-size-form')
    },
    editItem (item) {
      this.$bus.$emit('open-size-form', item)
    },
    deleteItem (item) {
      this.$bus.$emit('open-delete-dialog', item.id, item.title)
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
