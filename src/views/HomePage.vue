<template>
  <div>
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">
      Number of undone TODOs: {{ countUndone }}
    </v-card-title>
    <v-list lines="one">
      <v-list-item v-for="(item, index) in ToDOs" :key="index">
        ToDo - {{ index + 1 }} - {{ item.ToDo }}
        <v-btn @click="doneTask(index)">Done Task</v-btn>
        <v-btn @click="deleteToDo(index)">Delete Task</v-btn>
      </v-list-item>
    </v-list>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="newToDo"
          placeholder="New ToDo"
          hide-details="auto"
          label="New ToDo"
          class="extraWidth"
        />
      </v-col>
    </v-row>
    <v-btn @click="handleAddToDo">Add ToDo</v-btn>
    <v-snackbar v-model="isSnackbarOpen" multi-line>
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="isSnackbarOpen = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTodoStore } from '../stores/store.js';

const todoStore = useTodoStore();
const newToDo = ref('');

const { ToDOs, addToDo, deleteToDo, doneTask, countUndone, isSnackbarOpen, snackbarMessage } = todoStore;

const handleAddToDo = () => {
  if (newToDo.value.trim() !== '') {
    addToDo(newToDo.value);
    newToDo.value = '';
  } else {
    isSnackbarOpen.value = true;
    snackbarMessage.value = 'Task cannot be empty';
  }
};
</script>

<style scoped>
.extraWidth {
  width: 400px;
  margin: 40px 0 0;
}
</style>
