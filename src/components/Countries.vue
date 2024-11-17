<script setup>
import {onMounted, ref} from 'vue';
import CountryCard from './CountryCard.vue'
import NoSearchResults from "./NoSearchResults.vue";
import {debounce} from "../composables/debounce.js"
import axios from 'axios';
import '../css/countries.scss'
import '../css/search.scss'

const countriesData = ref([])
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

const searchFuncHelper = async () => {
  if( !searchInput.value.length ){
    countriesData.value = await fetchFunc(API_URL + "all")
    return
  }
  let resultsData = await fetchFunc(API_URL + 'name/' + searchInput.value)
  if( resultsData.status && resultsData.status !== 200 ){
    countriesData.value = []
    return
  }

  countriesData.value = await resultsData
}
const searchFunc = debounce(searchFuncHelper)

onMounted(  async () => {
  countriesData.value = await fetchFunc(API_URL + "all")
})
</script>

<template>
  <div class="search">
    <input type="text" placeholder="Search by city name" v-model="searchInput" @input="searchFunc" />
  </div>
  <div class="countries-wrapper">
    <CountryCard v-for="(country,index) in countriesData" :name="country.name.common" :flag="country.flag" :timezone="country.timezones" :capital="country?.capital" :key="index" />
    <NoSearchResults v-if="!countriesData.length" />
  </div>
</template>