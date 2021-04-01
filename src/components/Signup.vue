<template>
  <div>
    <form>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" v-model="formData.email">
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" class="form-control" v-model="formData.password">
      </div>
      <div class="btn btn-primary mt-2" @click="signup">S'inscrire</div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data(){
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signup: function (){
      this.$http
      .post('http://localhost:3000/api/auth/signup', {
        email: this.formData.email,
        password: this.formData.password
      }).then(reponse => {
        console.log(reponse);
      })
    }
  }
}
</script>

<style scoped>

</style>
