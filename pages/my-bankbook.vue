<template>
  <div v-if="bankbooks" class="grey lighten-5 pa-5">
    <h2 class="mb-5">
      {{ pageName }}
    </h2>
    <v-list three-line class="pa-0 mb-3">
      <template v-for="(bankbook, index) in bankbooks">
        <v-list-item
          :key="`bankbook-${bankbook.id}`"
        >
          <v-list-item-avatar size="70">
            <img :src="`/images/banks/${bankbook.Bank.code}.png`">
          </v-list-item-avatar>

          <v-list-item-content>
            <div class="">
              <p class="mb-1 caption info--text" v-html="bankbook.Bank[`name_${$lang.l()}`]" />
              <p class="title mb-0" v-html="bankbook.account_no" />
              <p class="grey--text" v-html="bankbook.account_name" />
            </div>
          </v-list-item-content>
          <v-list-item-action>
            <p class="mb-2 very-small grey--text">
              <span class="font-weight-bold">
                {{ $t('UPDATED_AT') }}
              </span>
              {{ $dateText(bankbook.updatedAt,'short','short') }}
            </p>
            <div class="">
              <v-icon
                color="warning"
                small
                @click="$bus.$emit('open-bank-account-form',bankbook)"
              >
                fas fa-edit
              </v-icon>
              <v-icon
                v-if="bankbooks.length > 1"
                color="error"
                small
                class="ml-3"
                @click="$bus.$emit('open-delete-dialog', bankbook.id, bankbook.account_no)"
              >
                fas fa-trash
              </v-icon>
            </div>
          </v-list-item-action>
        </v-list-item>
        <v-divider
          v-if="index < bankbooks.length - 1"
          :key="`bankbook-divider-${bankbook.id}`"
        />
      </template>
    </v-list>
    <v-card v-if="bankbooks.length < 1" elevation="0" class="rounded-0" @click="$bus.$emit('open-bank-account-form')">
      <v-card-text class="text-center">
        <h2 class="primary--text">
          <v-icon class="mb-2" left color="primary">
            fas fa-plus
          </v-icon>
          {{ $t('NEW',{text: $t('BANKBOOK')}) }}
        </h2>
      </v-card-text>
    </v-card>
    <forms-bank-account @edit="saveEdit" @add="saveAdd" />
    <dialogs-delete @delete="confirmDelete" />
  </div>
</template>

<script>
export default {
  layout: 'profile',
  middleware: ['authen'],
  data () {
    return {
      api: `${process.env.apiUrl}${process.env.apiDirectory}bank-accounts`,
      pageName: this.$t('BANKBOOK_INFO'),
      bankbooks: null
    }
  },
  async fetch () {
    try {
      await this.$auth.fetchUser()
      this.bankbooks = this.$auth.user.BankAccounts
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
    this.$overlay.hide()
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: this.pageName,
      urlPath: this.$route.fullPath
    })
  },
  // mounted () {
  //   setTimeout(() => {
  //     if (this.bankbooks.length === 0) {
  //       this.$bus.$emit('open-bank-account-form', this.profile, false)
  //     }
  //   }, 1000)
  // },
  methods: {
    async saveAdd (data) {
      try {
        const result = await this.$axios.$post(`${this.api}`, data)
        if (result) {
          this.$notifier.showMessage({ title: this.$t('ADDED'), content: this.$t('ADDED_', { text: this.$t('BANKBOOK') }), color: 'success' })
          await this.$fetch()
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
    },
    async saveEdit (data) {
      try {
        const result = await this.$axios.$put(`${this.api}/${data.id}`, data)
        if (result) {
          this.$notifier.showMessage({ title: this.$t('UPDATED'), content: this.$t('UPDATED_', { text: this.$t('BANKBOOK') }), color: 'success' })
          await this.$fetch()
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
    },
    async confirmDelete (id) {
      try {
        await this.$axios.delete(`${this.api}/${id}`)
        this.$fetch()
        this.$notifier.showMessage({ title: this.$t('DELETED'), content: this.$t('DELETED_', { text: this.$t('BANKBOOK') }), color: 'success' })
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    }
  }
}
</script>
