<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Velur </q-toolbar-title>

        <!-- <q-btn label="test" @click="test" /> -->
        <template v-if="user.loggedIn === true">
          <div class="q-pa-xs gt-sm">Hello, {{ user.data.displayName || user.data.email }}.</div>
        </template>

        <q-input
          dark
          dense
          standout
          v-model="text"
          input-class="text-right"
          class="q-ml-sm"
        >
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon
              v-else
              name="clear"
              class="cursor-pointer"
              @click="text = ''"
            />
          </template>
        </q-input>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item>
          <q-item-section>
            <q-btn
              color="primary"
              v-if="user.loggedIn === false"
              label="Login"
              outline
              to="/login"
            />
            <q-btn
              color="primary"
              v-else
              label="Logout"
              outline
              @click="logout"
            />
          </q-item-section>
        </q-item>
        <q-item-label header>{{ $t("navigation") }}</q-item-label>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ $t("home") }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-if="user.loggedIn === true"
          clickable
          v-ripple
          to="/create"
          exact
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="add_circle" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ $t("create") }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <template v-if="user.loggedIn === true">
          <q-item-label header>Account</q-item-label>
          <q-item clickable v-ripple to="/profile" exact>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white" icon="person" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Profile</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/orders" exact>
            <q-item-section avatar>
              <q-avatar
                color="primary"
                text-color="white"
                icon="local_shipping"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label>Orders</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
        </template>
        <q-item-label header>Others</q-item-label>
        <q-item clickable v-ripple to="/about" exact>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="help" />
          </q-item-section>

          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { mapGetters } from "vuex";

import { useQuasar, Cookies } from "quasar";
import { getAuth, signOut } from "firebase/auth";

let $q;

export default {
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      text: ref(""),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    test() {
      console.log(this.user);
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          $q.notify({
            color: "green-4",
            textColor: "white",
            message: "Logged out successfully!",
          });
          this.$router.push("/");
          this.$store.dispatch("fetchUser", null);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    $q = useQuasar();
  },
};
</script>

<style lang="sass">
.header-icon
  position: absolute
  bottom: 0
  left: 50%
  transform: translateX(-50%)
</style>
