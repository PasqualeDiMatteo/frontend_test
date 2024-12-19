<script>
import axios from "axios";
import AppLoader from "../components/layouts/AppLoader.vue";
import AppAlert from "../components/layouts/AppAlert.vue";
import AppModal from "../components/layouts/AppModal.vue";


export default {
    name: "Home Page",
    components: { AppLoader, AppAlert, AppModal },
    data: () => ({
        modalOpen: false,
        modalMessage: "",
        alertOpen: false,
        alertMessage: "",
        alertType: "",
        idClicked: null,
        userClicked: null,
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
                    this.alertOpen = true;
                    this.alertType = "danger";
                    this.alertMessage = "Failed to fetch users";
                })
                .then(() => {
                    this.isLoading = false;
                });
        },
        modalToggle(id) {
            this.idClicked = id;
            this.users.data.filter((user) => {
                if (user.id === id) {
                    this.userClicked = user;
                    this.modalMessage = "Are you sure you want to delete " + user.name + "?"
                };
            })
            this.modalOpen = !this.modalOpen;
        },
        deleteUser() {
            this.isLoading = true;
            this.modalOpen = false;
            axios.delete(`http://127.0.0.1:80/api/users/${this.idClicked}`)
                .then(() => {
                    this.users.data = this.users.data.filter(user => user.id != this.idClicked);
                    this.fetchUsers();
                    this.alertOpen = true;
                    this.alertType = "success";
                    this.alertMessage = "User deleted successfully";

                })
                .catch(error => {
                    this.isLoading = false;
                    console.error(error);
                    this.alertOpen = true;
                    this.alertType = "danger";
                    this.alertMessage = "Failed to delete user";
                })
        }
    },
    created() {
        this.fetchUsers();
    },
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <div v-else>
        <AppAlert v-if="alertOpen" :alertMessage="alertMessage" :alertType="alertType"
            @closeAlert="alertOpen = !alertOpen" />
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
                        <button class="btn btn-danger ms-2" @click="modalToggle(user.id)">Elimina</button>
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
        <AppModal v-if="modalOpen" :modalMessage="modalMessage" @closeModal="modalOpen = !modalOpen"
            @delete="deleteUser()" />
    </div>
</template>

<style></style>