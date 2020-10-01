<template>
  <v-app id="sign">
    <v-container fill-height fluid class="bg">
      <v-card color="pink lighten-5" class="card">
        <v-row align="center" justify="center">
          <v-col cols="6">
            <v-row justify="end">
              <v-btn-toggle class="topright" color="primary">
                <v-btn @click="$router.push('/')">
                  Login
                </v-btn>
                <v-btn @click="$router.push('/signup')">
                  Sign up
                </v-btn>
              </v-btn-toggle>
            </v-row>
            <v-row justify="center">
              <v-card-title>Create User</v-card-title>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="UserID"
                    label="UserID"
                    name="UserID"
                    prepend-icon="person"
                    type="text"
                    outlined
                    dense
                  />

                  <v-text-field
                    v-model="Password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    outlined
                    dense
                  />
                  <v-text-field
                    v-model="name"
                    label="Name"
                    name="Name"
                    prepend-icon="book"
                    outlined
                    dense
                  />
                  <v-radio-group v-model="role" :mandatory="false" row>
                    <v-radio label="Admin" value="1"></v-radio>
                    <v-spacer></v-spacer>
                    <v-radio label="User" value="2"></v-radio>
                  </v-radio-group>
                </v-form>
              </v-card-text>
              <v-row justify="start">
                <v-btn
                  class="bottomright"
                  color="primary"
                  @click="SubmitSignup()"
                  >Submit</v-btn
                >
              </v-row>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    e1: 1,
    valid: false,
    UserID: null,
    Password: null,
    name: null,
    role: null,
  }),

  methods: {
    async SubmitSignup() {
      if(this.UserID == null || this.Password == null || this.name == null || this.role == null){
         window.alert("กรุณากรอกให้ครบ");
      }
      else{
      let obj = {
        UserID: this.UserID,
        Password: this.Password,
        name: this.name,
        role: this.role,
      };
      await axios
        .post("http://localhost:3000/api/regis", obj)
        .then((response) => {
          if (response.data) {
            window.alert("Register Success");
            this.$router.push("/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      }
    },
  },
};
</script>
<style>
.bg {
  background-image: url("../assets/back.jpg");
  height: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
}
.c1 {
  background: rgb(33, 96, 238);
  background: linear-gradient(
    180deg,
    rgba(33, 96, 238, 1) 26%,
    rgba(19, 77, 245, 1) 45%,
    rgba(8, 154, 236, 1) 62%,
    rgba(14, 183, 255, 1) 75%,
    rgba(0, 212, 255, 1) 86%
  );
}
.bottomright {
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 40px;
}
.topright {
  position: absolute;
  top: 1px;
  right: 20px;
  font-size: 40px;
}
.card {
  left: 30%;
  width: 700px;
  height: 500px;
}
.p {
  font-size: 95px;
  color: rgba(19, 77, 245, 1);
  text-align: center;
}
</style>
