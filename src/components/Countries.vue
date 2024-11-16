<script setup>
import {onMounted, ref} from 'vue';
import CountryCard from './CountryCard.vue'
import axios from 'axios';
import '../css/countries.scss'
import '../css/search.scss'
import NoSearchResults from "@/components/NoSearchResults.vue";

const countriesData = ref([])
const searchedCountriesData = ref([])

const searchInput = ref('')
const API_URL = 'https://restcountries.com/v3.1/'

const fetchFunc = async (url) => {
  try {
    const res = await axios.get(url)
    return res.data
  }catch(error){
    return error;
  }
}

const searchFunc = () => {
  searchedCountriesData.value = countriesData.value.filter( country => country.name.common.toLowerCase().includes(searchInput.value.toLowerCase()) );
}

onMounted(  async () => {
  countriesData.value = await fetchFunc(API_URL + "all")
  searchedCountriesData.value = countriesData.value
})
</script>

<template>
  <div class="search">
    <input type="text" placeholder="Search by city name" v-model="searchInput" @input="searchFunc" />
  </div>
  <div class="countries-wrapper">
    <CountryCard v-if="searchedCountriesData.length" v-for="(country,index) in searchedCountriesData" :name="country.name.common" :flag="country.flag" :timezone="country.timezones" :capital="country?.capital" :key="index" />
    <NoSearchResults v-else />
  </div>
</template>