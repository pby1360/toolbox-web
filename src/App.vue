<template>
  <div>
    Hello! this is toolbox
  </div>
  <div>
    {{ list }}
  </div>
  <div><button @click="getMemo">get</button><button @click="() => list = []">clear</button></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getCurrentInstance } from 'vue';

const axios = getCurrentInstance().proxy.axios;
console.log(app);

onMounted(() => {
  // getMemo();
})

const list = ref([]);

const getMemo = () => axios.get('/v1/api/memo').then(response => list.value = response.data);


</script>

<style lang="scss" scoped>
div {
  color: red;
}
</style>