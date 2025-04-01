<script>
import Index_Requests from "@/views/index/Index_Requests.vue";
import Index_News from "@/views/index/index_News.vue";
import Index_Weather from "@/views/index/Index_Weather.vue";

export default {
  name: "Index",
  data(){
    return {
      weather_class : null,
    }
  },
  components: {
    'index_requests' : Index_Requests,
    'index_news' : Index_News,
    'index_weather' : Index_Weather
  },
  methods:{
    Change_Weather(icon){
      if (icon === '01d'){
        this.weather_class  = 'weather-clear-d';
      }
      if (icon === '01n'){
        this.weather_class  = 'weather-clear-n';
      }
      if (['02d','03d','04d'].includes(icon)){
        this.weather_class  = 'weather-parakande-d';
      }
      if (['02n','03n','04n'].includes(icon)){
        this.weather_class  = 'weather-parakande-n';
      }
      if (icon === '09d'){
        this.weather_class  = 'weather-baresh-shadid-d';
      }
      if (icon === '09n'){
        this.weather_class  = 'weather-baresh-shadid-n';
      }
      if (icon === '10d'){
        this.weather_class  = 'weather-rain-d';
      }
      if (icon === '10n'){
        this.weather_class  = 'weather-rain-n';
      }
      if (icon === '11d' || icon === '11n'){
        this.weather_class  = 'weather-toofan';
      }
      if (icon === '50d' || icon === '50n'){
        this.weather_class  = 'weather-mist';
      }
      if (icon === '13d'){
        this.weather_class  = 'weather-snow-d';
      }
      if (icon === '13n'){
        this.weather_class  = 'weather-snow-n';
      }
    }
  }
}
</script>

<template>

  <q-card flat square >
    <q-card-section  class="q-px-sm weather" :class="weather_class">
      <index_weather @Background="(icon) =>  Change_Weather(icon)"></index_weather>
    </q-card-section>
    <q-card-section class="q-px-none q-pt-none">
      <index_requests></index_requests>
      <index_news></index_news>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.weather{
  background-size: cover;
  background-position: center center;
}
.weather-clear-d{
  background-image: url("assets/images/weather/clear-d.png");
}
.weather-clear-n{
  background-image: url("assets/images/weather/clear-n.png");
}
.weather-baresh-shadid-d{
  background-image: url("assets/images/weather/baresh-shadid-d.png");
}
.weather-baresh-shadid-n{
  background-image: url("assets/images/weather/baresh-shadid-n.png");
}
.weather-mist{
  background-image: url("assets/images/weather/mist.png");
}
.weather-parakande-d{
  background-image: url("assets/images/weather/parakande-d.png");
}
.weather-parakande-n{
  background-image: url("assets/images/weather/parakande-n.png");
}
.weather-rain-d{
  background-image: url("assets/images/weather/rain-d.png");
}
.weather-rain-n{
  background-image: url("assets/images/weather/rain-n.png");
}
.weather-snow-d{
  background-image: url("assets/images/weather/snow-d.png");
}
.weather-snow-n{
  background-image: url("assets/images/weather/snow-n.png");
}
.weather-toofan{
  background-image: url("assets/images/weather/toofan.png");
}


</style>