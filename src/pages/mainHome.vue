<template>
  <div class="container">
    <ul class="menu">
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