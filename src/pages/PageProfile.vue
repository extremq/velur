<template>
  <q-page>
    <div
      class="
        q-pa-md
        fit
        row
        inline
        wrap
        justify-center
        items-start
        content-start
        q-gutter-md
      "
    >
      <q-card flat bordered style="max-width: 700px">
        <q-card-section>
          <div class="col text-h3">{{ $route.name }}</div>
          <div class="text-subtitle2"><p v-html="$t('created_by', {author: 'extremq'})"></p></div>
        </q-card-section>
        <q-card-section>
            <p v-html="$t('about_text')"></p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageAbout',
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
