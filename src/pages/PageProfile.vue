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
          <div class="col text-h3 text-center">
            {{ user.username }}
          </div>
        </q-card-section>
        <q-separator />

        <q-card-section class="lt-md">
          <q-item-label header> Details about the user </q-item-label>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label> {{ user.username }} </q-item-label>
                <q-item-label caption>Username</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> {{ user.creation_date }} </q-item-label>
                <q-item-label caption>Join date</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> {{ user.offers.length }} </q-item-label>
                <q-item-label caption>Active offers</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <q-card-section class="gt-sm">
          <q-item-label header> Details about the user </q-item-label>
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label> {{ user.username }} </q-item-label>
                <q-item-label caption>Username</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label> {{ user.creation_date }} </q-item-label>
                <q-item-label caption>Join date</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label> {{ user.offers.length }} </q-item-label>
                <q-item-label caption>Active offers</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <template v-if="user.offers.length > 0">
          <q-separator />
          <q-card-section>
            <q-list separator>
            <template v-for="(item, key) in offers" :key="key">
              <q-item>
                <q-item-section avatar>
                  <q-avatar rounded>
                    <img lazy :src="item.images[0]" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="ellipsis"> {{ item.title }} </q-item-label>
                  <q-item-label caption
                    >Offer created on
                    {{
                      new Date(item.date.seconds * 1000).toLocaleString()
                    }}</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-btn outline color="primary" label="Check out" :to="'/offer/' + key + '?redirect=' + this.$route.fullPath"/>
                </q-item-section>
              </q-item>
            </template>
            </q-list>
          </q-card-section>
        </template>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import { useQuasar } from "quasar";
import db from "src/boot/firebase";
import { query, collection, where, getDocs, orderBy } from "firebase/firestore";

let $q;

export default {
  name: "PageAbout",
  data() {
    return {
      user: {
        username: null,
        creation_date: null,
        offers: [],
        uid: null,
      },
      offers: {},
      found: false,
    };
  },
  methods: {
    async getProfile() {
      // Get the profile based on the parameter.
      const username = this.$route.params.username;

      // Use a query because it supports "where".
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = getDocs(q);

      // Even though I expect only one user,
      // it retrieves a list.
      (await querySnapshot).forEach((doc) => {
        this.user = doc.data();
        this.found = true;
      });

      if (this.found === true) {
        // If the user exists, translate their
        // timestamp into a date.
        this.user.creation_date = new Date(
          this.user.creation_date.seconds * 1000
        ).toLocaleString();

        // Request the offers of the author.
        if (this.user.offers.length > 0) {
          const q2 = query(
            collection(db, "offers"),
            where("author", "==", username),
            orderBy("date")
          );
          const querySnapshot2 = getDocs(q2);

          (await querySnapshot2).forEach((doc) => {
            this.offers[doc.id] = doc.data();
          });
        }
      } else {
        // There is no user with such name.
        $q.notify({
          color: "red-4",
          textColor: "white",
          message: "User doesn't exist.",
        });
        this.$router.push("/");
      }
    },
  },
  mounted() {
    $q = useQuasar();
    // Init and get the profile.
    this.getProfile();
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 400px
</style>
