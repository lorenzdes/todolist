<template>
  <div>
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">
      Number of completed TODOs: {{ countDone }}
    </v-card-title>
    <v-list lines="one">
      <v-list-item v-for="(item, index) in completedTasks" :key="index">
        Completed ToDo - {{ index + 1 }} - {{ item.ToDo }}
        <v-btn @click="undoneTask(index)">Undo Task</v-btn>
        <v-btn @click="deleteCompletedTask(index)">Delete Task</v-btn>
      </v-list-item>
    </v-list>
    <v-btn @click="emptyTrash">Clear Completed Tasks</v-btn>
    <v-snackbar v-model="isSnackbarOpen" multi-line>
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="isSnackbarOpen = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();

const {
  completedTasks,
  undoneTask,
  deleteCompletedTask,
  countDone,
  emptyTrash,
  isSnackbarOpen,
  snackbarMessage
} = todoStore;
</script>

<style scoped>
/* Add your styles here */
</style>
