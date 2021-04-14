<template>
  <div id="publier">
    <h2 class="text-md-left">Ajouter une publication</h2>
    <hr>
    <form class="mt-5">
      <div class="form-group">
        <label for="description">Description</label>
        <input id="description" class="form-control" v-model="formData.description" title="Description">
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" id="image" class="form-control-file" accept="image/jpeg, image/jpg, image/png, image/gif" title="Image à publier">
      </div>
      <div class="btn btn-primary mt-2" @click="publier" title="Valider publication">Valider</div> <div class="btn btn-secondary mt-2" @click="annuler" title="Annuler">Annuler</div>
      <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Ajouter",
  data() {
    return {
      formData: {
        description: ''
      },
      errorMsg: ''
    }
  },
  methods: {
    publier: function (){
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
