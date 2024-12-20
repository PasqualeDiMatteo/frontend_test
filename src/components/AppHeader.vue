<script>
export default {
    name: "App Header",
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" :to="{ name: 'home' }">Front-Test
            </RouterLink>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <RouterLink class="nav-link" :to="{ name: 'home' }">Home
                    </RouterLink>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style></style>