<template>
  <div id="app">
    <!-- Kiểm tra nếu không phải là trang admin thì mới hiển thị Header và Footer -->
    <AppHeader v-if="!isAdminPage" />
    <router-view />
    <AppFooter v-if="!isAdminPage" />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    // Kiểm tra nếu route hiện tại là một trang admin
    isAdminPage() {
      // Kiểm tra xem nếu đường dẫn có chứa "/admin"
      return this.$route.path.startsWith('/admin');
    }
  }
};
</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
}
</style>
