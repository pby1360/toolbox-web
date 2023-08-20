<template>
  <div class="memo-wrap">
    <transition name="display">
      <div v-show="!isHidden" class="side">
        <button v-show="!isHidden" class="toggle-close" @click="isHidden = !isHidden">close</button>
        <div class="home">
          <p>Home</p>
          <v-btn variant="flat" color="info" class="dashboard">Dashboard</v-btn>
        </div>
        <div class="workspace-list">
          <p>Workspace</p>
          <v-btn v-for="workspace in workspaceList" :key="workspace.id" variant="tonal" color="info" class="workspace">{{ workspace.name }}</v-btn>
        </div>
      </div>
    </transition>
    <div class="content">
      <memo-dashboard :list="workspaceList" />
    </div>
    <button v-show="isHidden" class="toggle-open" @click="isHidden = !isHidden">open</button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from "vue";
import { useStore } from "vuex";
import MemoDashboard from "./MemoDashboard.vue";

const axios = getCurrentInstance().proxy.axios;
const store = useStore();

const isHidden = ref(false);
const workspaceList = ref([]);

onMounted(() => {
  getWorkspaceList();
});

const getWorkspaceList = async () => {
  const user = store.getters.getUser;
  await axios.get(`/v1/api/memo/users/${user.id}/workspace`)
  .then(response => workspaceList.value = response.data)
  .finally(() => {
    store.commit('setLoading', false);
  });
}

// const onSave = (workspace) => workspaceList.value.push(workspace);



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
    // box-shadow: #c9c9c9 1px 1px 1px 1px;
    
    .home {
      display: flex;
      flex-flow: column;
      padding: 0.25rem;
      border-radius: 3px;
      border: solid 1px #c8c8c8;
      margin-bottom: 0.25rem;

      .dashboard {
        
      }
      
    }

    .workspace-list {
      display: flex;
      flex-flow: column;
      border-radius: 3px;
      border: solid 1px #c8c8c8;
      padding: 0.25rem;
      gap: 0.1rem;
      .workspace {
        
        .selected {
          border: solid 1px black;
        }
      }

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
  writing-mode: vertical-rl;
  background-color: #fff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 3rem;
  border: solid 1px #e8e8e8;
  width: 1.5rem;
}

.toggle-close {
  position: absolute;
  writing-mode: vertical-rl;
  top: 3.35rem;
  left: 17.65rem;
  background-color: #fff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 3rem;
  border: solid 1px #e8e8e8;
  border-left: none;
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