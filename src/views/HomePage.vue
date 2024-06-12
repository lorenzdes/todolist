<template>
  <div>
    <v-card-title class="text-h6 text-md-h5 text-lg-h4">
      Number of undone TODOs: {{ countUndone }}
    </v-card-title>
    <v-list lines="one">
      <v-list-item v-for="(item, index) in ToDOs" :key="index">
        <v-row justify="space-between" align="center" class="w-100">
          <v-col cols="auto">
            ToDo - {{ index + 1 }} - {{ item.ToDo }} - 
          </v-col>
          <v-col cols="auto">
            <v-select
              v-model="item.priority"
              :items="['Low', 'Medium', 'High']"
              label="Priority"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="auto">
            <v-btn @click="doneTask(index)">Done Task</v-btn>
            <v-btn @click="deleteToDo(index)">Delete Task</v-btn>
          </v-col>
        </v-row>
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
    <v-row justify="center" align="center">
      <v-col cols="12" sm="4">
        <v-select
          v-model="priority"
          :items="['Low', 'Medium', 'High']"
          label="Priority"
          outlined
        ></v-select>
      </v-col>
    </v-row>
    <v-btn @click="handleAddToDo">Add ToDo</v-btn>
    <v-snackbar v-model="isSnackbarOpen" multi-line>
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="isSnackbarOpen = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mt-5">
          <v-card-title>
            Current Time in Italy: {{ currentTime }}
          </v-card-title>
        </v-card>
        <div>
          <SearchInput @place-data="addPlace" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(place, idx) in places" :key="idx">
            <WeatherCard :place="place" @delete-place="deletePlace" />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-card class="mt-5">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4">
        Current Weather in Italy:
      </v-card-title>
      <v-card-text>
        Temperature: {{ weatherData.temperature }}°C <br />
        Wind Speed: {{ weatherData.windSpeed }} m/s
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useTodoStore } from '../stores/store.js';
import SearchInput from 'C:/Users/User/Desktop/vue_test/todolist/src/components/SearchInput.vue';
import WeatherCard from 'C:/Users/User/Desktop/vue_test/todolist/src/components/WeatherCard.vue';

const places = ref([]);

const addPlace = (data) => {
  places.value.push(data);
};

const deletePlace = (name) => {
  if (confirm('Are you sure')) {
    places.value = places.value.filter((p) => p.location.name !== name);
  }
};

const todoStore = useTodoStore();
const newToDo = ref('');
const priority = ref('Low');
const { ToDOs, addToDo, deleteToDo, doneTask, countUndone, isSnackbarOpen, snackbarMessage } = todoStore;

const handleAddToDo = () => {
  if (newToDo.value.trim() !== '') {
    addToDo({ ToDo: newToDo.value.trim(), priority: priority.value });
    newToDo.value = '';
    priority.value = 'Low';
  } else {
    isSnackbarOpen.value = true;
    snackbarMessage.value = 'Task cannot be empty';
  }
};

const weatherData = ref({ temperature: '', windSpeed: '' });
const currentTime = ref('');

const fetchWeatherData = async () => {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: 41.9028,  // Latitude for Italy
        longitude: 12.4964, // Longitude for Italy
        current_weather: true,
        hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
      }
    });
    const currentWeather = response.data.current_weather;
    weatherData.value.temperature = currentWeather.temperature;
    weatherData.value.windSpeed = currentWeather.windspeed;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherData.value.temperature = 'Error';
    weatherData.value.windSpeed = 'Error';
  }
};

const fetchCurrentTime = async () => {
  try {
    const response = await axios.get('http://worldtimeapi.org/api/timezone/Europe/Rome');
    currentTime.value = new Date(response.data.datetime).toLocaleString('en-GB', {
      timeZone: 'Europe/Rome'
    });
  } catch (error) {
    console.error('Error fetching time:', error);
    currentTime.value = 'Error fetching time';
  }
};

onMounted(() => {
  fetchWeatherData();
  fetchCurrentTime();
  setInterval(() => {
    fetchWeatherData();
    fetchCurrentTime();
  }, 60000); // Update weather and time every minute
});
</script>

<style scoped>
.extraWidth {
  width: 400px;
  margin: 40px 0 0;
}
</style>
