<template>
  <div id="commenter">
    <form>
      <div class="form-group">
        <div>
          <textarea id="contenu" class="form-control" v-model="formData.contenu" placeholder="Ecrivez un commentaire" title="Commentaire"></textarea>
        </div>
      </div>
      <div class="btn btn-primary" @click="commenter" title="Commenter">Commenter</div>
      <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Commenter",
  data() {
    return {
      formData: {
        contenu: ''
      },
      errorMsg: ''
    }
  },
  methods: {
    commenter: function (){
      const data = new FormData();
      data.append('contenu', this.formData.contenu);
      data.append('publication_id', this.publication_id);

      this.$http
          .post(`http://localhost:3000/api/commentaires`, data)
          .then(() => {
            this.formData.contenu = '';
            this.$emit('refresh');
          })
          .catch(error => {
            this.errorMsg = error.response.data.error;
          })
    },
    annuler: function (){
      location.reload();
    },
  },
  props: ['publication_id']
}
</script>

<style scoped>

</style>
