<template>
  <forms-event @save="save" />
</template>

<script>
export default {
  layout: 'back',
  middleware: ['authen', 'backend'],
  data () {
    return {
      modelName: 'โครงการวิ่ง'
    }
  },
  head () {
    return this.$headUtil({
      lang: this.$lang.getISO,
      title: `เพิ่ม${this.modelName}`,
      urlPath: this.$route.fullPath
    })
  },
  methods: {
    async save (data) {
      try {
        const result = await this.$axios.$post(`${process.env.apiUrl}${process.env.apiDirectory}events`, data)
        if (result) {
          this.$notifier.showMessage({ title: 'เพิ่มข้อมูลสำเร็จ', content: `เพิ่มข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
          this.$router.push(this.localePath({ name: 'backend-events-id', params: { id: result.id } }))
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
    }
  }
}
</script>
