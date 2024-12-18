<script>
import AppHeader from "./components/AppHeader.vue";
import HomePage from './pages/Homepage.vue';


export default {
  components: { AppHeader, HomePage },
};
</script>

<template>
  <AppHeader />
  <main class="container my-3">
    <HomePage />
  </main>
</template>

<style></style>