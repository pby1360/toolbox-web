<template>
  <section class="top-bar">
      <article class="logo">
        <router-link to="/">
          <img src="@/assets/logo.svg" />
        </router-link>
      </article>
      <article class="title">Toolbox</article>
      <article class="buttons">
        <router-link v-if="!isLoggedin" to="/login">
          <button class="login">Login</button>
        </router-link>
        <a v-else>
          <v-text-field>Hello! {{ user.name }}</v-text-field>
          <button  class="logout" @click="logout">Logout</button>
        </a>
      </article>
    </section>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isLoggedin = computed(() => store.getters.isLogin);
const user = computed(() => store.getters.getUser);

console.log(store);

const logout = () => {
  localStorage.removeItem('auth');
  store.commit('setLogin', !isLoggedin);
  store.commit('setUser', {});
  this.$router.go(0);
}


</script>

<style lang="scss" scoped>
.top-bar {
  height: 3.5rem;
  width: 100%;
  padding: 0.5rem;

  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);

  display: flex;

  .logo {
    flex: 1;
    margin: auto;
    img {
      height: 2rem;
    }
  }
  .title {
    flex: 1;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    text-align: center;
    margin: auto;
  }
  .buttons {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    
    a {
      margin: auto 0;
      
      button {
        margin: auto;
        height: 2.25rem;
        width: 5rem;
        border: solid #c8c8c8 1px;
        border-radius: 5px;
      }

      button.login {
          background-color: #4158D0;
          color: #fff;
      }
    }
  }
}
</style>