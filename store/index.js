export const state = () => ({
  firstLoad: false,
  drawer: false,
  dark_mode: false,
  pending_login: false,
  regexNoHtml: /(<[^>]*>)/g,
  setting: null,
  profiles: [
    {
      icon: 'mdi-account-circle',
      text: 'PROFILE_INFO',
      url: 'my-profile'
    },
    {
      icon: 'fas fa-photo-film',
      text: 'MY_GALLERY',
      url: 'my-bankbook'
    },
    {
      icon: 'fas fa-hand-holding-dollar',
      text: 'WITHDRAW',
      url: 'my-bankbook'
    }
  ],
  backend: [
    // {
    //   icon: 'mdi-view-dashboard',
    //   text: 'Dashboard',
    //   url: 'backend-dashboard'
    // },
    {
      header: 'จัดการข้อมูล'
    },
    {
      icon: 'mdi-run-fast',
      text: 'โครงการวิ่ง',
      url: 'backend-events'
    },
    {
      header: 'จัดการข้อมูล'
    },
    {
      icon: 'mdi-account-supervisor',
      text: 'Users',
      url: 'backend-users'
    },
    {
      divider: true
    },
    {
      header: 'ตั้งค่าข้อมูล'
    },
    {
      icon: 'mdi-image-area',
      text: 'Slide Show',
      url: 'backend-slides'
    },
    {
      icon: 'mdi-image-size-select-large',
      text: 'ขนาดรูป',
      url: 'backend-sizes'
    },
    // {
    //   icon: 'fas fa-hand-holding-dollar',
    //   text: 'การเติมเครดิต',
    //   url: 'backend-sizes'
    // },
    {
      icon: 'fas fa-cogs',
      text: 'ตั้งค่าอื่นๆ',
      url: 'backend-setting'
    }
  ],
  enums: {

  },
  references: {

  }
  // blogTypes: null
})

export const actions = {
  async nuxtServerInit ({ commit, state }, { $axios, error, req, $auth }) {
    console.log('nuxtServerInit is loading')
    try {
      if (!state.references.setting) {
        const setting = await $axios.$get(`${process.env.apiUrl}${process.env.apiDirectory}setting`)
        commit('setSetting', setting)
      }
    } catch (e) {
      error({ statusCode: e.response.status, message: e.response.data.message })
    }
    commit('setFirstLoad', true)
    console.log('--------------------------------------------------------------------')
    console.log('nuxtServerInit is loaded')
    console.log('--------------------------------------------------------------------')
  },
  async nuxtClientInit ({ commit, state }, { $axios, error, req, $auth }) {
    console.log('nuxtClientInit is loading')
    try {
      if (!state.references.setting) {
        const setting = await $axios.$get(`${process.env.apiUrl}${process.env.apiDirectory}setting`)
        commit('setSetting', setting)
      }
    } catch (e) {
      error({ statusCode: e.response.status, message: e.response.data.message })
    }
    commit('setFirstLoad', true)
    console.log('--------------------------------------------------------------------')
    console.log('nuxtClientInit is loaded')
    console.log('--------------------------------------------------------------------')
  }
}

export const mutations = {
  setFirstLoad (state, val) {
    state.firstLoad = val
  },
  setDrawer (state, val) {
    state.drawer = val
  },
  setDarkMode (state, val) {
    state.dark_mode = val
  },
  setPendingLogin (state, val) {
    state.pending_login = val
  },
  setSetting (state, val) {
    state.setting = val
  },
  setblogTypes (state, val) {
    state.blogTypes = val.rows
  }
}

// export const getters = {
//   blogType: state => (id) => {
//     if (state.blogTypes) {
//       const index = state.blogTypes.findIndex(ele => ele.id === id)
//       if (index !== -1) {
//         return state.blogTypes[index]
//       }
//     }
//     return null
//   }
// }
