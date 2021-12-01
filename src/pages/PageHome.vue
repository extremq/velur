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
        <q-img lazy fit="contain" height="300px" :src="offer.images[0]">
        </q-img>

        <q-separator />

        <q-card-section>
          <div class="col text-h5 ellipsis">{{ offer.title }}</div>
          <div class="text-subtitle1 text-grey">
            added by {{ offer.author }} – {{ new Date(offer.date.seconds * 1000).toLocaleDateString() }}
          </div>
          <div class="q-gutter-xs">
            <q-badge outline color="secondary" :label="offer.size" />
            <q-badge outline color="secondary" :label="offer.manufacturer" />
            <q-badge outline color="secondary" :label="offer.material" />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="secondary" @click="openOffer(offer.id)">
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
import { collection, query, onSnapshot, limit, orderBy } from "firebase/firestore";

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
    const q = query(collection(db, "offers"), orderBy("date"), limit(50));
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
    });
  },
  methods: {
    addNewOffer(offer) {
      this.offers.unshift(offer);
    },
    removeOffer(offer) {
      let index = this.offers.findIndex((_offer) => _offer.id === offer.id);
      this.offers.splice(index, 1);
    },
    openOffer(offerId) {
      this.$router.push("/offer/" + offerId);
    }
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
