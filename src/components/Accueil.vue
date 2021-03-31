<template>
  <div>
    <div class="btn btn-outline-primary mr-2" v-on:click="toggleTab9GAG">9GAG</div>
    <div class="btn btn-outline-primary mr-2" v-on:click="toggleTabReddit">Reddit</div>
    <div class="btn btn-outline-primary mr-2" v-on:click="toggleTabLogin">Se connecter</div>
    <div class="btn btn-outline-primary mr-2" v-on:click="toggleTabSignup">S'inscrire</div>
    <div class="card mb-5">
      <publication :liste="publications" class="p-5" v-if="toggle9GAG"></publication>
      <article-accueil class="p-5" v-if="toggleReddit"></article-accueil>
      <login class="p-5" v-if="toggleLogin"></login>
      <signup class="p-5" v-if="toggleSignup"></signup>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Signup from "./Signup";
import Login from "@/components/Login";
import Publication from "@/components/9GAG/Publication";
import Article from "@/components/Reddit/Article";

export default {
  name: "Accueil",
  data() {
    return {
      publications: [],
      toggle9GAG: false,
      toggleReddit: false,
      toggleLogin: true,
      toggleSignup: false
    }
  },
  methods: {
    toggleTab9GAG: function (){
      this.toggle9GAG = true;
      this.toggleReddit = false;
      this.toggleLogin =false;
      this.toggleSignup =false;
    },
    toggleTabReddit: function (){
      this.toggle9GAG = false;
      this.toggleReddit = true;
      this.toggleLogin =false;
      this.toggleSignup =false;
    },
    toggleTabLogin: function (){
      this.toggle9GAG = false;
      this.toggleReddit = false;
      this.toggleLogin =true;
      this.toggleSignup =false;
    },
    toggleTabSignup: function (){
      this.toggle9GAG = false;
      this.toggleReddit = false;
      this.toggleLogin =false;
      this.toggleSignup =true;
    }
  },
  mounted(){
    axios
    .get('http://localhost:3000/api/publications')
    .then(reponse => {
      this.publications = reponse.data;
      console.log(this.publications)
    })
  },
  components: {
    'signup': Signup,
    'login': Login,
    'publication': Publication,
    'article-accueil': Article
  }
}
</script>

<style scoped>

</style>
