<script>
import axios from "axios";
import AppLoader from "../components/layouts/AppLoader.vue";
const url = "http://127.0.0.1:80/api/users/"
export default {
    name: "Home Page",
    components: { AppLoader },
    data: () => ({
        user: null,
        isLoading: false,
    }),
    methods: {
        getUser() {
            this.isLoading = true;
            axios.get(url + this.$route.params.id)
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    this.$router.push({ name: "not-found" })
                }).then(() => {
                    this.isLoading = false;
                });
        },
    },
    created() {
        this.getUser();
    },
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <div v-else class="card">
        <h4 class="card-header">
            {{ user.name + " " + user.surname }}
        </h4>
        <div class="card-body">
            <p class="card-title">{{ user.email }}</p>
            <RouterLink class="btn btn-secondary" :to="{ name: 'home' }">Go Back
            </RouterLink>
        </div>
    </div>
</template>

<style></style>