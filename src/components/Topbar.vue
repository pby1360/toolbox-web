<template>
  <section class="top-bar">
      <!-- <article class="logo">
        <router-link to="/">
          <img src="@/assets/logo.svg" />
        </router-link>
      </article> -->
      <article class="title">
        <router-link to="/">
          Toolbox
        </router-link>
      </article>
      <article class="buttons">
        <div v-if="!isLoggedin">
          <router-link  to="/login">
            <v-btn variant="outlined" class="login">Login</v-btn>
          </router-link>
        </div>
        <div v-else>
          <span>Hello! {{ user.name }}</span>
          <v-btn variant="outlined" class="logout" @click="logout">Logout</v-btn>
        </div>
      </article>
    </section>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const isLoggedin = computed(() => store.getters.isLogin);
const user = computed(() => store.getters.getUser);

const logout = () => {
  localStorage.removeItem('auth');
  store.commit('setLogin', !isLoggedin);
  store.commit('setUser', {});
  router.replace('/');
}


</script>

<style lang="scss" scoped>
.top-bar {
  height: 3.5rem;
  padding: 0.25rem;

  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);

  display: flex;

  .title {
    flex: 1;
    text-align: center;
    margin: auto 1rem;
    display: flex;
    justify-content: flex-start;

    a {
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;

      &:hover {
        color: #e8e8e8;
      }
    }
  }
  .buttons {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    
    div {
      margin: auto 0;

      button {
        margin: auto 0.5rem;
        cursor: pointer;
      }      
      
    }
  }
}
</style>