<template>
  <div class="card mb-5 p-5" v-if="login">
    <h2 class="text-md-left">9GAG</h2>
    <router-link to="Publication">Ajouter une publication</router-link>
    <hr>
    <ul class="liste">
      <li v-for="(value, index) in publications" :key="index">
        <div id="publication">
          <div>
            <img class="avatar" :src="value.utilisateur.image_url" alt="Avatar"> Publié par {{ value.utilisateur.email_display }} le {{ value.date_publication }}
          </div>
          <div class="mt-3">
            <h4>{{ value.description }}</h4>
          </div>
          <div class="mt-2">
            <img class="img-thumbnail" :src="value.image_url">
          </div>
        </div>
        <hr>
      </li>
    </ul>
  </div>
  <div class="card mb-5 p-5" v-else>
    <h2 class="text-md-left">Accès non autorisé, vous n'êtes pas connecté</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: "Publication",
  data() {
    return {
      publications: [],
      login: !!sessionStorage.getItem('token'),
    }
  },
  props: ['liste'],
  mounted(){
    this.$http
        .get('http://localhost:3000/api/publications')
        .then(reponse => {
          this.publications = reponse.data;
        })
  },
}
</script>

<style scoped src="./Publication.css">

</style>
