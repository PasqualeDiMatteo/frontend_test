<script>
import AppHeader from "./components/AppHeader.vue";
import HomePage from './pages/Homepage.vue';
import AppLoader from './components/layouts/AppLoader.vue';


export default {
  components: { AppHeader, HomePage, AppLoader },
};
</script>

<template>
  <AppHeader />
  <main class="container my-3">
    <HomePage />
  </main>
</template>

<style></style>