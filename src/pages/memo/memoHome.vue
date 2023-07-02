<template>
  <div>
    memo home!
    <div style="margin: 2rem;">
      {{ list }}
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';

const axios = getCurrentInstance().proxy.axios;

onMounted(() => {
  getMemo();
})

const list = ref([]);

const getMemo = () => axios.get('/v1/api/memo').then(response => list.value = response.data);


</script>

<style lang="scss" scoped>
.app {
  background-color: red;
}
</style>