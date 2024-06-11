<template>
  <div>
    <form>
      <div class="bg-white border border-indigo-600/30 rounded-lg shadow-lg flex items-center">
        <i class="fa-solid fa-magnifying-glass p-2 text-indigo-600"></i>
        <input v-model="searchTerm" @input="handleSearch" placeholder="Search for weather" />
      </div>
    </form>
    <div v-if="results" class="mt-4">
      <div v-if="results.length">
        <ul>
          <li v-for="result in results" :key="result.id">
            <button @click="getWeather(result.name)"
                    class="px-3 my-2 hover:text-indigo-600 hover:font-bold w-full text-left">
              {{ result.name }}, {{ result.region }}, {{ result.country }}
            </button>
          </li>
        </ul>
      </div>
      <div v-else>
        No results found
      </div>
    </div>
    <div v-if="weatherData" class="mt-4">
      <h2>Weather and Forecast for {{ weatherData?.location?.name }}, {{ weatherData?.location?.region }}, {{ weatherData?.location?.country }}</h2>
      <div>
        <p>Temperature: {{ weatherData?.current?.temp_c }}°C</p>
        <p>Condition: {{ weatherData?.current?.condition?.text }}</p>
        <h3>Forecast:</h3>
        <ul>
          <li v-for="forecast in weatherData?.forecast?.forecastday" :key="forecast?.date">
            <p>{{ forecast?.date }}</p>
            <p>Max Temp: {{ forecast?.day?.maxtemp_c }}°C</p>
            <p>Min Temp: {{ forecast?.day?.mintemp_c }}°C</p>
            <p>Condition: {{ forecast?.day?.condition?.text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchTerm = ref('');
let timeout = null;
const results = ref(null);
const weatherData = ref(null); // Reactive property to store weather data

const handleSearch = () => {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    if (searchTerm.value.trim() === '') {
      console.warn('Search term is empty');
      results.value = null;
      return;
    }
    try {
      const res = await fetch(`http://api.weatherapi.com/v1/search.json?key=ea8ddc4af277439d97a72124241106&q=${searchTerm.value}`);
      const data = await res.json();
      results.value = data; // Update results
      if (data.error) {
        console.error('Error from API:', data.error.message);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      results.value = null;
    }
  }, 500);
};

const getWeather = async (name) => {
  try {
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=ea8ddc4af277439d97a72124241106&q=${name}&days=3&aqi=no&alerts=no`);
    const data = await res.json();
    weatherData.value = data; // Store the fetched weather data
    console.log(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};
</script>
