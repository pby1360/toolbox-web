<template>
  <div>
    workspace {{ id }}
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route);
const id = ref();
id.value = route.params.id;
onMounted(() => console.log('mounted'));
</script>

<style lang="scss" scoped>

</style>