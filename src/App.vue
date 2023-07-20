<template>
  <v-app>
    <Topbar :is-loggedin="isLoggedin"></Topbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Topbar from './components/Topbar.vue';
export default {
  components: { Topbar },
  name: 'App',
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
