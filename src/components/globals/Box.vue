<script lang="ts" setup></script>
<template>
    <div class="bg-white border border-black shadow-brutal rounded-md">
        <div class="bg-black w-full">
            <slot name="header"></slot>
        </div>
        <div class="p-4">
            <slot></slot>
        </div>
    </div>
</template>