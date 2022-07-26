<template>
  <forms-event edit @save="save" />
</template>

<script>
export default {
  layout: 'back',
  middleware: ['authen', 'backend'],
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  data () {
    return {
      api: `${process.env.apiUrl}${process.env.apiDirectory}events`,
      modelName: 'โครงการวิ่ง'
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: `ปรับปรุง ${this.modelName}`,
      urlPath: this.$route.fullPath
    })
  },
  async mounted () {
    try {
      const data = await this.$axios.$get(`${this.api}/${this.$route.params.id}`)
      this.$bus.$emit('bind-data', data)
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  methods: {
    async save (data) {
      try {
        const result = await this.$axios.$put(`${this.api}/${this.$route.params.id}`, data)
        if (result) {
          this.$notifier.showMessage({ title: 'ปรับปรุงข้อมูลสำเร็จ', content: `ปรับปรุงข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
          this.$router.push(this.localePath({ name: 'backend-events-id', params: { id: result.id } }))
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
    }
  }
}
</script>
