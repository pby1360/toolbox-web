<template>
  <div class="project">
    <h3>프로젝트</h3>
    <v-text-field density="compact" variant="solo" :readonly="true" label="프로젝트명" v-model="project.name"></v-text-field>
    <v-text-field density="compact" variant="solo" :readonly="true" label="프로젝트 설명" v-model="project.description"></v-text-field>
    <v-text-field density="compact" variant="solo" :readonly="true" label="생성일시" v-model="project.createdAt"></v-text-field>
    <v-text-field density="compact" variant="solo" :readonly="true" label="최근수정일시" v-model="project.modifiedAt"></v-text-field>
    <p>워크스페이스</p>
    <div class="workspace" v-for="workspace in project.workspaceList" :key="workspace.id">
      <span>{{ workspace.name }}</span>
      <span>{{ workspace.description }}</span>
      <span>{{ workspace.createdAt }}</span>
      <span>{{ workspace.modifiedAt }}</span>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const axios = getCurrentInstance().proxy.axios;
const store = useStore();
const route = useRoute();

const id = ref();
id.value = route.params.projectId;

const project = ref({});

onMounted(() => {
  getproject();
});

const getproject = async () => {
  store.commit('setLoading', true);
  await axios.get(`/v1/api/memo/project/${id.value}`)
  .then(response => project.value = response.data)
  .finally(() => {
    store.commit('setLoading', false);
  });
}

</script>

<style lang="scss" scoped>

.project {

  .workspace {
    display: flex;
    span {
      flex: 1;
    }
  }
}

</style>