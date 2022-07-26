<template>
  <div />
</template>

<script>
export default {
  layout: 'back',
  middleware: ['authen', 'backend'],
  created () {
    this.$router.push(this.localePath({ name: 'backend-users' }))
  }
}
</script>
