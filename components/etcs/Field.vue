<template>
  <p class="subtitle-1 mb-1" :class="color ? `${color}--text` : ''">
    <span class="font-weight-bold">
      {{ label }}
    </span>
    &nbsp;
    <span v-if="value">
      {{ value }}
    </span>
    <span v-else class="red--text">
      {{ noDataText }}
    </span>
  </p>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      require: true,
      default: null
    },
    color: {
      type: String,
      require: true,
      default: null
    },
    value: {
      type: [String, Number],
      require: true,
      default: null
    },
    noDataText: {
      type: String,
      require: true,
      default: 'No Data'
    }
  }
}
</script>
