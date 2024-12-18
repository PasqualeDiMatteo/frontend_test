<script>
import axios from "axios";
import AppLoader from "../components/layouts/AppLoader.vue";

export default {
    name: "Home Page",
    components: { AppLoader },
    data: () => ({
        isOpen: false,
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
                    console.error(error);
                })
                .then(() => {
                    this.isLoading = false;
                });
        },
        modalToggle(id) {
            this.isOpen = !this.isOpen;
            this.idClicked = id;
            this.users.data.filter((user) => {
                if (user.id === id) {
                    this.userClicked = user;
                };
            })
        },
        deleteUser() {
            this.isLoading = true;
            this.isOpen = false;
            axios.delete(`http://127.0.0.1:80/api/users/${this.idClicked}`)
                .then(() => {
                    this.users.data = this.users.data.filter(user => user.id != this.idClicked);
                    this.fetchUsers();
                })
                .catch(error => {
                    console.error(error);
                })
                .then(() => {
                    this.isLoading = false;
                });
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
        <div v-if="isOpen" class="modal fade show">
            <div class=" modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Sicuro di voler cancellare {{
                            userClicked.name }}</h1>
                        <button type="button" class="btn-close" @click="isOpen = !isOpen"></button>
                    </div>
                    <div class="modal-body">
                        L'azione non è revertibile
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="isOpen = !isOpen">Close</button>
                        <button type="button" class="btn btn-danger" @click="deleteUser()">Elimina</button>
                    </div>
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