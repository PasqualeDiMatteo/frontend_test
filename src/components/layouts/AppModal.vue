<script>
export default {
    name: "App Alert",
    props: {
        modalMessage: String,
        alertType: String,
    }
}
</script>

<template>
    <div class="modal fade show">
        <div class=" modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"> {{
                        modalMessage }}</h1>
                    <button type="button" class="btn-close" @click="$emit('closeModal')"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="$emit('closeModal')">Close</button>
                    <button type="button" class="btn btn-danger" @click="$emit('delete')">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.show {
    display: block;
}
</style>