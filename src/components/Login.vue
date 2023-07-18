<template>
  <div class="login-container">
    <section class="login-box">
      <p class="login-title">로그인</p>
      <div class="login-buttons">
        <button class="kakao">카카오 로그인</button>
        <button class="naver">Naver 로그인</button>
        <button @click="loginWithGoogle" class="google">Google 로그인</button>
      </div>
    </section>
  </div>
  <div id="my-signin2" style="display: none"></div>
</template>

<script setup>
const baseURL = import.meta.env.VITE_BASE_URL + '/auth/google-login';
// const baseURL = 'http://localhost:3000/login';

const loginWithGoogle = () => {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
    '676639504875-a0lpq23f7nvdnj3n4tojeh7mqc339jfg.apps.googleusercontent.com' +
    '&redirect_uri=' +
    baseURL +
    '&response_type=code' +
    '&scope=email profile';
  window.location = url;
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;

  .login-box {
    width: 25rem;
    height: 20rem;
    border: solid 1px #c8c8c8;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -12.5rem;
    margin-top: -10rem;
    border-radius: 8px;

    .login-title {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      margin: 2rem 0;
    }
    .login-buttons {
      display: flex;
      flex-flow: column;
      button {
        width: 22.5rem;
        height: 3rem;
        margin: 0.1rem auto;
        border-radius: 3px;
        font-weight: bold;

        &.kakao {
          background-color: #F7C600;
          border: solid 1px #F7C600;
        }
        &.google {
          border: solid 1px #e8e8e8;

        }
        &.naver {
          background-color: #1DC800;
          border: solid 1px #1DC800;
        }
      }
    }
  }
}

</style>