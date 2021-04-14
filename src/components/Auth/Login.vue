<template>
  <div id="login">
    <h2 class="text-md-left">Bienvenue</h2>
    <hr>
    <div class="row">
      <div class="col">
        <form class="mt-5">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" v-model="formData.email" title="Email">
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" class="form-control" v-model="formData.password" title="Mot de passe">
          </div>
          <div class="btn btn-primary mt-2" @click="login" title="Se connecter">Se connecter</div>
          <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
        </form>
      </div>
      <div class="col"></div>
    </div>
    <p class="mt-2">
      Nouvel utilisateur ? <router-link to="Signup" title="S'inscrire">S'inscrire</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      errorMsg: ''
    }
  },
  methods: {
    login: function (){
      this.$http
          .post('http://localhost:3000/api/auth/login', {
            email: this.formData.email,
            password: this.formData.password
          })
          .then(reponse => {
            if (reponse.status === 200 && 'token' in reponse.data) {
              sessionStorage.setItem('token', reponse.data.token);
              sessionStorage.setItem('user', JSON.stringify(reponse.data.utilisateur));
              location.reload();
            }
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
