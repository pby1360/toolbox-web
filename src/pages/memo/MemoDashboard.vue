<template>
  <div>
    <p>Dashboard</p>
    <v-dialog
      v-model="dialog"
      persistent
      width="600"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
        Workspace +
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Create Workspace</span>
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
    <div class="workspace-list">
      <p>목록</p>
      <div class="workspace" v-for="workspace in workspaceList" :key="workspace.id">
        <span>{{ workspace.name }}</span>
        <span>{{ workspace.description }}</span>
        <span>{{ workspace.createdAt }}</span>
        <!-- <span>{{ workspace.modifiedAt }}</span> -->
        <v-btn variant="outlined" color="info" @click="modify(workspace.id)" style="margin-right: 0.1rem;">수정</v-btn>
        <v-btn variant="outlined" color="red" @click="remove(workspace.id)">삭제</v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, ref } from "vue";
import { useStore } from "vuex";

const axios = getCurrentInstance().proxy.axios;
const store = useStore();

const workspaceList = computed(() => store.getters['memoStore/getWorkspaceList']);

const dialog = ref(false);
const formData = ref({});

// onMounted(() => {});

const save = async () => {
  store.commit('setLoading', true);
  const user = store.getters.getUser;
  formData.value.userId = user.id;
  await axios.post(`/v1/api/memo/users/${user.id}/workspace`, formData.value)
  .then(response => {
    store.getters['memoStore/getWorkspaceList'].push(response.data);
    formData.value = {};
  })
  .finally(() => {
    store.commit('setLoading', false);
    dialog.value = false;
  });
}

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
.workspace-list {
  margin: 2rem;
  display: flex;
  flex-flow: column;
  justify-content: center;
  
  .workspace {
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