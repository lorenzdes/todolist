<template>
  <v-app :theme="theme">
    <v-app-bar app>
      <v-toolbar-title>TODO App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/completed" text>Completed Tasks</v-btn>
      <v-btn to="/deleted" text>Deleted Tasks</v-btn>
      <v-btn icon @click="toggleDarkMode">
        <v-icon>{{ isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer class="d-flex flex-column">
    <div class="bg-teal d-flex w-100 align-center px-4">
      <strong>Get connected with us on social networks!</strong>

      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        size="small"
        variant="plain"
      ></v-btn>
    </div>

    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>
    <v-snackbar v-model="showSnackbar" :timeout="snackbarTimeout">
      {{ snackbarMessage }}
      <template v-slot:action>
        <v-btn color="blue" text @click="showSnackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRoute } from 'vue-router';

// Route handling for snackbar
const route = useRoute();
const showSnackbar = ref(false);
const snackbarMessage = ref('');
const snackbarTimeout = ref(2000); // 2 seconds

// eslint-disable-next-line no-unused-vars
let previousPageName = '';

watch(
  () => route.name,
  (newValue, oldValue) => {
    if (oldValue !== newValue) {
      showSnackbar.value = true;
      snackbarMessage.value = `You are leaving the ${oldValue} page!`;
      previousPageName = oldValue;
    }
  }
);

// Dark mode handling
const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
};

const theme = computed(() => (isDarkMode.value ? 'dark' : 'light'));

</script>

<style scoped>
/* Custom styles for the search bar */
.search-bar {
  background-color: var(--v-theme-background);
  color: var(--v-theme-on-background);
  padding: 10px;
  border-radius: 5px;
}

.dark-mode .search-bar {
  background-color: #333;
  color: #fff;
}

.light-mode .search-bar {
  background-color: #fff;
  color: #000;
}
</style>
