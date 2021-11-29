// import state from "./state";
// import * as getters from "./getters";
// import * as mutations from "./mutations";
// import * as actions from "./actions";

// ^^^^ i just gave up on trying to make it clean here,
export default {
  state: {
    user: {
      loggedIn: false,
      data: null,
      uid: null
    },
  },
  getters: {
    user(state) {
      return state.user;
    },

    isAuthenticated(state) {
      return state.user.loggedIn;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },

    SET_USER(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    fetchUser({ commit }, user){
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        });
      } else {
        commit("SET_USER", null);
      }
    }
    
  },
};
