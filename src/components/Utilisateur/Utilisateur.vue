<template>
  <div id="utilisateur">
    <h2 class="text-md-left">Mon compte</h2>
    <hr>
    <form class="mt-5">
      <div class="form-group">
        <img alt="Photo profil" class="img-thumbnail" :src="utilisateur.image_url" title="Photo profil">
      </div>
      <div class="form-group">
        {{ utilisateur.email_display }}
      </div>
      <div class="btn btn-primary mt-2" @click="logout" title="Se déconnecter">Se déconnecter</div>
      <br>
      <div class="btn btn-danger mt-2" @click="supprimer" title="Supprimer mon compte">Supprimer mon compte</div>
      <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Utilisateur",
  data() {
    return {
      utilisateur: JSON.parse(sessionStorage.getItem('user')),
      errorMsg: ''
    }
  },
  methods: {
    logout: function (){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.$router.push('/');
    },
    supprimer: function (){
      this.$http
          .delete(`http://localhost:3000/api/auth/${this.utilisateur.id}`)
          .then(() => {
            this.logout()
          })
          .catch(error => {
            this.errorMsg = error.response.data.error;
          })
    }
  },
}
</script>

<style scoped>

</style>
