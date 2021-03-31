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
    </form>
    <div class="btn btn-primary mt-2" v-on:click="login">Se connecter</div>
    <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
  </div>
</template>

<script>
import axios from "axios";

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
      axios
          .post('http://localhost:3000/api/auth/login', {
            email: this.formData.email,
            password: this.formData.password
          })
          .then(reponse => {
            console.log(reponse);
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
