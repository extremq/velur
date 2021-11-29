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
      <q-card
        v-for="offer in offers"
        :key="offer.id"
        flat
        bordered
        class="my-card"
      >
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          height="300px"
        >
          <q-carousel-slide
            v-for="i in offer.images.length"
            :key="i"
            :name="i"
            :img-src="offer.images[i - 1]"
          />
        </q-carousel>

        <q-separator />

        <q-card-section>
          <div class="col text-h5 ellipsis">{{ offer.title }}</div>
          <div class="text-subtitle1 text-grey">
            added by {{ offer.author }} – {{ new Date(Date.now()).toLocaleDateString() }}
          </div>
          <div class="q-gutter-xs">
            <q-badge outline color="secondary" :label="offer.size" />
            <q-badge outline color="secondary" :label="offer.manufacturer" />
            <q-badge outline color="secondary" :label="offer.material" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="secondary">
            <q-icon class="q-pa-sm" name="payments" />
            {{ offer.price }} usd – Purchase
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

import db from "src/boot/firebase";
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";

export default {
  name: "PageHome",
  data() {
    return {
      offers: [
        //   {
        //   id: "asdasd",
        //   title: "asd",
        //   images: [
        //     "https://media.gq-magazine.co.uk/photos/5f575108020908336ccd4d82/master/w_1000,c_limit/20200907-tshirt-05.jpg",
        //     "https://media.gq.com/photos/5e839e814ce9d900093a32eb/master/w_2000,h_1333,c_limit/Kirkland-Signature-crew-neck-T-shirts-(6-pack).jpg",
        //   ],
        //   author: "zed",
        //   manufacturer: "asd",
        //   price: 2,
        //   material: "asd",
        //   size: "M",
        //   date: 1
        // }
      ],
    };
  },
  setup() {
    return {
      slide: ref(1),
    };
  },
  async mounted() {
    const q = query(collection(db, "offers"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let temp = change.doc.data();
        temp.id = change.doc.id;
        if (change.type === "added") {
          this.addNewOffer(temp);
        } else if (change.type === "removed") {
          this.removeOffer(temp);
        }
      });
      console.log("Current offers: ", this.offers.join(", "));
    });
  },
  methods: {
    addNewOffer(offer) {
      console.log("New offer!");

      this.offers.unshift(offer);
    },
    removeOffer(offer) {
      console.log("Removed offer!");

      let index = this.offers.findIndex((_offer) => _offer.id === offer.id);
      this.offers.splice(index, 1);
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
