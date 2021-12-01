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

            <q-file
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
            </q-file>

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
      offer: {
        title: "",
        images: [
          "https://media.gq-magazine.co.uk/photos/5f575108020908336ccd4d82/master/w_1000,c_limit/20200907-tshirt-05.jpg",
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
        let newOffer = this.offer;
        newOffer.date = Timestamp.now();
        newOffer.contact = this.user.data.email;

        const docRef = doc(db, "users", this.user.data.email);
        
        const docSnap = await getDoc(docRef);

        let newUser = docSnap.data();

        newOffer.join = newUser.creation_date;
        const addedRef = await addDoc(collection(db, "offers"), newOffer);

        newUser.offers.push(addedRef.id);
        
        setDoc(docRef, newUser, { merge: true });
        


        $q.notify({
          color: "green-4",
          textColor: "white",
          message: "Submitted!",
        });
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
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
