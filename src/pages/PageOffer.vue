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
      <q-card flat bordered style="width: 700px">
        <q-card-section>
          <div class="col text-h4 text-center ellipsis">
            {{ offer.title }}
            <q-tooltip> {{ offer.title }} </q-tooltip>
          </div>
        </q-card-section>
        <q-img
          v-if="offer.images.length === 1"
          :src="offer.images[0]"
          height="500px"
          lazy
          fit="contain"
        >
        </q-img>
        <q-carousel
          v-else
          animated
          v-model="slide"
          arrows
          height="500px"
          navigation
          control-color="grey"
          infinite
        >
          <q-carousel-slide
            v-for="(image, index) in offer.images"
            :key="`image-${index}`"
            :name="index + 1"
          >
            <q-img height="450px" :src="image" fit="contain" />
          </q-carousel-slide>
        </q-carousel>
        <q-separator />

        <q-card-section class="lt-md">
          <q-item-label header> Details about the product </q-item-label>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.material }} </q-item-label>
                <q-item-label caption>Material</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.size }} </q-item-label>
                <q-item-label caption>Size</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.manufacturer }} </q-item-label>
                <q-item-label caption>Manufacturer</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-section class="gt-sm">
          <q-item-label header> Details about the product </q-item-label>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.material }} </q-item-label>
                <q-item-label caption>Material</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label> {{ offer.size }} </q-item-label>
                <q-item-label caption>Size</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.manufacturer }} </q-item-label>
                <q-item-label caption>Manufacturer</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />

        <q-card-section class="lt-md">
          <q-item-label header> Details about the seller </q-item-label>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.author }} </q-item-label>
                <q-item-label caption>Username</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.timestamp }} </q-item-label>
                <q-item-label caption>Offer date</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.join }} </q-item-label>
                <q-item-label caption>Join date</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-section class="gt-sm">
          <q-item-label header> Details about the seller </q-item-label>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.author }} </q-item-label>
                <q-item-label caption>Username</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label> {{ offer.timestamp }} </q-item-label>
                <q-item-label caption>Offer date</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> {{ offer.join }} </q-item-label>
                <q-item-label caption>Join date</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-separator />
        <q-card-section>
          <q-item v-if="user.data && user.data.email !== offer.contact">
            <q-item-section>
              <q-btn color="primary" label="Purchase" outline />
            </q-item-section>
            <q-item-section>
              <q-btn
                color="primary"
                label="Contact seller"
                @click="alert"
                outline
              />
            </q-item-section>
          </q-item>
          <q-item v-else>
            <q-item-section>
              <q-btn
                color="primary"
                :label="
                  user.data && user.data.email === offer.contact
                    ? 'You own the offer'
                    : 'Login to purchase'
                "
                disable
                outline
              />
            </q-item-section>
            <q-item-section>
              <q-btn
                color="primary"
                label="Contact seller"
                outline
                @click="alert"
              />
            </q-item-section>
          </q-item>
        </q-card-section>

        <template v-if="user.data && user.data.email === offer.contact">
          <q-separator />
          <q-card-section>
            <q-item-label header> Offer actions </q-item-label>
            <q-item>
              <q-item-section>
                <q-btn
                  color="negative"
                  label="Delete offer"
                  @click="confirm"
                  outline
                />
              </q-item-section>
            </q-item>
          </q-card-section>
        </template>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import db from "src/boot/firebase";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { mapGetters } from "vuex";

let $q;

export default {
  name: "PageAbout",
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  data() {
    return {
      slide: ref(1),
      // "Empty" offer template.
      offer: {
        author: null,
        author_id: null,
        date: null,
        images: [],
        manufacturer: null,
        material: null,
        price: null,
        size: null,
        title: null,
        timestamp: null,
        contact: null,
        join: null,
      },
      seller: {},
    };
  },
  methods: {
    async getOffer() {
      // Using the id in the route, I request
      // the offer that has the same id.
      const id = this.$route.params.id;
      const docRef = doc(db, "offers", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // If there is one, I translate the timestamps
        // into readable dates.
        this.offer = docSnap.data();
        this.offer.timestamp = new Date(
          this.offer.date.seconds * 1000
        ).toLocaleString();
        this.offer.join = new Date(
          this.offer.join.seconds * 1000
        ).toLocaleString();
      } else {
        // Throw toast informing the user that
        // the offer does not exist and redirect
        // them to the home page.
        $q.notify({
          color: "red-4",
          textColor: "white",
          message: "Offer doesn't exist.",
        });
        this.$router.push("/");
      }
    },
    async deleteOffer() {
      // If you are the owner of the offer,
      // a button will show up for deleting the offer.
      const id = this.$route.params.id;
      await deleteDoc(doc(db, "offers", id))
        .then(async () => {
          // Firebase allowed and author_id matched
          const docRef = doc(db, "users", this.user.data.email);

          const docSnap = await getDoc(docRef);
          let newUser = docSnap.data();

          // I retrieve the user data and remove
          // the offer id.
          let index = newUser.offers.findIndex((_id) => _id === id);
          newUser.offers.splice(index, 1);

          // Update the user doc.
          await setDoc(docRef, newUser, { merge: true });

          // Throw a toast informing that the
          // action went successfully.
          $q.notify({
            color: "green-4",
            textColor: "white",
            message: "Offer deleted.",
          });

          // Redirect the user if that's the case.
          this.$router.push(this.$route.query.redirect || "/");
        })
        .catch(() => {
          // Firebase rejects the query.
          $q.notify({
            color: "red-4",
            textColor: "white",
            message: "Cannot delete offer.",
          });
        });
    },
    confirm() {
      // Dialog for deleting the offer.
      $q.dialog({
        title: "Confirm deletion",
        message: "Are you sure you want to delete this offer?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          this.deleteOffer();
        })
        .onCancel(() => {
          return;
        });
    },
    alert() {
      // Dialog for contact details.
      $q.dialog({
        title: "Contact details",
        message: "Send an email here: " + this.offer.contact,
      });
    },
  },
  mounted() {
    $q = useQuasar();

    // Init and get the offer.
    this.getOffer();
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
