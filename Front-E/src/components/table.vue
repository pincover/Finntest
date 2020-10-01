<template>
  <div>
   <v-form v-model="valid">
  <v-container >   
    <v-row justify='center'>
      <v-col>          
            <v-container> 
                <!-- รายงานการตรวจสอบ -->
                <v-row>
                  <v-col>
                    <v-card>
                      <v-app-bar class="light-blue darken-1" clipped-left dark dense>
                        <h3>รายการข้อมูล</h3>
                      </v-app-bar>
                      <v-alert>
                        <v-data-table
                            :headers="headers"
                            :items="datas"
                            :items-per-page="10"
                            class="elevation-1"
                        ></v-data-table>                    
                        </v-alert>
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
        headers: [
          {
            text: 'No',
            align: 'start',
            value: 'row',
          },
          { text: 'รายการ', value: 'name' },
        ],
        datas: [],

    }),

 mounted () {
    let token = { token:this.checkCookie("ssid")}
    axios
      .post("http://localhost:3000/api/table",token)

      .then((response) => {
        const data= response.data['data'];
        this.datas = data
      })
      .catch((e) => {
        console.log(e);
      });
    },
    methods: {
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
    }
};
</script>