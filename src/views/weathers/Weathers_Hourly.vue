<script>
import {Stores_Weathers} from "@/stores/weathers/weathers.js";

export default {
  name: "Weathers_Hourly",
  props : ['location'],
  mounted() {
    if (this.location) {
      this.Get_Weathers();
    }
  },
  data(){
    return {
      loading:true,
      weathers : null,
      weathers_error : false,
      icons:[],
      description:[],
    }
  },
  methods:{
    Get_Weathers(){
      let data = this.location['lat']+','+this.location['lon'];
      Stores_Weathers().Weathers_Index({location : data,exclude : 'hourly'}).then(res =>{
        this.weathers = res.data.result;
        if (this.weathers.hourly.weather_code){
          this.weathers.hourly.weather_code.forEach(item => {
            this.description.push(this.Methods_Parse_Weather_Code(item).text);
            this.icons.push( new URL(`../../assets/images/icons/weathers/${this.Methods_Parse_Weather_Code(item).icon}`, import.meta.url).href);
          })
        }
        console.log(this.description)
        this.loading = false;
      }).catch(error => {
        this.weather_error = true;
        this.loading = false;
      })

    }
  }

}
</script>

<template>
  <global_loading_colorful v-if="loading" class="q-mt-md" size="100" text="درحال دریافت اطلاعات آب و هوا"></global_loading_colorful>
  <template v-else>
    <div v-for="i in 48" class="q-mb-lg animation-fade-in">
      <div class="date-box text-center">
        <strong class="text-grey-9">{{ this.$filters.date_jalali(this.Methods_FormatUnixTimestamp(weathers.hourly.time[i-1]),'HH:mm:s') }}</strong>
      </div>
      <div class="item-box">
        <div class="row">
          <div class="col-7">
            <div class="row">
              <img  v-if="icons[i-1]" :src="icons[i-1]" width="65" alt="">
              <div class="q-mt-md">
                <strong class="font-19 text-white">{{Math.round(weathers.hourly.temperature_2m[i-1])}}</strong>
              </div>
              <div class="col-12">
                <strong class="font-16 text-white">{{description[i-1]}}</strong>
              </div>
            </div>
          </div>
          <div class="col-5">
            <div class="q-mt-xs">
              <q-icon name="fa-duotone fa-wind-turbine" size="22px" color="white"></q-icon>
              <strong class="text-white font-12 q-ml-sm">سرعت باد : </strong>
              <strong class="text-white">{{weathers.hourly.wind_speed_10m[i-1]	}}</strong>
              <span class="text-grey-2 font-11 q-mr-xs">m/s</span>
            </div>
            <div class="q-mt-sm">
              <q-icon name="fa-duotone fa-droplet-percent" size="22px" color="blue-3"></q-icon>
              <strong class="text-white font-12 q-ml-sm">احتمال بارش : </strong>
              <strong class="text-white">{{weathers.hourly.precipitation_probability[i-1]	}}</strong>
              <span class="text-grey-2 font-11 q-mr-xs">%</span>
            </div>
            <div class="q-mt-sm">
              <q-icon name="fa-duotone fa-cloud-drizzle" size="22px" color="blue-3"></q-icon>
              <strong class="text-white font-12 q-ml-sm">میزان بارش : </strong>
              <strong class="text-white">{{weathers.hourly.precipitation[i-1]	}}</strong>
              <span class="text-grey-2 font-11 q-mr-xs">mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

</template>

<style scoped>

.item-box{
  border-radius: 0px 8px 8px 8px;
  padding: 12px 10px;
  background: rgba(34, 49, 63, 0.9);
  backdrop-filter: blur(25px);


}
.date-box{
  width: 150px;
  border-radius: 8px 8px 0px 0px;
  padding: 8px 8px 2px 2px;
  border: 1px dashed rgba(8,29,73,0.65);
  background: rgba(8,29,73,0.1);

  border-bottom: none;
}
</style>