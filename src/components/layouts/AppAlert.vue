<script>
export default {
    name: "App Alert",
    props: {
        alertMessage: String,
        alertType: String,
    }
}
</script>

<template>
    <div class="alert  alert-dismissible fade show" :class="'alert-' + alertType" role="alert">
        <strong>{{ alertMessage }}</strong>
        <button type="button" class="btn-close" @click="$emit('closeAlert')"></button>
    </div>
</template>

<style scoped>
.show {
    display: block;
}
</style>