<template>
  <main class="background absolute top-0 left-0 w-full min-h-max">
    <slot></slot>
  </main>
</template>
<style lang="css" scoped>
.background {
  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, lightgrey 1px, transparent 1px),
    linear-gradient(to bottom, lightgrey 1px, transparent 1px);
}
</style>