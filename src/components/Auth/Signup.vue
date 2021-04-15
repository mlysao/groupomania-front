<template>
  <div id="signup">
    <h2 class="text-md-left">Nouvel utilisateur</h2>
    <hr>
        <form class="mt-5">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" class="form-control" v-model="formData.email" title="Email">
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" class="form-control" v-model="formData.password" title="Mot de passe">
          </div>
          <div class="form-group">
            <label for="image">Photo profil</label>
            <input type="file" id="image" class="form-control-file" accept="image/jpeg, image/jpg, image/png" title="Photo profil">
          </div>
          <div class="btn btn-primary mt-2" @click="signup" title="S'inscrire">S'inscrire</div> <div class="btn btn-secondary mt-2" @click="annuler" title="Annuler">Annuler</div>
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
      const data = new FormData();
      data.append('email', this.formData.email);
      data.append('password', this.formData.password);
      data.append('image', document.getElementById('image').files[0]);

      this.$http
      .post('http://localhost:3000/api/auth/signup', data).then(() => {
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
    },
    annuler: function (){
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>
