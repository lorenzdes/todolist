// snackbarStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSnackbarStore = defineStore('snackbar', () => {
  const isSnackbarOpen = ref(false);
  const snackbarMessage = ref('');

  const showSnackbar = (message) => {
    snackbarMessage.value = message;
    isSnackbarOpen.value = true;
  };

  const closeSnackbar = () => {
    isSnackbarOpen.value = false;
  };

  return {
    isSnackbarOpen,
    snackbarMessage,
    showSnackbar,
    closeSnackbar
  };
});
