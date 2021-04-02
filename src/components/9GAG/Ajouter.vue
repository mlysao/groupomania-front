<template>
  <div class="card mb-5 p-5" v-if="login">
    <h2 class="text-md-left">Ajouter une publication</h2>
    <hr>
    <form class="mt-5">
      <div class="form-group">
        <label for="description">Description</label>
        <input id="description" class="form-control" v-model="formData.description">
      </div>
      <div class="form-group">
        <input type="file" id="image" class="form-control-file" accept="image/jpeg, image/jpg, image/png">
      </div>
      <div class="btn btn-primary mt-2" @click="ajouter">Valider</div> <div class="btn btn-light mt-2" @click="annuler">Annuler</div>
      <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
    </form>
  </div>
  <div class="card mb-5 p-5" v-else>
    <h2 class="text-md-left">Accès non autorisé, vous n'êtes pas connecté</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formData: {
        description: ''
      },
      errorMsg: '',
      login: !!sessionStorage.getItem('token'),
    }
  },
  methods: {
    ajouter: function (){
      const data = new FormData();
      data.append('publication', JSON.stringify(this.formData));
      data.append('image', document.getElementById('image').files[0]);

      this.$http
          .post('http://localhost:3000/api/publications', data)
          .then(() => {
            this.$router.push('/9gag');
          })
          .catch(error => {
            this.errorMsg = error.response.data.error;
          })
    },
    annuler: function (){
      this.$router.push('/9gag');
    }
  }
}
</script>

<style scoped>

</style>
