<template>
  <div class="home">
    <div class="grid-container">
      <h1>Zeo Interview</h1>
      <AgGrid />
    </div>
    <transition name="fade">
      <Modal v-show="this.$store.state.isChartModalActive" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Modal from "@/components/Modal.vue";
import AgGrid from "@/components/AgGrid.vue";

@Component({
  components: {
    AgGrid,
    Modal
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.grid-container {
  background: var(--white);
  padding: 20px;
  border-radius: var(--container-radius);
  box-shadow: var(--container-shadow);
}

h1 {
  color: var(--gray4);
  font-weight: 600;
  font-size: 24px;
}
</style>
