<template>
  <div id="accueil" v-if="login">
    <div>
      <h2 class="text-md-left">Bienvenue, vous êtes connecté</h2>
      <hr>
      <p class="mt-2">
        Aller sur <router-link to="9GAG" title="Aller sur 9GAG">9GAG</router-link> ou <router-link to="Reddit" title="Aller sur Reddit">Reddit</router-link> ou consulter <router-link to="Utilisateur" title="Aller sur votre compte">votre compte</router-link>
      </p>
      <p>
        Vous n'êtes pas <strong>{{ utilisateur.email_display }}</strong>, <Logout></Logout>
      </p>
    </div>
  </div>
  <div v-else>
    <login></login>
  </div>


</template>

<script>
import Login from "@/components/Auth/Login";
import Logout from "@/components/Auth/Logout";

export default {
  name: "Accueil",
  data() {
    return {
      login: !!sessionStorage.getItem('token'),
      utilisateur: JSON.parse(sessionStorage.getItem('user'))
    }
  },
  components: {
    Login,
    Logout
  }
}
</script>

<style scoped>

</style>
