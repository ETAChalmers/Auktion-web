<template>
  <div :class="($route.name != 'Camera') ? ['container'] : []">
    <router-view />
  </div>
</template>

<script>
export default {
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = "Auktion | " + to.name;
            },
        },
    },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
