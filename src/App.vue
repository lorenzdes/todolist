<!-- eslint-disable no-unused-vars -->
<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>TODO App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/completed" text>Completed Tasks</v-btn>
      <v-btn to="/deleted" text>Deleted Tasks</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
  <v-snackbar v-model="showSnackbar" :timeout="snackbarTimeout">
    {{ snackbarMessage }}
    <template v-slot:action>
      <v-btn color="blue" text @click="showSnackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

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
</script>