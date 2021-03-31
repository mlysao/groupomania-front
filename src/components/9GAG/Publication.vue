<template>
  <div>
    <ul class="liste">
      <li v-for="(value, index) in liste" v-bind:key="index">
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
  props: ['liste']
}
</script>

<style scoped src="./Publication.css">

</style>
