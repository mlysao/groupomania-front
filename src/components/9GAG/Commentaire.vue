<template>
  <div id="commentaire" class="mt-5 mb-5">
    <div>
      <div class="btn btn-primary mb-2" @click="displayCommentaires" title="Afficher commentaires">
        Commentaires <span class="badge bg-secondary" title="Nombre total de commentaires">{{ this.commentaires.length }}</span> <span class="badge bg-danger" title="Nombre de commentaires en attente de validation" v-if="utilisateur.role === 'MODERATEUR'">{{ this.nbCommentairesAValider }}</span>
      </div>
      <div class="btn btn-outline-success mb-2 ml-2" @click="likePublication(1)" title="Like">
        Like {{ this.likes }}
      </div>
      <div class="btn btn-outline-danger mb-2 ml-2" @click="likePublication(-1)" title="Dislike">
        Dislike {{ this.dislikes }}
      </div>
    </div>

    <div class="card-footer p-5" v-if="displayComments">
      <Commenter :publication_id="this.publication" @refresh="refreshCommentaire"></Commenter>
      <hr>
      <ul class="liste">
        <li v-for="(value, index) in commentaires" :key="index">
          <div>
            <div id="attente" v-if="!value.modere && utilisateur.id === value.utilisateur.id">
              <p class="alert-danger text-center">Commentaire en attente de validation</p>
            </div>
            <div>
              <img class="avatar" :src="value.utilisateur.image_url" alt="Avatar" title="Avatar"> Posté par {{ value.utilisateur.email_display }} <small class="text-muted">le {{ value.date_publication | formatDate }}</small> <span class="badge bg-success">{{ value.date_publication | duration }}</span>
            </div>
            <div class="mt-3">
              <h4>{{ value.contenu }}</h4>
            </div>
            <div id="moderateur" v-if="!value.modere && utilisateur.role === 'MODERATEUR'">
              <div class="btn btn-danger mt-2" @click="valider(value.id)" title="Valider le commentaire">Valider le commentaire</div>
              <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
            </div>
          </div>
          <hr>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Commenter from "@/components/9GAG/Commenter";

export default {
  name: "Commentaire",
  data() {
    return {
      commentaires: [],
      nbCommentairesAValider: 0,
      likes: 0,
      dislikes: 0,
      displayComments: false,
      errorMsg: '',
      utilisateur: JSON.parse(sessionStorage.getItem('user')),
    }
  },
  props: ['publication'],
  mounted(){
    this.refreshCommentaire()
    this.refreshLike()
  },
  methods: {
    valider: function (id){
      const data = new FormData();
      data.append('modere', true);
      data.append('publication_id', this.publication);
      this.$http
          .put(`http://localhost:3000/api/commentaires/${id}`, data)
          .then(() => {
            this.refreshCommentaire();
            // pour que la partie commentaires reste ouverte après la validation
            this.displayComments = false;
            this.displayCommentaires();
          })
          .catch(error => {
            this.errorMsg = error.response.data.error;
          })
    },
    displayCommentaires: function () {
      return this.displayComments = !this.displayComments;
    },
    // méthode passer dans le composant Commenter pour permettre le déclenchement du refresh de la partie commentaires après la saisie d'un nouveau commentaire
    refreshCommentaire: function () {
      this.$http
          .get('http://localhost:3000/api/commentaires', { params: { publication: this.publication } })
          .then(reponse => {
            this.commentaires = reponse.data;
            this.nbCommentairesAValider = this.commentaires.filter(commentaire => commentaire.modere === false).length;
          })
    },
    likePublication: function (value) {
      // value = 1 like ou -1 dislike
      this.$http
          .post(`http://localhost:3000/api/publications/${this.publication}/like`, {
            like: value
          })
          .then(() => {
            this.refreshLike();
          })
          .catch(error => {
            this.errorMsg = error.response.data.error;
          })
    },
    refreshLike: function () {
      this.$http
          .get(`http://localhost:3000/api/publications/${this.publication}/like`)
          .then(reponse => {
            this.likes = reponse.data.likes;
            this.dislikes = reponse.data.dislikes;
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
