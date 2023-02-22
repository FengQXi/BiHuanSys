import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import department from './modules/sysCon/department'
import roleAndAuthority from './modules/sysCon/roleAndAuthority'
import allUser from './modules/sysCon/allUser'
import template from './modules/templateMg/template'
import problem from './modules/problemCon/problem'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    department,
    roleAndAuthority,
    allUser,
    template,
    problem,
  },
  getters
})

export default store
