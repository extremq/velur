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
            added by {{ offer.author }} –
            {{ new Date(offer.date.seconds * 1000).toLocaleDateString() }}
          </div>
          <div class="q-gutter-xs">
            <q-badge outline color="secondary" :label="offer.size">
              <q-tooltip> Size </q-tooltip>
            </q-badge>
            <q-badge outline color="secondary" :label="offer.manufacturer">
              <q-tooltip> Manufacturer </q-tooltip>
            </q-badge>
            <q-badge outline color="secondary" :label="offer.material">
              <q-tooltip> Material </q-tooltip>
            </q-badge>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn flat color="secondary" @click="openOffer(offer.id)">
            <q-icon class="q-pa-sm" name="payments" />
            {{ offer.price }} usd – Check out
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

import db from "src/boot/firebase";
import {
  collection,
  query,
  onSnapshot,
  limit,
  orderBy,
} from "firebase/firestore";

export default {
  name: "PageHome",
  data() {
    return {
      offers: [
      ],
    };
  },
  setup() {
    return {
      slide: ref(1),
    };
  },
  async mounted() {
    // Retrieve offers by date.
    const q = query(collection(db, "offers"), orderBy("date"), limit(50));

    // Set up a listener to add and delete all offers.
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let temp = change.doc.data();
        // Append its id so we can use it to generate links.
        // I also use it for deleting.
        temp.id = change.doc.id;

        // Only add or remove, I don't want edits.
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
      // Remove the offer with the same id as the requested offer.
      let index = this.offers.findIndex((_offer) => _offer.id === offer.id);
      this.offers.splice(index, 1);
    },
    openOffer(offerId) {
      this.$router.push("/offer/" + offerId);
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
