<template>
  <div id="publication">
    <p v-if="utilisateur.role === 'MODERATEUR'" class="alert-danger text-center">Vous êtes le modérateur, <Logout></Logout> </p>
    <p v-if="utilisateur.role !== 'MODERATEUR'" class="alert-info text-center">Vous êtes connecté en tant que {{ this.utilisateur.email_display }}, <Logout></Logout> </p>
    <h2 class="text-md-left">9GAG</h2>
    <router-link to="Publication" title="Ajouter une publication">Ajouter une publication</router-link>
    <hr>
    <ul class="liste">
      <li v-for="(value, index) in publications" :key="index">
        <div :id="'publication-' + value.id">
          <div id="attente" v-if="!value.modere && utilisateur.id === value.utilisateur.id">
            <p class="alert-danger text-center">Publication en attente de validation</p>
          </div>
          <div>
            <img class="avatar" :src="value.utilisateur.image_url" alt="Avatar" title="Avatar"> Publié par {{ value.utilisateur.email_display }} <small class="text-muted">le {{ value.date_publication | formatDate }}</small> <span class="badge bg-success">{{ value.date_publication | duration }}</span>
          </div>
          <div class="mt-3">
            <h4>{{ value.description }}</h4>
          </div>
          <div class="mt-2">
            <img class="img-thumbnail" :src="value.image_url" alt="Image publication" title="Image publication">
          </div>
          <div id="moderateur" v-if="!value.modere && utilisateur.role === 'MODERATEUR'">
            <div class="btn btn-danger mt-2" @click="valider(value.id)" title="Valider la publication">Valider la publication</div>
            <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
          </div>
          <div id="commentaire" v-if="value.modere">
            <Commentaire :publication="value.id"></Commentaire>
          </div>
        </div>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
import Commentaire from "@/components/9GAG/Commentaire";
import Logout from "@/components/Auth/Logout";

export default {
  name: "Publication",
  data() {
    return {
      publications: [],
      utilisateur: JSON.parse(sessionStorage.getItem('user')),
      errorMsg: ''
    }
  },
  mounted(){
    this.$http
        .get('http://localhost:3000/api/publications')
        .then(reponse => {
          this.publications = reponse.data;
        })
  },
  methods: {
    valider: function (id){
      this.$http
          .put(`http://localhost:3000/api/publications/${id}`, {
            publication: {
              modere: true
            }
          })
          .then(() => {
            location.reload();
          })
          .catch(error => {
            this.errorMsg = error.response.data.error;
          })
    }
  },
  components: {
    Commentaire,
    Logout
  }
}
</script>

<style scoped src="./Publication.css">

</style>
