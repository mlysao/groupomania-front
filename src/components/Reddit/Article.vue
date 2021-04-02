<template>
  <div class="card mb-5 p-5" v-if="login">
    <h2 class="text-md-left">Reddit</h2>
    <hr>
    <p>Articles Reddit ici</p>
  </div>
  <div class="card mb-5 p-5" v-else>
    <h2 class="text-md-left">Accès non autorisé, vous n'êtes pas connecté</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      login: !!sessionStorage.getItem('token')
    }
  }
}
</script>

<style scoped>

</style>
