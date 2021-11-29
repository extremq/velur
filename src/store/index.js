import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { Cookies } from "quasar";

import auth from "./auth";

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      auth: auth,
    },
    plugins: [
      createPersistedState({
        storage: {
          getItem: (key) => {
            return Cookies.get(key)
          },
          setItem: (key, value) =>
            Cookies.set(key, value, { expires: 3, secure: false }),
          removeItem: (key) => Cookies.remove(key),
        },
      }),
    ],
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
