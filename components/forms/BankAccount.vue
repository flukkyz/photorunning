<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="800">
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-card class="rounded-0">
        <v-toolbar
          color="bgLight"
          elevation="0"
          flat
        >
          <v-toolbar-title>
            <h3 class="primary--text">
              {{ headerText }}
            </h3>
          </v-toolbar-title>
          <v-spacer />
          <v-btn v-if="edit" fab x-small text @click="closeDialog">
            <v-icon>
              fas fa-times
            </v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <p v-if="!edit" class="info--text">
            {{ $t('BEFORE_INPUT_BANKBOOK_DETAIL') }}
          </p>
          <v-autocomplete
            v-model="form.bank_id"
            :items="banks"
            item-value="id"
            :filter="banksCustomFilter"
            :disabled="banks.length === 0"
            outlined
            class="rounded-0"
            :rules="rules.bank_id"
            :label="$t('BANK')"
            :hint="$t('INPUT_SELECT_HINT',{text: $t('BANK')})"
          >
            <template #item="item">
              <v-list-item-avatar>
                <img :src="`/images/banks/${item.item.code}.png`">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.item[`name_${$lang.l()}`]" />
                <v-list-item-subtitle v-text="$lang.isEn() ? item.item.name_th : item.item.name_en" />
              </v-list-item-content>
            </template>
            <template #selection="item">
              <v-list-item-avatar>
                <img :src="`/images/banks/${item.item.code}.png`">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.item[`name_${$lang.l()}`]" />
                <v-list-item-subtitle v-text="$lang.isEn() ? item.item.name_th : item.item.name_en" />
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <v-text-field
            v-model="form.account_no"
            :label="$t('ACCOUNT_NO')"
            type="number"
            outlined
            class="rounded-0"
            :rules="rules.account_no"
            required
          />
          <v-text-field
            v-model="form.account_name"
            :label="$t('ACCOUNT_NAME')"
            outlined
            class="rounded-0"
            :rules="rules.account_name"
            required
          />
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn
            color="primary"
            large
            block
            class="rounded-0"
            elevation="0"
            type="submit"
            :disabled="saving || !valid"
            :loading="saving"
          >
            {{ $t('SAVE') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      bankApi: `${process.env.apiUrl}${process.env.apiDirectory}banks`,
      dialog: false,
      valid: true,
      saving: false,
      edit: true,
      banks: [],
      mode: '',
      rules: {
        bank_id: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('BANK') })
        ],
        account_no: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('ACCOUNT_NO') })
        ],
        account_name: [
          v => !!v || this.$t('IS_REQUIRED', { text: this.$t('ACCOUNT_NAME') })
        ]
      },
      form: {}
    }
  },
  computed: {
    headerText () {
      return this.mode === 'add' ? this.$t('NEW', { text: this.$t('BANKBOOK') }) : this.$t('EDIT', { text: this.$t('BANKBOOK') })
    }
  },
  created () {
    this.$bus.$on('open-bank-account-form', (oldData, edit = true) => {
      this.$overlay.showLoading()
      this.saving = false
      this.edit = edit
      this.clearData()
      this.mode = 'add'
      if (oldData) {
        this.mode = 'edit'
        this.form = { ...this.form, ...oldData }
      }
      this.dialog = true
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    })
  },
  async mounted () {
    try {
      const banks = await this.$axios.$get(this.bankApi)
      this.banks = banks
    } catch (e) {
      console.log(e)
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  beforeDestroy () {
    this.$bus.$off('open-bank-account-form')
  },
  methods: {
    banksCustomFilter (item, queryText, itemText) {
      const code = item.code ? item.code.toLowerCase() : ''
      const nameTh = item.name_th ? item.name_th.toLowerCase() : ''
      const nameEn = item.name_en ? item.name_en.toLowerCase() : ''
      const nameZh = item.name_zh ? item.name_zh.toLowerCase() : ''
      const nameLo = item.name_lo ? item.name_lo.toLowerCase() : ''
      const codeSwitch = item.code ? this.$charSwitch(item.code).toLowerCase() : ''
      const nameThSwitch = item.name_th ? this.$charSwitch(item.name_th).toLowerCase() : ''
      const nameEnSwitch = item.name_en ? this.$charSwitch(item.name_en).toLowerCase() : ''
      const nameZhSwitch = item.name_zh ? this.$charSwitch(item.name_zh).toLowerCase() : ''
      const nameLoSwitch = item.name_lo ? this.$charSwitch(item.name_lo).toLowerCase() : ''
      const searchText = queryText.toLowerCase().split(' ')
      return searchText.some(ele => code.includes(ele) ||
        nameTh.includes(ele) ||
        nameEn.includes(ele) ||
        nameZh.includes(ele) ||
        nameLo.includes(ele) ||
        codeSwitch.includes(ele) ||
        nameThSwitch.includes(ele) ||
        nameEnSwitch.includes(ele) ||
        nameZhSwitch.includes(ele) ||
        nameLoSwitch.includes(ele)
      )
    },
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    clearData () {
      this.form = {
        bank_id: null,
        account_no: '',
        account_name: ''
      }
    },
    save () {
      if (this.$refs.form.validate()) {
        this.saving = true
        this.$emit(this.mode, this.form)
        this.dialog = false
      }
    }
  }
}
</script>
