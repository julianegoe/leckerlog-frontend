<script lang="ts" setup>
</script>
<template>
    <div class="fixed left-0 top-0 w-full h-full backdrop-blur-md">
      <div class="flex flex-col justify-between absolute m-auto top-0 left-0 right-0 bottom-0 w-5/6 h-1/6 bg-white p-4 border-black border-2 shadow-brutal">
        <slot></slot>
      </div>
    </div>
</template>
