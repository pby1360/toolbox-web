<template>
  <div>
    <h1>Dashboard</h1>
    <div class="project-list">
      <p>목록</p>
      <div class="project" v-for="(project) in projectList" :key="project.id">
        <div>
          <!-- <v-text-field density="compact" variant="solo" v-model="project.name">            
          </v-text-field> -->
          {{ project.name }}
        </div>
        <div>
          <v-text-field density="compact" variant="solo" v-model="project.description"></v-text-field>
        </div>
        <div>{{ project.createdAt }}</div>
        <div>{{ project.modifiedAt }}</div>
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
const isModifyList = ref(store.getters['memoStore/getProjectList'].map(project => false));

const modify = async (id) => {
  const isConfirm = confirm("저장 하시겠습니까?");
  if (!isConfirm) return;

  store.commit('setLoading', true);
  const list = store.getters['memoStore/getProjectList'];
  const index = list.findIndex((project => project.id === id));  
  const data = list[index];

  const user = store.getters.getUser;
  
  await axios.put(`/v1/api/memo/users/${user.id}/project/${id}`, data)
  .then(response => {
    list[index] = response.data;
  })
  .catch(error => console.error(error))
  .finally(() => {
    store.commit('setLoading', false);
    // dialog.value = false;
  });
}

const remove = async (id) => {
  const isConfirm = confirm("삭제 하시겠습니까?");
  if (!isConfirm) return;

  store.commit('setLoading', true);

  const user = store.getters.getUser;
  await axios.delete(`/v1/api/memo/users/${user.id}/project/${id}`)
  .then(() => {
    const list = store.getters['memoStore/getProjectList'];
    const index = list.findIndex((project => project.id === id));
    list.splice(index, 1);
  })
  .finally(() => {
    store.commit('setLoading', false);
    // dialog.value = false;
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

    div {
      padding: 0.25rem;
      margin: auto;
    }

    > :nth-child(1) {
      flex: 1;
    }
    > :nth-child(2) {
      flex: 2;
    }
    > :nth-child(3) {
      flex: 1;
    }
    > :nth-child(4) {
      flex: 1;
    }
  }

}

</style>