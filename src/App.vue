<template>
  <v-app>
    <Topbar />
    <v-main>
      <router-view />
    </v-main>
    <v-overlay
      :model-value="isLoading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import Topbar from '@/components/Topbar.vue';
export default {
  components: { Topbar },
  name: 'App',
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  created() {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const user = JSON.parse(auth);
      this.$store.commit('setLogin', true);
      this.$store.commit('setUser', user);
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
