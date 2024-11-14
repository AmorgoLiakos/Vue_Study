<script setup>
import '../css/country-card.scss'

defineProps({
  name: String,
  flag: String,
  capital: Array,
  timezone: Array,
})
</script>

<template>
  <div class="country-card">
    <div class="country-card__name"> {{ name }} </div>
    <div class="country-card__flag"> {{ flag }} </div>
    <div v-if="capital" class="capital"> {{ capital[0] }} </div>
    <div class="timezones"> {{ timezone[0] }} </div>
  </div>
</template>