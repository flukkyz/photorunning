<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        :value="dateText"
        outlined
        :rules="rules"
        readonly
        v-bind="attrs"
        :dense="dense"
        :class="inputClass"
        required
        v-on="on"
        @focus="focusField"
      >
        <template #label>
          <template v-if="required">
            <span class="font-weight-bold">
              {{ label }}
            </span>
            <v-icon color="red" x-small class="mt-n4">
              mdi-asterisk
            </v-icon>
          </template>
          <template v-else>
            {{ label }}
          </template>
        </template>
        <template #prepend-inner>
          <v-icon :small="dense" :class="dense ? 'mt-1 mr-1': 'mr-1'">
            {{ prependIcon }}
          </v-icon>
        </template>
      </v-text-field>
    </template>
    <v-date-picker
      v-model="model"
      :active-picker.sync="activePicker"
      :max="max"
      :min="min"
      :locale="$lang.getIso()"
      @input="saveDate"
    />
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    prependIcon: {
      type: String,
      default: 'fas fa-calendar-day'
    },
    rules: {
      type: Array,
      default: Array
    },
    min: {
      type: String,
      default: undefined
    },
    max: {
      type: String,
      default: undefined
    },
    dense: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activePicker: null,
      menu: false
    }
  },
  computed: {
    dateText () {
      return this.value ? this.$dateText(this.value, 'long') : ''
    },
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.saveDate(val)
      }
    }
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.activePicker = this.model ? 'DATE' : 'YEAR'))
    }
  },
  methods: {
    focusField () {
      setTimeout(() => {
        this.menu = true
      }, 300)
    },
    saveDate (val) {
      this.$refs.menu.save(val)
      this.$emit('input', val)
      this.menu = false
    }
  }
}
</script>
