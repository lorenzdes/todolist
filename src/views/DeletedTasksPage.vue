<template>
  <div>
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">
      Number of deleted TODO is: {{ deletedTasks.length }}
    </v-card-title>
    <v-list lines="one">
      <v-list-item v-for="(item, index) in deletedTasks" :key="index">
        ToDo - {{ index + 1 }} - {{ item.ToDo }}
      </v-list-item>
    </v-list>
    <v-btn @click="emptyTrash">Clear Deleted Tasks</v-btn>
  </div>
</template>

<script setup>
import { useTodoStore } from '../stores/store.js';

const todoStore = useTodoStore();

const { deletedTasks, emptyTrash } = todoStore;
</script>
