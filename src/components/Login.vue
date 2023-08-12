<template>
  <div class="login-container">
    <section class="login-box">
      <p class="login-title">로그인</p>
      <div class="login-buttons">
        <button @click="loginWithKakao" class="kakao"></button>
        <button @click="loginWithNaver" class="naver"></button>
        <button @click="googleLogin" class="google"></button>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();

const baseURL = import.meta.env.VITE_BASE_URL;
const clientURL = import.meta.env.VITE_CLIENT_URL;
const redirectURI = `${clientURL}/login`;

const GOOGLE_CLIENT_ID = '676639504875-a0lpq23f7nvdnj3n4tojeh7mqc339jfg.apps.googleusercontent.com';

onMounted(() => {
  if (route.query.code) {
    loginWithGoogle(route.query.code);
  }
});

const googleLogin = () => {
  const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=' +
    GOOGLE_CLIENT_ID +
    '&redirect_uri=' +
    redirectURI +
    '&response_type=code' +
    '&scope=email profile';
  window.location = url;
}

const loginWithGoogle = async (code)  => {
  store.commit('setLoading', true);
  await axios.get(`${baseURL}/auth/google-login?code=${code}`)
  .then(response => {
    const jsonStr = JSON.stringify(response.data);
    localStorage.setItem('auth', jsonStr);
    localStorage.setItem('profile_image', response.data.image);
    store.commit('setUser', response.data);
    store.commit('setLogin', true);
    router.push('/');
  }).catch(error => {
    console.log(error);
  })
  .finally(() => store.commit('setLoading', false));
}

const loginWithKakao = () => {
  alert('서비스 준비중 입니다');
}
const loginWithNaver = () => {
  alert('서비스 준비중 입니다');
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;

  .login-box {
    width: 20rem;
    // height: 20rem;
    // min-height: 15rem;
    border: solid 1px #c8c8c8;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -10rem;
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
      padding-bottom: 2rem;
      button {
        margin: 0.1rem auto;
        border-radius: 3px;
        font-weight: bold;

        &:hover {
          border: solid 2px skyblue;
        }

        &.kakao {
          width: 16.5rem;
          height: 3.75rem;
          background-position: center;
          background-size: contain;
          background-color: #FEE500;
          background-image: url(@/assets/kakao_login_large_narrow.png);
        }
        &.google {
          width: 17rem;
          height: 4rem;
          background-size: cover;
          background-image: url(@/assets/btn_google_signin_light_normal_web@2x.png);
        }
        &.naver {
          width: 16.5rem;
          height: 3.75rem;
          background-position: center;
          background-size: contain;
          background-color: #03C75A;
          background-image: url(@/assets/btnG_완성형.png);
        }
      }
    }
  }
}

</style>