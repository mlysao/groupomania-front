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
    <div class="btn btn-primary mt-2" @click="login">Se connecter</div>
    <p class="text-danger mt-2" v-if="errorMsg">{{ errorMsg }}</p>
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
            console.log(reponse)
            if (reponse.status === 200 && 'token' in reponse.data) {
              sessionStorage.setItem('token', reponse.data.token);
              this.$router.push('/9gag')
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
