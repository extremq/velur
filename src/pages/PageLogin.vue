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
              v-model="login.email"
              label="Email"
              lazy-rules
              :rules="[
                (val) =>
                  (val &&
                    val.length > 0 &&
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      val
                    )) ||
                  'Invalid format. Did you mistype?',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="login.password"
              label="Password"
              lazy-rules
              :rules="[
                (val) =>
                  (val &&
                    val.length > 0 &&
                    val.length < 65 &&
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      val
                    )) ||
                  'Invalid format. Did you mistype?',
              ]"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Register account"
                color="primary"
                outline
                class="q-ml-sm"
                to="/register"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import db from "src/boot/firebase";
import {
  collection,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

let $q;

export default {
  name: "PageLogin",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const auth = getAuth();
        // Login with the credentials.
        signInWithEmailAndPassword(auth, this.login.email, this.login.password)
          .then(async (userCredential) => {
            let user = userCredential.user;

            //console.dir(user)

            // Throw a toast informing the user they logged in succesfully.
            $q.notify({
              color: "green-4",
              textColor: "white",
              message: "Logged in successfully!",
            });

            // console.dir(this.fetchUser);

            // Retrieve the user in order to update the state of the auth store.
            const snap = await getDoc(doc(db, "users", this.login.email));

            let name;
            name = snap.data().username;
            user.displayName = name;

            // Send a dispatch to update all the components.
            await this.$store.dispatch("fetchUser", user);
            this.$router.push("/");
          })
          .catch((error) => {
            // Throw a toast informing the user that they mistyped their
            // login info.
            const errorMessage = error.message;
            console.log(errorMessage);
            $q.notify({
              color: "red-4",
              textColor: "white",
              message: "Please retype your credentials.",
            });
          });
      } catch (err) {
        // Firebase error.
        console.error("Firebase error!" + err);
      }
    }
  },
  mounted() {
    $q = useQuasar();
  },
};
</script>
