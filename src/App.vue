<template>
  <div id="app">
    <Nav />
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/app";
</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Nav from "@/components/Nav.vue";

@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {}
</script>