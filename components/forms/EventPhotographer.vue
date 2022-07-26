<template>
  <v-dialog v-if="event" v-model="dialog" persistent max-width="1000">
    <v-card>
      <v-toolbar
        elevation="0"
      >
        <v-toolbar-title>
          <h3 class="primary--text">
            เลือก{{modelName}}
          </h3>
        </v-toolbar-title>
        <v-form @submit.prevent="fetchData">
          <v-text-field
            v-model="queryParams.q"
            prepend-inner-icon="mdi-magnify"
            :placeholder="`ค้นหา${modelName}...`"
            autofocus
            outlined
            dense
            class="ml-5 rounded-0"
            hide-details
          />
        </v-form>
        <v-spacer />
        <v-form ref="form" v-model="valid" @submit.prevent="save">
          <v-input v-model="selected" :rules="rules.user" hide-details />
          <v-btn
            color="primary"
            class="ml-auto mr-3 rounded-0"
            elevation="0"
            type="submit"
            :disabled="saving || !valid"
            :loading="saving"
          >
            เพิ่ม
          </v-btn>
          <v-btn fab x-small text @click="closeDialog">
            <v-icon>
              fas fa-times
            </v-icon>
          </v-btn>
        </v-form>
      </v-toolbar>
      <v-card-text class="pa-0">
        <div v-if="datas">
          <v-card
            class="rounded-0"
            elevation="0"
          >
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="datas.rows.filter(ele => !event.EventPhotographers.map(ele2 => ele2.user_id).includes(ele.id))"
              item-key="id"
              disable-pagination
              hide-default-footer
              show-select
            >
              <template #[`item.user`]="{ item }">
                <v-list-item>
                  <v-list-item-avatar>
                    <v-img v-if="item.avatar" :src="item.avatar" />
                    <v-img v-else src="/images/icon.png" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="`${item.firstname} ${item.lastname}`" />
                    <v-list-item-subtitle v-html="item.email" />
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-data-table>
          </v-card>
        </div>
        <div v-else class="py-16">
          <div class="d-flex align-center justify-center">
            <v-progress-circular
              indeterminate
              class="mr-3"
              color="primary"
            />
            <h3 class="text-center greyLight--text">
              Loading...
            </h3>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      modelName: 'ช่างภาพ',
      dialog: false,
      selected: [],
      api: `${process.env.apiUrl}${process.env.apiDirectory}users`,
      loading: false,
      queryParams: {
        q: '',
        page: 1,
        size: 100
      },
      headers: [
        {
          text: 'Photographers',
          sortable: false,
          value: 'user'
        }
      ],
      datas: null,
      valid: true,
      saving: false,
      rules: {
        user: [
          v => v.length > 0 || 'กรุณาเลือกช่างภาพอย่างน้อย 1 คน'
        ]
      }
    }
  },
  async mounted () {
    await this.fetchData()
  },
  created () {
    this.$bus.$on('open-photographer-form', () => {
      this.$overlay.showLoading()
      this.saving = false
      this.clearData()
      this.dialog = true
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    })
  },
  beforeDestroy () {
    this.$bus.$off('open-photographer-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    async fetchData () {
      this.loading = true
      try {
        const searchParams = new URLSearchParams(this.queryParams).toString()
        const datas = await this.$axios.$get(`${this.api}${(searchParams ? '?' + searchParams : '')}`)
        this.datas = datas
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.loading = false
      this.$overlay.hide()
    },
    clearData () {
      this.selected = []
    },
    save () {
      if (this.$refs.form.validate()) {
        const form = this.selected.map((ele) => {
          return {
            event_id: this.event.id,
            user_id: ele.id
          }
        })
        this.saving = true
        this.$emit('save', form)
        this.dialog = false
      }
    }
  }
}
</script>
