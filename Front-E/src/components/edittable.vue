<template>
  <div>
   <v-form v-model="valid">
  <v-container >   
    <v-row justify='center'>
      <v-col>          
            <v-container> 
                <v-row>
                  <v-col>
                    <v-card class="card">
                      <v-app-bar class="light-blue darken-1" clipped-left dark dense>
                        <h3>แก้ไขรายการข้อมูล</h3>
                      </v-app-bar>
                       <v-container> 
                      <v-row justify='center'>
                        <v-col>
                          <div></div>
                        </v-col>
                        <v-col>
                      <v-text-field
                    v-model="List"
                    label="รายการ"
                    name="List"
                    type="text"
                    outlined
                    dense
                  />
                        </v-col>
                        <v-col>
                          <div></div>
                        </v-col>
                      </v-row>
                      <v-row align="end" justify="center">
                <v-btn
                  class="bottomright"
                  color="primary"
                  @click="Submit()"
                  >Submit</v-btn
                >
              </v-row>
                       </v-container>
                    </v-card>
                  </v-col>
                </v-row>
            </v-container>
      </v-col>
    </v-row>
  </v-container>
</v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    List: null,
  }),

  methods: {
    async Submit() {
      if(this.List == null){
         window.alert("กรุณากรอกให้ครบ");
      }
      else{
      let obj = {
        List: this.List,
        token:this.checkCookie("ssid")
      };
      await axios
        .post("http://localhost:3000/api/edittable", obj)
        .then((response) => {
          // JSON responses are automatically parsed.
          if (response.data) {
            window.alert("Success");
            this.$router.push("/Home/table");
          }
        })
        .catch((e) => {
          console.log(e);
        });
      }
    },
    getCookie(cname) {
      let name = cname + "=";
      let ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    checkCookie(e) {
      let user = this.getCookie(e);
      return user;
    },
  },
};
</script>
<style >
.card {
  left: 30%;
  width: 700px;
  height: 500px;
}
.bottomright {
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 40px;
}
</style>