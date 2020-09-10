<template>
  <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    color="#9999CC"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 18C0 16.8954 0.895431 16 2 16H4V20H0V18Z" />
    <path d="M5 14C5 12.8954 5.89543 12 7 12H9V20H5V14Z" />
    <path d="M10 10C10 8.89543 10.8954 8 12 8H14V20H10V10Z" />
    <path d="M15 6C15 4.89543 15.8954 4 17 4H19V20H15V6Z" />
    <path d="M20 2C20 0.895431 20.8954 0 22 0H24V20H20V2Z" />
  </svg>
</template>


<style lang="scss" scoped>
.vol1 {
  svg path:nth-child(2),
  svg path:nth-child(3),
  svg path:nth-child(4),
  svg path:nth-child(5) {
    opacity: 0.1;
  }
}

.vol2 {
  svg path:nth-child(3),
  svg path:nth-child(4),
  svg path:nth-child(5) {
    opacity: 0.1;
  }
}

.vol3 {
  svg path:nth-child(4),
  svg path:nth-child(5) {
    opacity: 0.1;
  }
}

.vol4 {
  svg path:nth-child(5) {
    opacity: 0.1;
  }
}
</style>