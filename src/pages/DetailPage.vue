<script>
import axios from "axios";
const url = "http://127.0.0.1:80/api/users/"
export default {
    name: "Home Page",
    data: () => ({
        user: null,
    }),
    methods: {
        getUser() {
            axios.get(url + this.$route.params.id)
                .then(response => {
                    this.user = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    created() {
        this.getUser();
    },
}
</script>

<template>

    <div class="card">
        <h4 class="card-header">
            {{ user.name + " " + user.surname }}
        </h4>
        <div class="card-body">
            <p class="card-title">{{ user.email }}</p>
            <RouterLink class="btn btn-secondary" :to="{ name: 'home' }">Indietro
            </RouterLink>
        </div>
    </div>
</template>

<style></style>