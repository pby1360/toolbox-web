<template>
  <section class="top-bar">
    <v-navigation-drawer v-model="drawer" temporary>
        <v-list-item :prepend-avatar="user.image" :title="user.name"></v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item v-for="menu in menuList" :key="menu.name" :prepend-icon="menu.meta.menuIcon" :title="menu.meta.label" :value="menu.name" @click="router.push(menu.path)"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    <article class="menu"><v-icon v-if="isLoggedin" @click="drawer = true" icon="mdi-menu" size="x-large"></v-icon></article>  
    <article class="title">
      <router-link to="/">
        Toolbox
      </router-link>
    </article>
    <article class="buttons">
      <div v-if="!isLoggedin">
        <router-link  to="/login">
          <v-btn color="black" variant="outlined" class="login">Login</v-btn>
        </router-link>
      </div>
      <div v-else>
        <!-- <v-avatar>
          <v-img v-if="profileImageUrl" :src="profileImageUrl"></v-img>
          <v-icon v-else size="x-large" icon="mdi-account-circle"></v-icon>
        </v-avatar> -->
        <v-btn color="black" variant="tonal" class="logout" @click="logout">Logout</v-btn>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";


const router = useRouter();
const menuList = router.getRoutes().filter(route => route.meta.isMenu);
const store = useStore();

const isLoggedin = computed(() => store.getters.isLogin);
const user = computed(() => store.getters.getUser);

const drawer = ref(true);

const logout = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('profile_image');
  store.commit('setLogin', !isLoggedin);
  store.commit('setUser', {});
  router.replace('/');
}


</script>

<style lang="scss" scoped>
.top-bar {
  height: 3rem;
  padding: 0.25rem;
  margin: 0.1rem 0 0 0rem;
  border-bottom: solid 1px #c8c8c8;
  background-color: #fff;

  // background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);

  display: flex;

  .menu {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-flow: column;    
    i {
      margin-left: 5%;
    }
  }

  .title {
    flex: 2;
    text-align: center;
    margin: auto 1rem;
    display: flex;
    justify-content: center;

    a {
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
      color: #000;

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