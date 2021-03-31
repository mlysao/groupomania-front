<template>
  <div id="app" class="container mt-5">
    <img alt="Groupomania logo" src="./assets/logo.png" class="fill">
    <accueil></accueil>
  </div>
</template>

<script>
import Accueil from "@/components/Accueil";
export default {
  name: 'App',
  components: {
    'accueil': Accueil
  }
}
</script>

<style>
</style>
