<template>
  <div>
    project {{ projectId }}
    workspace {{ workspaceId }}
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projectId = ref();
const workspaceId = ref();
projectId.value = route.params.projectId;
workspaceId.value = route.params.workspaceId;

</script>

<style lang="scss" scoped>

</style>