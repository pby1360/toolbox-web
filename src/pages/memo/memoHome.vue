<template>
  <div>
    <section class="memo-control">
      <v-btn @click="addNewMemo">생성</v-btn>
    </section>
    <section class="memo-container">
      <template v-for="memo in list" :key="memo.id">
        <Memo :memo="memo"></Memo>
      </template>
    </section>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { useStore } from "vuex";
import Memo from "./Memo.vue";

const axios = getCurrentInstance().proxy.axios;

const store = useStore();
const user = computed(() => store.getters.getUser);

const list = ref([]);

onMounted(() => init());

const init = () => getMemo();

const getMemo = () => axios.get('/v1/api/memo').then(response => list.value = response.data);

const addNewMemo = () => list.value.push({title: '', content: '', userId: user.value.id});

</script>

<style lang="scss" scoped>
.memo-control {
  margin: 1rem;
}
.memo-container {
  margin: 1rem;
  display: flex;
  gap: 1rem;
}
</style>