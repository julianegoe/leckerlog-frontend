<script lang="ts" setup>
import Box from '../globals/Box.vue';

</script>
<template>
    <div class="fixed left-0 top-0 w-full h-full backdrop-blur-md">
      <Box class="absolute m-auto top-0 left-0 right-0 bottom-0 w-5/6 h-1/6">
        <template #header>
          <span class="text-white text-xs pl-2">Löschen?</span>
        </template>
        <slot></slot>
      </Box>
    </div>
</template>
