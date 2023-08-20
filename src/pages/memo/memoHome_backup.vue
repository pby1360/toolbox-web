<template>
  <div>
    <v-btn class="floating-button-add" icon="mdi-plus" @click="addNewMemo" size="large"></v-btn>
    <section class="memo-container">
      <template v-for="memo in list" :key="memo.id">
        <Memo :memo="memo" @onSave="onSave" @onDelete="onDelete" @remove="remove"></Memo>
      </template>
    </section>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { useStore } from "vuex";
import Memo from "./Memo.vue";
import {v4 as uuidv4} from 'uuid';

const axios = getCurrentInstance().proxy.axios;

const store = useStore();
const user = computed(() => store.getters.getUser);

const list = ref([]);

onMounted(() => init());

const init = () => getMemo();

const getMemo = async () => {
  store.commit('setLoading', true);
  const userId = store.getters.getUser.id;
  await axios.get(`/v1/api/memo/users/${userId}`)
  .then(response => list.value = response.data)
  .catch(error => alert('작업을 실패했습니다.'))
  .finally(() => store.commit('setLoading', false));
}

const addNewMemo = () => list.value.push({uuid: uuidv4(), title: '', content: '', userId: user.value.id});

const remove = (uuid) => {
  const newList = list.value.filter(item => item.uuid != uuid);
  list.value = newList;
}

const onSave = (uuid, memo) => {
  const index = list.value.findIndex(item => item.uuid == uuid);
  console.log(index);
  list.value[index] = memo;
}

const onDelete = (id) => {
  const newList = list.value.filter(item => item.id != id);
  list.value = newList;
}
</script>

<style lang="scss" scoped>
.memo-container {
  margin: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.floating-button-add {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
}
</style>