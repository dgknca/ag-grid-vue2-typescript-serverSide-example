<template>
  <div>
    <nav class="nav">
      <div class="nav-wrp">
        <div class="dark-mode-btn" @click="toggleDarkMode" :class="{ active: isActive }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {
  isActive = false;

  private toggleDarkMode(e: any): void {
    this.isActive = !this.isActive;

    const docEl = document.documentElement;
    docEl.getAttribute("dark") == "true"
      ? docEl.setAttribute("dark", "false")
      : docEl.setAttribute("dark", "true");
  }
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;

  &-wrp {
    height: 100%;
    max-width: 1400px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.dark-mode-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;

  &.active {
    color: #e0e0e0;
  }
}
</style>