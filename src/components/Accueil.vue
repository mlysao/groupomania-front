<template>
  <div v-if="login">
    <div class="card mb-5 p-5">
      <h2 class="text-md-left">Bienvenue, vous êtes connecté</h2>
      <hr>
      <p class="mt-2">
        Aller sur <router-link to="9GAG" title="Aller sur 9GAG">9GAG</router-link> ou <router-link to="Reddit" title="Aller sur Reddit">Reddit</router-link> ou consulter <router-link to="Utilisateur" title="Aller sur votre compte">votre compte</router-link>
      </p>
      <p>
        Vous n'êtes pas <strong>{{ utilisateur.email_display }}</strong>, <a href="/" @click="logout" title="Se déconnecter">se déconnecter</a>
      </p>
    </div>
  </div>
  <div v-else>
    <login></login>
  </div>


</template>

<script>
import Login from "@/components/Login";

export default {
  name: "Accueil",
  data() {
    return {
      login: !!sessionStorage.getItem('token'),
      utilisateur: JSON.parse(sessionStorage.getItem('user'))
    }
  },
  methods: {
    logout: function (){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.$router.push('/');
    },
  },
  components: {
    Login,
  }
}
</script>

<style scoped>

</style>
