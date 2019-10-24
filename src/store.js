import Vue from 'vue';
import Vuex from 'vuex';
import { db } from './main';

Vue.use(Vuex)

export default new Vuex.Store({
  name: 'store',
  state: {
    user: {
      loggedIn: false,
      data: null,
      profile: null
    }
  },

  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN (state, value) {
      state.user.loggedIn = value
    },
    SET_USER (state, data) {
      state.user.data = data
    },
    SET_PROFILE (state, profile) {
      state.user.profile = profile
    }
  },
  actions: {
    fetchUser ({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null)

      if (user) {
        commit('SET_USER', {
          displayName: user.displayName,
          email: user.email,
          localId: user.uid
        })
        const ref = db.collection('users').doc(user.uid)
        ref.get().then(function (doc) {
          commit('SET_PROFILE',
            doc.data()
          )
        })
      } else {
        commit('SET_USER', null)
        commit('SET_PROFILE', null)
      }
    },
    fetchProfile ({ commit }, userUID) {
      const ref = db.collection('users').doc(userUID)
      ref.get().then(function (doc) {
        commit('SET_PROFILE',
          doc.data()
        )
      })
    }
  }
})
