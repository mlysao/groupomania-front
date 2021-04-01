<template>
  <div class="card mb-5 p-5">
    <h2 class="text-md-left">Nouvel utilisateur</h2>
    <hr>
    <form class="mt-5">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="form-control" v-model="formData.email">
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" class="form-control" v-model="formData.password">
      </div>
      <div class="btn btn-primary mt-2" @click="signup">S'inscrire</div>
      <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
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
      },
      errorMsg: ''
    }
  },
  methods: {
    signup: function (){
      this.$http
      .post('http://localhost:3000/api/auth/signup', {
        email: this.formData.email,
        password: this.formData.password
      }).then(() => {
        this.$http
            .post('http://localhost:3000/api/auth/login', {
              email: this.formData.email,
              password: this.formData.password
            })
            .then(reponse => {
              if (reponse.status === 200 && 'token' in reponse.data) {
                sessionStorage.setItem('token', reponse.data.token);
                sessionStorage.setItem('user', JSON.stringify(reponse.data.utilisateur));
                this.$router.push('/')
              }
            })
            .catch(error => {
              this.errorMsg = error.response.data.error;
            })
      })
      .catch(error => {
        this.errorMsg = error.response.data.error;
      })
    }
  }
}
</script>

<style scoped>

</style>
