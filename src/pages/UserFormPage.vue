<script>
import axios from "axios";
import AppLoader from "../components/layouts/AppLoader.vue";
import AppAlert from "../components/layouts/AppAlert.vue";
const url = "http://127.0.0.1:80/api/users/"
export default {
    name: "User Form Page",
    components: { AppLoader, AppAlert },
    data: () => ({
        user: {},
        isLoading: false,
        errors: {},
        alertMessage: "",
        alertType: "",
        alertOpen: false,
        form: { name: '', surname: '', email: '' }
    }),
    computed: {
        hasErrors() {
            return Object.keys(this.errors).length;;
        }
    },
    methods: {
        sendForm() {
            this.alertOpen = false;
            this.alertMessage = "";
            this.validateForm();
            if (this.hasErrors) return;
            this.isLoading = true;
            let axiosCall = null
            if (!this.$route.params.id) {
                axiosCall = axios.post(url, this.form)

            } else {
                axiosCall = axios.put(url + this.user.id, this.form)
            }
            axiosCall.then(() => {
                this.alertOpen = true;
                if (!this.$route.params.id) {
                    this.form = { name: '', surname: '', email: '' };
                    this.alertMessage = "User created successfully"
                    this.alertType = "success";
                } else {
                    this.alertMessage = "User updated successfully"
                    this.alertType = "success";
                }
            })
                .catch(error => {
                    if (error.response.status == 400) {
                        const errors = error.response.data;
                        const errorMessages = {};
                        for (let field in errors) {
                            errorMessages[field] = errors[field][0];
                            this.errors[field] = errorMessages[field];
                        }
                    }
                }).then(() => {
                    this.isLoading = false;
                });
        },
        validateForm() {
            this.errors = {};
            if (!this.form.email) {
                this.errors.email = "Email is required";
            } else if (!this.form.email.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                this.errors.email = "Invalid email format";
            }

            if (!this.form.name) {
                this.errors.name = "Name is required";
            }

            if (!this.form.surname) {
                this.errors.surname = "Surname is required";
            }
        },
        getUser() {
            this.isLoading = true;
            axios.get(url + this.$route.params.id)
                .then(response => {
                    this.user = response.data;
                    this.form.name = this.user.name;
                    this.form.email = this.user.email;
                    this.form.surname = this.user.surname;
                })
                .catch(error => {
                    this.$router.push({ name: "not-found" })
                }).then(() => {
                    this.isLoading = false;
                });
        },
    },
    mounted() {
        if (this.$route.params.id) {
            this.getUser();
        }
    },
}
</script>

<template>
    <AppLoader v-if="isLoading" />
    <div v-else>
        <h2 v-if=!$route.params.id>New User</h2>
        <h2 v-else>Update User</h2>
        <div class="d-flex justify-content-end my-2">
            <button class="btn  btn-secondary me-2" @click="$router.push({ name: 'home' })">Go Back</button>
        </div>
        <AppAlert v-if="alertOpen" :alertType="alertType" :alertMessage="alertMessage"
            @closeAlert="alertOpen = !alertOpen" />
        <form @submit.prevent="sendForm()" novalidate>
            <div class="mb-3">
                <label for="name" class="form-label">Name<sup class="text-danger">*</sup></label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.name }" id="name"
                    v-model.trim="form.name">
                <div class="invalid-feedback">
                    {{ errors.name }}
                </div>
            </div>
            <div class="mb-3">
                <label for="surname" class="form-label">Surname<sup class="text-danger">*</sup></label>
                <input type="text" class="form-control" :class="{ 'is-invalid': errors.surname }" id="surname"
                    v-model.trim="form.surname">
                <div class="invalid-feedback">
                    {{ errors.surname }}
                </div>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email<sup class="text-danger">*</sup></label>
                <input type="email" class="form-control" :class="{ 'is-invalid': errors.email }" id="email"
                    aria-describedby="emailHelp" v-model.trim="form.email">
                <div class="invalid-feedback">
                    {{ errors.email }}
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>

    </div>
</template>

<style></style>