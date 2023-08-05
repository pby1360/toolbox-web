<template>
  <div class="container">
    <section class="toolbox-items" v-if="isLoggedin">
      <template v-for="item in navItems" :key="item.name">
        <article class="toolbox-item" :class="item.disabled? 'disabled' : ''"  @click="item.disabled ? null: $router.push(item.to)">
          <span class="toolbox-name">{{item.name}}</span>
        </article>
      </template>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const navItems = [
  {
    name: "memo",
    to: "/memo",
    disabled: false,
  },
  {
    name: "calendar",
    to: "/calendar",
    disabled: false,
  },
  {
    name: "tool3",
    to: "/",
    disabled: true,
  },
  {
    name: "tool4",
    to: "/",
    disabled: true,
  },
];
const store = useStore();
const isLoggedin = computed(() => store.getters.isLogin);

</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  .toolbox-items {
    margin: auto;
    display: flex;
    flex-flow: column;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;

    .toolbox-item {

      width: 10rem;
      height: 5rem;
      border: solid 1px #ddd;
      border-radius: 5px;
      margin-bottom: 0.25rem;
      box-shadow: 1px -1px 3px 1px #c8c8c8;
      text-align: center;
      display: flex;
      flex-flow: column;
      cursor: pointer;

      &:hover {
        border: solid 1px black;
      }

      &.disabled {
        background-color: #e8e8e8;
        cursor: no-drop;

        &:hover {
          border: solid 1px #ddd;
        }
      }

      .toolbox-name {
        margin: auto;
        font-size: 1.2rem;
      }
    }
  }
}
</style>