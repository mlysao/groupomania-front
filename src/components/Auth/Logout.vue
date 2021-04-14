<template>
  <a href="/" @click="logout" title="Se déconnecter">se déconnecter</a>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    logout: function (){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>

</style>
