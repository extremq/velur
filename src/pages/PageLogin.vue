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
              v-model="login.username"
              label="Username"
              lazy-rules
              :rules="[
                (val) =>
                  (val &&
                    val.length > 0 &&
                    val.length < 13 &&
                    /^[a-zA-Z0-9]+$/.test(val)) ||
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
import { mapActions } from "vuex";

let $q

export default {
  name: "PageLogin",
  data() {
    return {
      login: {
        username: "abc",
        password: "123ABcdefg",
      },
    };
  },
  methods: {
    ...mapActions('auth', ['doLogin']),
    async onSubmit() {
      try {
        await this.doLogin(this.login)
      } catch (err) {
        console.log(err)
        if (err.response.data.detail) {
          $q.notify({
            color: "red-4",
            textColor: "white",
            message: err.response.data.detail,
          });
        }
      }
    },
  },
  mounted () {
    $q = useQuasar()
  }
};
</script>
