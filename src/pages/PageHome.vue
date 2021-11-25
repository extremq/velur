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
      <q-card flat bordered class="my-card">
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          height="300px"
        >
          <q-carousel-slide
            :name="1"
            img-src="https://www.asket.com/imgproxy/e:1/format:jpeg/width:1080/resize:fit/quality:80/plain/https://asket.centracdn.net/client/dynamic/images/2_00d6bb1f5b-asket_tee_white_cart_thumb-original.jpg@jpg"
          />
          <q-carousel-slide
            :name="2"
            img-src="https://media.gq-magazine.co.uk/photos/5f575108020908336ccd4d82/master/w_1000,c_limit/20200907-tshirt-05.jpg"
          />
        </q-carousel>

        <q-separator />

        <q-card-section>
          <div class="col text-h5 ellipsis">White tee</div>
          <div class="text-subtitle1 text-grey">added by Zed – 3 days ago</div>
          <div class="q-gutter-xs">
            <q-badge outline color="secondary" label="M" />
            <q-badge outline color="secondary" label="Bershka" />
            <q-badge outline color="secondary" label="Cotton" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="secondary">
            <q-icon class="q-pa-sm" name="payments" />
            10 usd – Purchase
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card flat bordered class="my-card">
        <q-img
          height="300px"
          fit="cover"
          src="https://content.moss.co.uk/images/extralarge/966663302_04.jpg"
        />

        <q-separator />

        <q-card-section>
          <div class="col text-h5 ellipsis">Blue shirt</div>
          <div class="text-subtitle1 text-grey">added by Zed – 3 days ago</div>
          <div class="q-gutter-xs">
            <q-badge outline color="secondary" label="S" />
            <q-badge outline color="secondary" label="Zara" />
            <q-badge outline color="secondary" label="Cotton" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="secondary">
            <q-icon class="q-pa-sm" name="payments" />
            13 usd – Purchase
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card flat bordered class="my-card">
        <q-img
          height="300px"
          fit="cover"
          src="https://media.gq.com/photos/6070bc22f74872e19957f7bd/master/w_2000,h_1333,c_limit/Gramicci-NN-just-cut-pant.jpg"
        />

        <q-separator />

        <q-card-section>
          <div class="col text-h5 ellipsis">Jeans</div>
          <div class="text-subtitle1 text-grey">added by Zed – 3 days ago</div>
          <div class="q-gutter-xs">
            <q-badge outline color="secondary" label="M" />
            <q-badge outline color="secondary" label="Bershka" />
            <q-badge outline color="secondary" label="Polymer" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="secondary">
            <q-icon class="q-pa-sm" name="payments" />
            20 usd – Purchase
          </q-btn>
        </q-card-actions>
      </q-card>

      <q-card flat bordered class="my-card">
        <q-img
          height="300px"
          fit="cover"
          src="https://s3.amazonaws.com/images.gearjunkie.com/uploads/2020/07/Western_Rise_Evolution.jpg"
        />

        <q-separator />

        <q-card-section>
          <div class="col text-h5 ellipsis">Navy jeans</div>
          <div class="text-subtitle1 text-grey">added by Zed – 3 days ago</div>
          <div class="q-gutter-xs">
            <q-badge outline color="secondary" label="M" />
            <q-badge outline color="secondary" label="Bershka" />
            <q-badge outline color="secondary" label="Cotton" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="secondary">
            <q-icon class="q-pa-sm" name="payments" />
            15 usd – Purchase
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      slide: ref(1),
    };
  },
  name: 'PageHome',
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
