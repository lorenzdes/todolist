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
</template>

<script setup>
</script>
