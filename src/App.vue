<template>
  <div id="app" class="container mt-5">
    <div class="text-center">
      <router-link to="/">
        <img alt="Groupomania logo" src="./assets/logo.png" class="fill" width="500" height="500" title="Retourner à la page d'accueil">
      </router-link>
    </div>
    <div class="card mb-5 p-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
