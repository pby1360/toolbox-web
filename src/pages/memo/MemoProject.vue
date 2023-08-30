<template>
  <div>
    Project {{ id }}
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const id = ref();
id.value = route.params.id;

</script>

<style lang="scss" scoped>

</style>