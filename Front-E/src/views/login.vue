<template>
  <v-app id="login">
    <v-container fill-height fluid class="bg">
          <v-card class="card"   outlined color="pink lighten-5">
            <v-row align="center" justify="center">
              <v-col cols="6"> 
                <p class="p">Login !!!!</p>

              </v-col>
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
                <v-row align="center" justify="center"> 
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="user"
                      label="Email"
                      name="login"
                      prepend-icon="person"
                      type="text"
                    />

                    <v-text-field
                      v-model="pass"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      append-icon="mdi-eye-off"
                      :type="showpassword ? 'text' : 'password'"
                      @click:append="showpassword = !showpassword"
                    />
                  </v-form>
                </v-card-text>
                <v-row justify="center">
                  <v-btn
                    class="bottomright"
                    color="primary"
                    @click="LoginSubmit()"
                    >Login</v-btn
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
  name: "Login",

  data() {
    return {
      user: null,
      pass: null,
      isPwd: true,
      showpassword: false,
    };
  },

  methods: {
    LoginSubmit() {
      if(this.user == null || this.pass == null ){
        window.alert("กรุณากรอกให้ครบ");
        }
      else{
      let x = { user: this.user, pass: this.pass };
      axios
        .post("http://localhost:3000/api/login", x)
        .then((response) => {
          // JSON responses are automatically parsed.
          if (response.data) {
            document.cookie = "ssid=" + response.data["data"] + ";path=/";
            this.$router.push("/Home/table");
          } else {
            window.alert("Username or Password incorrect");
          }
        })
        .catch((e) => {
          this.errors.push(e);
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
.bottom {
  position: absolute;
  top: 305px;
}
.card {
  left: 25%;
  width: 50%;
  height: 50%;
}
.p{
  font-size: 70px;
  color:rgba(19, 77, 245, 1);
  text-align: center;
}
</style>
