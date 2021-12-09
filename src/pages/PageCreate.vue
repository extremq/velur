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
          <div class="col text-h3">{{ $route.name }}</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              type="text"
              v-model="offer.title"
              label="Title"
              hint="40 characters allowed."
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val.length < 41) ||
                  'Too many characters. Title is mandatory.',
              ]"
            />

            <q-input
              filled
              type="number"
              v-model.number="offer.price"
              label="Price"
              hint="Price must be greater than 0."
              lazy-rules
              :rules="[
                (val) =>
                  (val && val > 0 && /^[0-9.]+$/.test(val)) ||
                  'Type a positive number, please. Use a dot and not a comma.',
              ]"
            />

            <q-input
              filled
              type="text"
              v-model="offer.images[0]"
              label="Image link 1"
              hint="Paste the link of an image of your article."
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val.length < 100) ||
                  'You must have at least one image.',
              ]"
            />

            <q-input
              filled
              type="text"
              v-model="offer.images[1]"
              label="Image link 2"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val.length < 100) || !(val) ||
                  'Link is too long. Use imgur.',
              ]"
            />

            <q-input
              filled
              type="text"
              v-model="offer.images[2]"
              label="Image link 3"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val.length < 100) || !(val) ||
                  'Link is too long. Use imgur.',
              ]"
            />

            <!-- <q-file
              v-model="files"
              label="Pick images"
              hint="Only upload images that are less than 10 megabytes in size."
              filled
              counter
              :counter-label="counterLabelFn"
              max-files="3"
              multiple
              :filter="checkFileSize"
              accept=".jpg, image/*"
              @rejected="onRejected"
              lazy-rules
              :rules="[(val) => val && val.length > 0]"
            >
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>

              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop="files = []"
                  class="cursor-pointer"
                />
              </template>
            </q-file> -->

            <q-input
              filled
              type="text"
              v-model="offer.manufacturer"
              label="Manufacturer"
              hint="15 characters allowed."
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val.length < 16) ||
                  'Specify the manufacturer, please.',
              ]"
            />

            <q-select
              filled
              v-model="offer.size"
              :options="sizings"
              label="Sizing"
            />

            <q-input
              filled
              type="text"
              v-model="offer.material"
              label="Material"
              hint="20 characters allowed."
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0 && val.length < 16) ||
                  'Specify the material(s), please.',
              ]"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { mapGetters } from "vuex";

import db from "src/boot/firebase";
import {
  setDoc,
  doc,
  addDoc,
  Timestamp,
  collection,
  getDoc,
} from "firebase/firestore";

let $q;

export default {
  name: "PageCreate",
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  data() {
    return {
      files: [],
      counterLabelFn({ totalSize, filesNumber, maxFiles }) {
        return `${filesNumber} files of ${maxFiles} | ${totalSize}`;
      },
      sizings: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      // Default offer template
      offer: {
        title: "",
        images: [
          "", "", ""
        ],
        author: this.$store.getters.user.data.displayName,
        author_id: this.$store.getters.user.data.uid,
        manufacturer: "",
        price: 0,
        material: "",
        size: "M",
        date: null,
        contact: null,
        join: null,
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        // Create a new offer.
        let newOffer = this.offer;
        newOffer.date = Timestamp.now();
        newOffer.contact = this.user.data.email;

        if (this.offer.images[1] == '') {
          this.offer.images.splice(1, 1);
          // check if second image is also null
          if (this.offer.images[1] == '') {
            this.offer.images.splice(1, 1);
          }
        }
        else if (this.offer.images[2] == '') {
          this.offer.images.splice(2, 1);
        }

        // Get the user object of the logged in user.
        const docRef = doc(db, "users", this.user.data.email);
        const docSnap = await getDoc(docRef);
        let newUser = docSnap.data();

        // Append the new offer id to their offer list.
        newOffer.join = newUser.creation_date;
        const addedRef = await addDoc(collection(db, "offers"), newOffer);
        newUser.offers.push(addedRef.id);        
        setDoc(docRef, newUser, { merge: true });

        // Throw a toast letting them know they succeded.
        $q.notify({
          color: "green-4",
          textColor: "white",
          message: "Offer created!",
        });

        // Redirect to offer page.
        this.$router.push("/offer/" + addedRef.id);
      } catch (err) {
        console.error(err);
      }
    },
    // To be used when actual files can be uploaded.
    onRejected(rejectedEntries) {
      $q.notify({
        type: "negative",
        message: `Upload only images that are < 10MB - ${rejectedEntries.length} file(s).`,
      });
    },
    checkFileSize(files) {
      // Less than 10 MB
      return files.filter((file) => file.size < 1024 * 1024 * 10);
    },
  },
  mounted() {
    $q = useQuasar();
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
