<template>
    <div>
        <div class="absolute top-0 left-0 w-full h-full backdrop-blur-lg">
            <slot></slot>
        </div>
        <div class="-z-10 background-circle absolute -top-10 -left-10 bg-primary-green w-72 h-72"></div>
        <div class="-z-10 background-circle absolute top-64 -right-20 bg-primary-purple w-64 h-64"></div>
        <div class="-z-10 background-circle absolute bottom-36 -left-20 bg-primary-blue w-72 h-72"></div>
        <div class="-z-10 background-circle absolute -bottom-16 -right-20 bg-primary-red w-72 h-72"></div>
    </div>
</template>
<style lang="css" scoped>
.background-circle {
    clip-path: circle(50% at 50% 50%);
}
</style>