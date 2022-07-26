<template>
  <div />
</template>

<script>
export default {
  created () {
    this.$router.push(this.localePath({ name: 'home' }))
  }
}
</script>
