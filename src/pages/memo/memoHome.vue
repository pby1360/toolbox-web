<template>
  <div class="memo-wrap">
    <transition name="display">
      <div v-show="!isHidden" class="side">
        <div class="home">
          <p>Home</p>
          <v-btn to="/memo" variant="flat" color="info" class="dashboard">Dashboard</v-btn>
        </div>
        <div class="workspace-list">
          <p>Workspace</p>
          <v-btn v-for="workspace in workspaceList" :key="workspace.id" variant="tonal" color="info" class="workspace" :to="`/memo/${workspace.id}`">{{ workspace.name }}</v-btn>
        </div>
        <div class="toggle">
          <v-btn variant="flat" color="grey" @click="isHidden = true">minimun</v-btn>
        </div>
      </div>
    </transition>
    <button v-show="isHidden" class="toggle-open" @click="isHidden = !isHidden">open</button>
    <div class="content">
      <!-- <keep-alive> -->
      <router-view :key="$route.fullPath" />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref } from "vue";
import { useStore } from "vuex";


const axios = getCurrentInstance().proxy.axios;
const store = useStore();

const isHidden = ref(false);
const workspaceList = computed(() => store.getters['memoStore/getWorkspaceList']);

onMounted(() => {
  getWorkspaceList();
});

const getWorkspaceList = async () => {
  const user = store.getters.getUser;
  await axios.get(`/v1/api/memo/users/${user.id}/workspace`)
  .then(response => store.commit('memoStore/setWorkspaceList', response.data))
  .finally(() => {
    store.commit('setLoading', false);
  });
}

</script>

<style lang="scss" scoped>
.memo-wrap {
  height: 100%;
  padding: 0.25rem;
  display: flex;
  gap: 0.1rem;
  .side {
    width: 17.5rem;
    padding: 0.25rem;
    border: solid 1px #e8e8e8;
    border-radius: 3px;
    display: flex;
    flex-flow: column;
    .home {
      display: flex;
      flex-flow: column;
      padding: 0.25rem;
      border-radius: 3px;
      border: solid 1px #c8c8c8;
      margin-bottom: 0.25rem;
      .dashboard {}
    }
    .workspace-list {
      display: flex;
      flex-flow: column;
      border-radius: 3px;
      border: solid 1px #c8c8c8;
      padding: 0.25rem;
      gap: 0.1rem;
      .workspace {}
    }
    .toggle {
      flex: 1;
      display: flex;
      flex-flow: column;
      justify-content: flex-end;
    }
  }
  .content {
    flex: 1;
    padding: 0.25rem;
    border: solid 1px #e8e8e8;
    border-radius: 3px;
    // margin-left: 0.1rem;
    text-align: center;
  }
}

.toggle-open {
  position: absolute;
  bottom: 0;
  margin-bottom: 0.25rem;
  writing-mode: vertical-rl;
  background-color: #9e9e9e;
  color: #fff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 3rem;
  border: solid 1px #e8e8e8;
  width: 1.5rem;
}

.display-enter-active,
.display-leave-active {
  transition: opacity 0.2s ease; // 0.3초 동안 투명도 변화
}

.display-enter-from,
.display-leave-to {
  opacity: 0; // 등장하기 시작, 퇴장의 마지막은 투명도 0
}

</style>