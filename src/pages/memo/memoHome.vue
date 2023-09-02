<template>
  <div class="memo-wrap">
    <transition name="display">
      <div v-show="!isHidden" class="side">
        <div class="side-items">
          <section class="buttons">
            <v-dialog
              v-model="dialog"
              persistent
              width="600"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  color="black"
                  variant="tonal"
                  v-bind="props"
                  prepend-icon="mdi-plus"
                >
                New proejct
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Create project</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Name*"
                          required
                          v-model="formData.name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Description"
                          v-model="formData.description"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </section>
          <section class="project-list">
            <v-btn to="/memo" variant="text" color="primary" class="dashboard rounded-0 mb-1">Dashboard</v-btn>
            <div class="project" v-for="project in projectList" :key="project.id">
              <v-btn class="a-project rounded-0" :class="{ active: selected == project.id }" variant="text" color="info" :to="`/memo/project/${project.id}`">{{ project.name }}</v-btn>
              <v-btn class="a-workspace rounded-0" v-show="selected==project.id" v-for="workspace in project.workspaceList" :key="workspace.id" variant="text" color="success" :to="`/memo/project/${project.id}/workspace/${workspace.id}`">{{ workspace.name }}</v-btn>
            </div>
          </section>
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
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";


const axios = getCurrentInstance().proxy.axios;
const store = useStore();

const isHidden = ref(false);
const projectList = computed(() => store.getters['memoStore/getProjectList']);

const selected = ref(null);

const dialog = ref(false);
const formData = ref({});

const route = useRoute();
watch(
  route, (value) => {
    selected.value = value.params.projectId;
  },
  { immediate: true }
);

onMounted(() => {
  getprojectList();
});




const save = async () => {
  store.commit('setLoading', true);
  const user = store.getters.getUser;
  formData.value.userId = user.id;
  await axios.post(`/v1/api/memo/users/${user.id}/project`, formData.value)
  .then(response => {
    store.getters['memoStore/getProjectList'].push(response.data);
    formData.value = {};
  })
  .finally(() => {
    store.commit('setLoading', false);
    dialog.value = false;
  });
}

const getprojectList = async () => {
  store.commit('setLoading', true);
  const user = store.getters.getUser;
  await axios.get(`/v1/api/memo/users/${user.id}/project`)
  .then(response => store.commit('memoStore/setProjectList', response.data))
  .finally(() => {
    store.commit('setLoading', false);
  });
}

</script>

<style lang="scss" scoped>
.memo-wrap {
  height: 100%;
  display: flex;
  .side {
    width: 17.5rem;
    border-right: solid 1px #c8c8c8;
    display: flex;
    flex-flow: column;
    .side-items {
      display: flex;
      flex-flow: column;
      .buttons {
        display: flex;
        flex-flow: column;
        padding: 1rem 0.5rem;
      }
      .project-list {
        display: flex;
        flex-flow: column;
        .project {
          display: flex;
          flex-flow: column;

          .a-project.active {
            background-color: black;

          }
          .a-workspace {
              background-color: black;
          }
        }
      }
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