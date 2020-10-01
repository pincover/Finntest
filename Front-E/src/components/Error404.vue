<template>
  <div class="fixed-center text-center">
    <br><br><br>
    <p>
      <img
        src="../assets/sad.svg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Sorry, nothing here...<strong>(404)</strong></p>
    <v-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Back to Sign In
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
