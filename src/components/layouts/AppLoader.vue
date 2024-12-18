<script>
export default {
    name: "App Loader",
}
</script>

<template>
    <div class=" spinner d-flex align-items-center flex-column justify-content-center">
        <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>


</template>

<style scoped>
.spinner {
    height: 80vh;
}
</style>