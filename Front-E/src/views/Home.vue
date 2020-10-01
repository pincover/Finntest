<template>
  <div
    class="blue lighten-5"
    style="font-family: 'Sarabun', sans-serif; width:100%; height:100%; "
  >
    <v-navigation-drawer
      v-model="drawer"
      width="300px"
      app
      class="light-blue lighten-3"
      clipped
      v-if="role == 1"
    >
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title
                class="subtitle-1"
                v-text="item.title"
              ></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            router
            :to="subItem.route"
          >
            <v-list-item-content>
              <v-list-item-title
                class="subtitle-1"
                v-text="subItem.title"
              ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="light-blue darken-1" clipped-left dark dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title @click="$router.push('/Home/profile')"
        >Application</v-toolbar-title
      >
      <div class="d-flex align-center"></div>

      <v-spacer></v-spacer>

      <v-btn
        @click="
          Logout();
          $router.push('/');
        "
        target="_blank"
        text
      >
        <span class="mr-2">Logout</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",

  components: {},

  data: () => ({
    drawer: true,
    role:null,
    items: [
      {
        action: "menu_book",
        title: "รายการข้อมูล",
        items: [{ title: "แก้ไขรายการ", route: "/Home/edittable" }],
      },
    ],
  }),
  mounted() {
    let token = { token:this.checkCookie("ssid")}
    axios
        .post("http://localhost:3000/api/home",token)
         
        .then((response) => {
           this.role = response.data
          
        })
        .catch((e) => {
          console.log(e);
        });
  },
  methods: {
    Logout() {
      document.cookie = "ssid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
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
<style>
.he1 {
  max-height: 350px;
  overflow: auto;
  font-size: small;
  padding: 0;
}
</style>
