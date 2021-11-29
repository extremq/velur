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
              v-model="register.username"
              label="Username"
              hint="12 characters maximum, only letters and numbers allowed."
              lazy-rules
              :rules="[
                (val) =>
                  (val &&
                    val.length > 0 &&
                    val.length < 13 &&
                    /^[a-zA-Z0-9]+$/.test(val)) ||
                  'Please type a valid username (12 characters maximum, only letters and numbers allowed)',
              ]"
            />

            <q-input
              filled
              type="email"
              v-model="register.email"
              label="Email"
              lazy-rules
              :rules="[
                (val) =>
                  (val &&
                    val.length > 0 &&
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      val
                    )) ||
                  'Please type a valid email address',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="register.password"
              label="Password"
              hint="At least 8 characters long, 1 uppercase, 1 lowercase and 1 number."
              lazy-rules
              :rules="[
                (val) =>
                  (val &&
                    val.length > 0 &&
                    val.length < 65 &&
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      val
                    )) ||
                  'Please type a valid password (at least 8 characters long, 1 uppercase, 1 lowercase and 1 number)',
              ]"
            />
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                label="Login instead"
                color="primary"
                outline
                class="q-ml-sm"
                to="/login"
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import db from "src/boot/firebase";
import { doc, setDoc, Timestamp, collection } from "firebase/firestore";

let $q;

export default {
  name: "PageLogin",
  data() {
    return {
      register: {
        email: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const auth = getAuth();
        createUserWithEmailAndPassword(
          auth,
          this.register.email,
          this.register.password
        )
          .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("Account created succesfully!");
            
            let newUser = {
              username: this.register.username,
              offers: []
            }
            await setDoc(doc(db, "users", this.register.email), newUser);

            this.$router.push("/");

            $q.notify({
              color: "green-4",
              textColor: "white",
              message: "Account created!",
            });
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            $q.notify({
              color: "red-4",
              textColor: "white",
              message: errorMessage,
            });
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    $q = useQuasar();
  },
};
</script>
