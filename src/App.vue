<template>
  <v-app>
    <section class="top-bar">
      <article class="logo">
        <router-link to="/">
          <img src="@/assets/logo.svg" />
        </router-link>
      </article>
      <article class="title">Toolbox</article>
      <article class="buttons">
        <router-link to="/login">
          <button class="login">Login</button>
        </router-link>
      </article>
    </section>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
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
      button.join {
          background-color: #8823db;
          color: #fff;
      }
    }
  }
}
</style>
