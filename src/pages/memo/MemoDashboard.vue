<template>
  <div>
    <h1>Dashboard</h1>
    <div class="project-list">
      <p>목록</p>
      <div class="project" v-for="project in projectList" :key="project.id">
        <span>{{ project.name }}</span>
        <span>{{ project.description }}</span>
        <span>{{ project.createdAt }}</span>
        <!-- <span>{{ project.modifiedAt }}</span> -->
        <v-btn variant="outlined" color="info" @click="modify(project.id)" style="margin-right: 0.1rem;">수정</v-btn>
        <v-btn variant="outlined" color="red" @click="remove(project.id)">삭제</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, ref } from "vue";
import { useStore } from "vuex";

const axios = getCurrentInstance().proxy.axios;
const store = useStore();

const projectList = computed(() => store.getters['memoStore/getProjectList']);

const modify = async (id) => {
  store.commit('setLoading', true);
  const list = store.getters['memoStore/getWorkspaceList'];
  const index = list.findIndex((workspace => workspace.id === id));  
  const data = list[index];
  data.description = data.description + '!';

  const user = store.getters.getUser;
  
  await axios.put(`/v1/api/memo/users/${user.id}/workspace/${id}`, data)
  .then(response => {
    list[index] = response.data;
  })
  .catch(error => console.error(error))
  .finally(() => {
    store.commit('setLoading', false);
    dialog.value = false;
  });
}

const remove = async (id) => {
  store.commit('setLoading', true);

  const user = store.getters.getUser;
  await axios.delete(`/v1/api/memo/users/${user.id}/workspace/${id}`)
  .then(() => {
    const list = store.getters['memoStore/getWorkspaceList'];
    const index = list.findIndex((workspace => workspace.id === id));
    list.splice(index, 1);
  })
  .finally(() => {
    store.commit('setLoading', false);
    dialog.value = false;
  });
}
</script>

<style lang="scss" scoped>
p {
    font-size: 1.25rem;
    font-weight: bold;
}
.project-list {
  margin: 2rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  
  .project {
    text-align: start;
    display: flex;
    justify-content: center;
    height: 3rem;
    
    span {
      flex: 1;
    }
  }
}

</style>