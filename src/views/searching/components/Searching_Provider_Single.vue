<script>
import {Stores_Searching} from "@/stores/searching/searching.js";

export default {
  name: "Searching_Provider_Single",
  props:['provider','request_id','requested'],
  data(){
    return {
      loading:false,
      remove_loading: false,
      requested_providers:[],

    }
  },
  methods: {
    Send_Request(){
      this.loading = true;
      let params = {
        "request_id" : this.request_id,
        "user_id" : this.provider.user.id
      }
      Stores_Searching().Searching_Send_Request(params).then(res => {
        this.$emit('Requested');

      }).catch(error => {

      })


    },
    Get_Status(user_id){
      let result;
      if (this.requested.length > 0) {
        this.requested.forEach(item => {
          if (item.user_id === user_id) {
            result = item;
          }
        })
      }
      if (result){
        return result.status;
      }else {
        return null;
      }
    }
  },
}
</script>

<template>
  {{  }}
  <div v-if="provider" class="provider-box q-mb-lg animation-fade-in">
    <div class="row">
      <div class="col-6 row">
        <div class="col-4">

          <router-link :to="{name : 'providers_profile', params:{id:provider.user.id}}">
            <img src="assets/images/icons/user-profile.svg" width="55" />
          </router-link>
        </div>
        <div class="col-8 q-mt-xs">
          <div class="q-ml-xs">
            <router-link :to="{name : 'providers_profile', params:{id:provider.user.id}}">
              <strong class=" text-teal-7 font-14">{{provider.user.name}}</strong>
            </router-link>
            <div class="q-mt-md">
              <span class="text-grey-8">فاصله : </span> <strong class="text-dark">{{provider.dis}}</strong> <span class="text-grey-8">کیلومتر</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 text-right q-pr-xs">
        <strong class="text-deep-purple-8 font-15">{{ this.$filters.number_format(provider.price)}}</strong>
        <span class="text-grey-8 font-12 q-ml-xs">تومان</span>
        <span class="text-dark font-13 font-weight-600 q-ml-xs">{{provider.price_type}}</span>
      </div>
      <div class="col-12">
        <div class="text-right" style="margin-top: -25px!important;">
          <template v-if="Get_Status(provider.user.id) === 'pending'">
            <q-btn rounded icon="fa-duotone fa-light fa-hourglass-clock fa-fade" color="yellow-10" text-color="dark" label="درانتظار تایید" class="font-12" size="sm"></q-btn>
          </template>
          <template v-else>
            <q-btn @click="Send_Request" :loading="loading" rounded outline color="teal-6" label="ارسال درخواست" class="font-13" size="sm"></q-btn>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.provider-box{
  border-radius: 7px;
  border: 1px #05492b dashed;
  padding: 16px 10px;

}

</style>