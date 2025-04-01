<script>
import {Stores_Searching} from "@/stores/searching/searching.js";

export default {
  name: "Index_Weather",
  beforeMount() {
    if (localStorage.getItem("keshavarz_weather_city")) {
      this.city = localStorage.getItem("keshavarz_weather_city");
    }
  },
  mounted() {
    if (!localStorage.getItem("keshavarz_weather_city")) {
      this.Get_Weather()
    }
  },
  data(){
    return {
      loading:true,
      weather : null,
      today:null,
      today_icon:null,
      search_dialog:false,
      cities:[],
      city: null,
      weather_error : false,
      loading_location : false,
      coordinates: {
        lat : null,
        lng : null,
      },


    }
  },
  watch: {
    city(newCity) {
      if (newCity) {
        this.Get_Weather(newCity);
      }
    }
  },
  methods:{
    Get_Weather(city = null,location = null){
      if (location === 'yes'){
        if (this.coordinates.lat && this.coordinates.lng){
          location = this.coordinates.lat + ',' + this.coordinates.lng;
        }
      }else {
        if (!city){
          city = 'گرگان'
        }else {
          localStorage.setItem('keshavarz_weather_city',city);
        }
      }

      axios.post('public/weathers/current',{city:city,location : location}).then(res=>{
        this.loading = false;
        this.weather  = res.data.result;
        this.today = this.weather.weather[0];
        this.$emit('Background',this.today.icon);
        this.$emit('Location',this.weather.coord);
        if (location){
          localStorage.setItem('keshavarz_weather_city',this.weather.name);
        }
        if (this.today.icon){
            this.today_icon = new URL(`../../assets/images/icons/weathers/${this.today.icon}.svg`, import.meta.url).href;
        }

      }).catch(error => {
        localStorage.removeItem('keshavarz_weather_city');
        this.Get_Weather();
        this.weather_error = true;
      })
    },
    Filter_City_Select (val, update, abort) {
      update(() => {
        if (val){
          let name = val.replace(/\s/g, '');
          if (val.length >= 2){
            this.Get_Cities(name)
          }
        }
      })
    },
    Get_Cities(name){
      Stores_Searching().Searching_Cities(name).then(res=>{
        if (res.data.result){
          this.cities = [];
          res.data.result.forEach(item=>{
            this.cities.push({label:item.name,value:item.name});
          })
        }
      })

    },
    Change_Weather(){
      this .search_dialog =false;
    },
    async Get_Location() {
      this.loading_location = true;
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          })
        })
        this.coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        this.Get_Weather('','yes')
        this.loading_location = false;
        this.search_dialog = false;
      } catch (error) {
        alert(error.message);
      } finally {
        this.loading_location = false;
      }
    }
  }
}
</script>

<template>
  <global_loading_colorful v-if="loading" size="70"></global_loading_colorful>
 <div v-else class="animation-fade-in item-box">

   <div class="row">
     <div class="col-12">
       <div class="q-px-sm">
         <strong @click="search_dialog=true;city=null" class="text-white">وضعیت هوا </strong><strong class="text-white font-16 q-ml-xs">{{weather.name}}</strong>
         <q-icon @click="search_dialog=true;city=null" name="fa-duotone fa-search fa-regular" color="white" size="24px" class="float-right cursor-pointer"></q-icon>
         <q-dialog position="top" v-model="search_dialog">
           <q-card flat style="margin-top: 50px;max-width: 95%">
             <q-card-section>
               <div>
                 <strong class="font-15 text-teal-8">جستجو شهر و منطقه جغرافیایی</strong>
               </div>
               <q-separator class="q-mt-sm q-mb-sm"/>
               <div class="q-mt-sm">
                 <span>انتخاب شهر</span>
                 {{city}}
                 <div class="q-mt-sm">
                   <q-select
                       outlined
                       :options="cities"
                       emit-value
                       map-options
                       @update:model-value="Change_Weather"
                       v-model="city"
                       @filter="Filter_City_Select"
                       position="top"
                       behavior="menu"
                       rounded
                       use-input
                       placeholder="نام شهر را وارد کنید ..."
                   >
                   </q-select>
                 </div>
               </div>
             </q-card-section>
             <q-card-section class="text-center q-mb-md">
               <q-btn :loading="loading_location" @click="Get_Location" color="blue" label="آب و هوای مختصات من" rounded icon="fa-duotone fa-location" class="q-mr-sm q-pa-sm"></q-btn>
             </q-card-section>
           </q-card>
         </q-dialog>
         <q-dialog position="top" v-model="weather_error">
           <q-card flat style="max-width: 95%;margin-top: 100px">
             <q-card-section>
               <div class="text-center q-mt-md">
                 <img src="assets/images/icons/empty.svg" width="80px" alt="">
               </div>
               <div class="text-center q-mt-sm">
                 <strong class="text-dark">متاسفانه آب و هوای شهر انتخابی شما یافت نشد ! </strong>
               </div>
               <div class="text-center q-mt-sm">
                 <strong class="text-dark">برای مشاهده دقیق آب و هوا لطفا از گزینه مختصات جغرافیایی من استفاده کنید</strong>
               </div>
             </q-card-section>
             <q-card-section class="text-right">
               <q-btn color="blue-grey-8" label="بستن" rounded v-close-popup></q-btn>
             </q-card-section>
           </q-card>
         </q-dialog>
       </div>
     </div>
     <div class="col-7">
       <div class="row">
         <img  v-if="today_icon" :src="today_icon" width="70" alt="">
         <div class="temp">
           <strong class=" text-white">{{ Math.round(weather.main.temp) }}</strong>
         </div>
         <div class="col-12">
           <strong class="font-14 q-ml-md text-white">{{today.description}}</strong>
         </div>
       </div>
     </div>
     <div class="col-5">
       <div style="margin-top: 22px">
         <div>
           <q-icon name="fa-duotone fa-wind-turbine" size="26px" color="white"></q-icon>
           <strong class="text-white font-13">سرعت باد : </strong>
           <strong class="text-white">{{weather.wind.speed}}</strong>
           <span class="text-grey-2 font-11 q-mr-xs">m/s</span>
         </div>
         <div class="q-mt-md">
           <q-icon name="fa-duotone fa-cloud-drizzle" size="26px" color="white"></q-icon>
           <strong class="text-white font-13 q-ml-xs">میزان بارش : </strong>
           <template v-if="weather.rain">
             <strong class="text-white">{{weather.rain['1h']}}</strong>
             <span class="text-grey-2 font-11 q-mr-xs">mm</span>
           </template>
         </div>
       </div>
     </div>
     <div v-if="this.$route.name !== 'weathers'" class="col-12 text-center q-mt-sm q-gutter-x-md">
       <q-btn :to="{name : 'weathers'}" outline size="12px" rounded style="width: 150px" color="white" label="هواشناسی ساعتی"></q-btn>
       <q-btn :to="{name : 'weathers'}" outline size="12px" rounded style="width: 150px"  color="white" label="هواشناسی روزانه"></q-btn>
     </div>
   </div>

 </div>
</template>

<style scoped>
.item-box{
  border-radius: 20px;
  padding: 12px 12px;
  background-color: rgba(0, 0, 0, 0.62);
}
.temp{
  font-size: 35px;
  font-weight: 600;

  margin-top: 25px;
}
</style>