<template>
  <v-dialog v-model="dialog" persistent scrollable max-width="300">
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-card class="rounded-0">
        <v-toolbar
          flat
        >
          <v-toolbar-title>
            <v-icon class="mr-2">
              {{ headerIcon }}
            </v-icon>
            {{ headerText }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn fab x-small text @click="closeDialog">
            <v-icon>
              fas fa-times
            </v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text class="pt-5">
          <v-text-field
            v-model="form.title"
            label="ชื่อขนาดรูป"
            outlined
            class="rounded-0"
            :autofocus="mode === 'add'"
            :rules="rules.title"
            required
          />
          <v-currency-field
            v-model.number="form.price"
            :decimal-length="0"
            label="ราคา"
            class="rounded-0"
            outlined
            dense
            suffix="บาท"
            :rules="rules.price"
            :min="0"
            :max="999999999999"
          />
          <v-currency-field
            v-model.number="form.max_size"
            :decimal-length="0"
            label="ขนาดรูปสูงสุด"
            class="rounded-0"
            outlined
            dense
            suffix="px"
            :rules="rules.max_size"
            :min="0"
            :max="999999999999"
          />
          <v-currency-field
            v-model.number="form.credit_back"
            :decimal-length="0"
            label="เครดิตคืนรูป"
            class="rounded-0"
            outlined
            dense
            suffix="เครดิต"
            :rules="rules.credit_back"
            :min="0"
            :max="999999999999"
          />
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-spacer />
          <v-btn
            color="info"
            x-large
            block
            class="rounded-0"
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
      modelName: 'ขนาดรูป',
      dialog: false,
      mode: '',
      valid: true,
      saving: false,
      oneClick: false,
      rules: {
        title: [
          v => !!v || 'กรุณากรอกชื่อขนาดรูป'
        ],
        price: [
          v => !!v || 'กรุณากรอกราคา'
        ],
        max_size: [
          v => !!v || 'กรุณากรอกจำนวนขนาดรูปสูงสุด'
        ],
        credit_back: [
          v => !!v || 'กรุณากรอกจำนวนเครดิตคืนรูป'
        ]
      },
      form: {}
    }
  },
  computed: {
    headerText () {
      return this.mode === 'add' ? `เพิ่ม${this.modelName}` : `แก้ไข${this.modelName}`
    },
    headerIcon () {
      return this.mode === 'add' ? 'fas fa-plus' : 'fas fa-edit'
    }
  },
  created () {
    this.$bus.$on('open-size-form', (data) => {
      this.$overlay.showLoading()
      this.saving = false
      this.clearData()
      this.mode = 'add'
      if (data) {
        this.mode = 'edit'
        this.form = { ...data }
      }
      this.dialog = true
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    })
  },
  beforeDestroy () {
    this.$bus.$off('open-size-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    clearData () {
      this.form = {
        title: '',
        price: null,
        max_size: null,
        credit_back: null
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
