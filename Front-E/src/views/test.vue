<template>
  <div>
    <p>แผนผังฟาร์ม</p>
    <!-- <p>{{date}}</p> -->
    <v-btn raised class="green" @click="onPickFile">Upload image</v-btn>
    <input name="file" type="file" style="display: none" ref="fileInput" enctype=multipart/form-data accept="image/*" @change="onFileselected"/>

    <!-- <v-btn
                      color="primary"
                      @click="hidden = !hidden"
                      v-model="AttachEvidence"
                      >แนบไฟล์
                      <v-file-input multiple label="แนบไฟล์"></v-file-input>
                    </v-btn> -->

    <v-btn color="primary" v-on:click=" goo(); onUplode(); ">
      submit
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    selectFile: null,
    // date: new Date(),
    
    
  }),
  

  methods: {
    onFileselected(event) {
      console.log(event);
      this.selectFile = event.target.files[0];
      console.log(this.selectFile);
      
    },
    test(){
      this.date.setDate(date.getDate() + 1);
    },
    onUplode() {
      const img = new FormData();
      img.append("image", this.selectFile, this.selectFile.name);
      console.log(img.append);
      axios
        .post("http://127.0.0.1:8081/img", img, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then((response) => {
          // JSON responses are automatically parsed.
          console.log(response.data);
          if (response.data) {
            // this.$router.push("/Home");
          } else {
            window.alert("Not File");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    goo() {
      console.log("game")
    },
    
  },
};
</script>
