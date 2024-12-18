<script>
export default {
    name: "Not Found",
}
</script>

<template>
    <div class=" not-found d-flex align-items-center flex-column justify-content-center">
        <h3> 404 | Page not found</h3>
        <button class="btn btn-secondary" @click="$router.push({ name: 'home' })">Torna indietro</button>
    </div>
</template>

<style scoped>
.not-found {
    height: 80vh;
}
</style>