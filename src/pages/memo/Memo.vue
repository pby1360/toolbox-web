<template>
  <div class="memo-box">
    <div class="memo-title">
      <v-text-field class="" variant="plain" hide-details="true" density="compact" v-model="props.memo.title" />
      <v-icon
        class="icon-button-control"
        @click="saveMemo"
        icon="mdi-check-circle"
      />
      <v-icon
        v-if="memo.id"
        class="icon-button-control"
        @click="deleteMemo"
        icon="mdi-delete"
      />
      <v-icon
        v-else
        @click="remove"
        class="icon-button-control"
        icon="mdi-close-circle"
      />
    </div>
    <div class="memo-content"><v-textarea hide-details="true" variant="outlined" v-model="props.memo.content" /></div>
    <div class="memo-bottom">
      <span>created at {{ props.memo.createdAt }}</span>
      <span>modified at {{ props.memo.modifiedAt }}</span>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";


const props = defineProps({
  memo: Object,
})

const emit = defineEmits([
  'onComplete', 'remove'
])

const axios = getCurrentInstance().proxy.axios;

const saveMemo = async () => await axios.post('/v1/api/memo', props.memo).then(emit('onComplete'));
const deleteMemo = async () => await axios.delete(`/v1/api/memo/${props.memo.id}`).then(emit('onComplete'));
const remove = () => emit('remove', props.memo.uuid);
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
    display: flex;

    .icon-button-control {
      margin: auto;
    }
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
    // text-align: end;
    color: #a8a8a8;
    background-color: #D8F3FF;
    display: flex;
    flex-flow: column;
    // justify-content: flex-end;
  }
}
</style>