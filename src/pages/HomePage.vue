<script>
import axios from "axios";
import AppLoader from "../components/layouts/AppLoader.vue";

export default {
    name: "Home Page",
    components: { AppLoader },
    data: () => ({
        isLoading: false,
        users: {
            data: [],
            links: [],
        },
    }),
    methods: {
        fetchUsers(endpoint = "http://127.0.0.1:80/api/users/") {
            this.isLoading = true;
            axios.get(endpoint)
                .then(response => {
                    this.users.data = response.data.data;
                    this.users.links = response.data.links
                })
                .catch(error => {
                    console.error(error);
                })
                .then(() => {
                    this.isLoading = false;
                });
        },
    },
    created() {
        this.fetchUsers();
    },
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <div v-else>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">email</th>
                    <th scope="col"></th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users.data" :key="user.id">
                    <th scope="row">{{ user.id }}</th>
                    <td>{{ user.name }}</td>
                    <td>{{ user.surname }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <RouterLink class="btn btn-primary" :to="{ name: 'detail', params: { id: user.id } }">Vedi
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" v-for="link in users.links" :key="link.label">
                    <span v-if="!link.url" class="page-link disabled" v-html="link.label"></span>
                    <button v-else class="page-link" :class="{ active: link.active }" @click="fetchUsers(link.url)"
                        v-html="link.label"></button>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style></style>