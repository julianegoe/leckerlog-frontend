<template>
    <div>
        <div class="absolute top-0 left-0 w-full h-full backdrop-blur-lg">
            <slot></slot>
        </div>
        <div class="-z-10 background-circle absolute top-10 left-10 bg-primary-green w-56 h-56"></div>
        <div class="-z-10 background-circle absolute top-52 left-32 bg-primary-purple w-48 h-48"></div>
    </div>
</template>
<style lang="css" scoped>
.background-circle {
    clip-path: circle(50% at 50% 50%);
}
</style>