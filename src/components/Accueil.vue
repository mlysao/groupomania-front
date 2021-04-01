<template>
  <div>
    <div class="btn btn-outline-primary mr-2" @click="toggleTabLogin">Se connecter</div>
    <div class="btn btn-outline-primary mr-2" @click="toggleTabSignup">S'inscrire</div>
    <div class="card mb-5">
      <login class="p-5" v-if="toggleLogin"></login>
      <signup class="p-5" v-if="toggleSignup"></signup>
    </div>
  </div>
</template>

<script>
import Signup from "./Signup";
import Login from "@/components/Login";

export default {
  name: "Accueil",
  data() {
    return {
      toggleLogin: true,
      toggleSignup: false
    }
  },
  methods: {
    toggleTabLogin: function (){
      this.toggleLogin =true;
      this.toggleSignup =false;
    },
    toggleTabSignup: function (){
      this.toggleLogin =false;
      this.toggleSignup =true;
    }
  },
  components: {
    Signup,
    Login,
  }
}
</script>

<style scoped>

</style>
