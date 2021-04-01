<template>
  <div class="card mb-5">
    <ul class="liste">
      <li v-for="(value, index) in publications" :key="index">
        <div class="card mt-5">
          <div class="card-body p-5">
            <div>
              {{ value.utilisateur_id }} - {{ value.date_publication }}
            </div>
            <div>
              {{ value.description }}
            </div>
            <div>
              <img :src="value.image_url">
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Publication",
  data() {
    return {
      publications: []
    }
  },
  props: ['liste'],
  mounted(){
    this.$http
        .get('http://localhost:3000/api/publications')
        .then(reponse => {
          this.publications = reponse.data;
          console.log(this.publications)
        })
  },
}
</script>

<style scoped src="./Publication.css">

</style>
