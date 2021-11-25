<template>
  <q-layout view="hHh LpR fFf">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Velur </q-toolbar-title>

        <q-btn label="Login" outline to="/login"/>

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
        
        <q-item-label header>{{ $t('navigation') }}</q-item-label>
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="home" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ $t('home') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced/>
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
            <q-avatar color="primary" text-color="white" icon="local_shipping" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Orders</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced/>
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
import { ref } from 'vue';

export default {
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      text: ref(''),
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
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
