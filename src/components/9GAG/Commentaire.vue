<template>
  <div class="mt-5 mb-5" v-if="login">
    <button type="button" class="btn btn-primary mb-2" @click="displayCommentaires">
      Commentaires <span class="badge bg-secondary" title="Nombre total de commentaires">{{ this.commentaires.length }}</span> <span class="badge bg-danger" title="Nombre de commentaires en attente de validation" v-if="utilisateur.role === 'MODERATEUR'">{{ this.commentairesNonModeres.length }}</span>
    </button>
    <div class="card-footer p-5" v-if="displayComments">
      <Commenter :publication_id="this.publication_id" @refresh="refresh"></Commenter>
      <hr>
      <ul class="liste">
        <li v-for="(value, index) in commentaires" :key="index">
          <div id="commentaire">
            <div id="attente" v-if="!value.modere && utilisateur.id === value.utilisateur.id">
              <p class="alert-danger text-center">Commentaire en attente de validation</p>
            </div>
            <div>
              <img class="avatar" :src="value.utilisateur.image_url" alt="Avatar"> Posté par {{ value.utilisateur.email_display }} le {{ value.date_publication }}
            </div>
            <div class="mt-3">
              <h4>{{ value.contenu }}</h4>
            </div>
            <div id="moderateur" v-if="!value.modere && utilisateur.role === 'MODERATEUR'">
              <div class="btn btn-danger mt-2" @click="valider(value.id)">Valider le commentaire</div>
              <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
            </div>
          </div>
          <hr>
        </li>
      </ul>
    </div>
  </div>
  <div class="card mb-5 p-5" v-else>
    <h2 class="text-md-left">Accès non autorisé, vous n'êtes pas connecté</h2>
    <hr>
  </div>
</template>

<script>
import Commenter from "@/components/9GAG/Commenter";

export default {
  name: "Commentaire",
  data() {
    return {
      publication_id: this.publication,
      commentaires: [],
      login: !!sessionStorage.getItem('token'),
      utilisateur: JSON.parse(sessionStorage.getItem('user')),
      errorMsg: '',
      displayComments: false,
      commentairesNonModeres: []
    }
  },
  props: ['publication'],
  mounted(){
    this.$http
        .get('http://localhost:3000/api/commentaires', { params: { publication: this.publication } })
        .then(reponse => {
          this.commentaires = reponse.data;
        })
    this.$http
        .get('http://localhost:3000/api/commentaires', { params: { publication: this.publication, modere: false } })
        .then(reponse => {
          this.commentairesNonModeres = reponse.data;
        })
  },
  methods: {
    valider: function (id){
      const data = new FormData();
      data.append('modere', true);
      data.append('publication_id', this.publication_id);

      this.$http
          .put(`http://localhost:3000/api/commentaires/${id}`, data)
          .then(() => {
            this.refresh();
          })
          .catch(error => {
            this.errorMsg = error.response.data.error;
          })
    },
    displayCommentaires: function () {
      return this.displayComments = !this.displayComments;
    },
    refresh: function () {
      this.$http
          .get('http://localhost:3000/api/commentaires', { params: { publication: this.publication } })
          .then(reponse => {
            this.commentaires = reponse.data;
            this.displayComments = false;
            this.displayCommentaires();
          })
    }
  },
  components: {
    Commenter
  }
}
</script>

<style scoped src="./Publication.css">

</style>
