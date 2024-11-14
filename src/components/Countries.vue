<script setup>
import {reactive, onMounted, ref} from 'vue';
import CountryCard from './CountryCard.vue'
import axios from 'axios';
import '../css/countries.scss'
import '../css/search.scss'

const countriesData = ref([])

const searchInput = ref('')
const API_URL = 'https://restcountries.com/v3.1/'

const searchFunc = async () => {
  try {
    const res = await axios.get(API_URL + 'name/' + searchInput.value)
    countriesData.value = res.data
  }catch(error){
    console.log(error);
  }
}

onMounted( async () => {
  try {
    const res = await axios.get(API_URL + "all")
    countriesData.value = res.data
  }catch(error){
    console.log(error);
  }
})
</script>

<template>
  <div class="search">
    <input type="text" placeholder="Search by city name" v-model="searchInput" @input="searchFunc" />
  </div>
  <div class="countries-wrapper">
    <CountryCard v-for="(country,index) in countriesData" :name="country.name.common" :flag="country.flag" :timezone="country.timezones" :capital="country?.capital" :key="index" />
  </div>
</template>