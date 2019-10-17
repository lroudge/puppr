import Vue from "vue";
import Vuex from "vuex";
import { db } from "./main";

Vue.use(Vuex);


// const getProfile = function (uid) {
//   const ref = db.collection('users').doc('GB02IDTM2913786375393')
//   ref.get().then(function (doc) {
//     console.log(doc.data())
//     return (doc.data())
//   }
//   )
// }

export default new Vuex.Store({
  name: "store",
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
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_PROFILE(state, profile) {
      state.user.profile = profile;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);

      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          localId: user.uid
        });
        const ref = db.collection('users').doc(user.uid)
        ref.get().then(function (doc) {
          commit('SET_PROFILE',
            doc.data()
          )
        })
      } else {
        commit('SET_USER', null);
        commit('SET_PROFILE', null)
      }
    }
    // fetchProfiles(state) {
    //   // commit("SET_PROFILE_LIST", profiles != null);
    //   const zipCode = state.user.profile.zipcode;
    //   const ref = db.collection('users').where("zipcode", "==", zipCode)
    //   ref.get().then(function (doc) {
    //     state.dispatch('SET_PROFILE_LIST',
    //         doc.data()
    //     )
    //   })
    // }
  }
});
