<template>
  <div>
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">
      Number of done TODO is: {{ countDone }}
    </v-card-title>
    <v-list lines="one">
      <v-list-item v-for="(item, index) in completedTasks" :key="index">
        ToDo - {{ index + 1 }} - {{ item.ToDo }}
        <v-btn @click="undoneTask(index)">Undone Task</v-btn>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/store.js';

const todoStore = useTodoStore();

const { completedTasks, undoneTask, countDone } = todoStore;
</script>
