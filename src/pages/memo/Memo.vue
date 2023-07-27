<template>
  <div class="memo-box">
    <div class="memo-title"><v-text-field class="pa-0" variant="plain" hide-details="true" density="compact" v-model="props.memo.title"></v-text-field></div>
    <div class="memo-content"><v-textarea variant="outlined" v-model="props.memo.content" /></div>
    <div>
      <v-btn @click="saveMemo">저장</v-btn>
      <v-btn @click="deleteMemo">삭제</v-btn>
    </div>
    <div class="memo-bottom">modified at {{ props.memo.modifiedAt }}</div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";


const props = defineProps({
  memo: Object,
})

const emit = defineEmits([
  'refresh'
])

const axios = getCurrentInstance().proxy.axios;

const saveMemo = () => axios.post('/v1/api/memo', props.memo).then(emit('refresh'));
const deleteMemo = () => axios.delete(`/v1/api/memo/${props.id}`).then(emit('refresh'));

</script>

<style lang="scss" scoped>
.memo-box {
  width: 15rem;
  border: solid 1px black;
  border-radius: 5px;

  .memo-title {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    padding: 0 0.5rem;
    border-bottom: solid 1px #c8c8c8;
    background-color: #81AFE1;
  }
  .memo-content {
    min-height: 10rem;
    padding: 0.5rem;
    background-color: #D8F3FF;
    font-size: 0.9rem;
  }
  .memo-bottom {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    padding: 0.5rem;
    font-size: 0.75rem;
    text-align: end;
    color: #a8a8a8;
    background-color: #D8F3FF;
  }
}
</style>