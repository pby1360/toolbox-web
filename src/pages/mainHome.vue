<template>
  <div class="container">
    <ul v-if="isLoggedin" class="menu">
      <li>
        <router-link  to="/memo">memo</router-link>
      </li>
      <li>
        <router-link to="/calendar">calendar</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isLoggedin = computed(() => store.getters.isLogin);

</script>

<style lang="scss" scoped>
.container {
  // width: 100%;
  // height: 100%;
  .menu {
    width: fit-content;
    margin: 2rem auto;
    li {
      width: fit-content;
    }
  }
}
</style>