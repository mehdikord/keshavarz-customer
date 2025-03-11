<script>

import {Stores_Profile} from "@/stores/profile/profile.js";

export default {
  name: "Profile",
  mounted() {
    this.Get_Profile()
  },
  data(){
    return {
      user:null,
    }
  },
  methods:{
    Get_Profile(){
      Stores_Profile().Index().then(res=>{
        this.user = res.data.result;
      }).catch(error => {

      })
    }
  }

}
</script>

<template>
  <q-card flat>
    <template v-if="!user">
      <div class="q-mt-xl">
        <global_loading_colorful size="120" text="درحال دریافت اطلاعات حساب کاربری"></global_loading_colorful>
      </div>
    </template>
    <template v-else>
      <q-card-section>
        <div class="q-mt-sm">
          <div class="text-center">
            <q-icon name="fa-duotone fa-solid fa-user-vneck" size="75px" color="deep-purple-8"></q-icon>
            <div class="q-mt-md">
              <strong class="font-19 text-deep-orange-9">{{user.name}}</strong>  -  <strong class="font-15 text-grey-9">{{user.phone}}</strong>
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col-4 ">
              <q-icon name="fa-duotone fa-solid fa-house-building" color="green-8" size="18px"></q-icon>
              <strong class="q-ml-xs text-grey-9 font-13"> : {{user.province.name}}</strong>
            </div>
            <div class="col-4">
              <q-icon name="fa-duotone fa-solid fa-building-user" color="green-8" size="18px"></q-icon>
              <strong class="q-ml-xs text-grey-9 font-13"> : {{user.city.name}}</strong>
            </div>
            <div class="col-4">
              <q-icon name="fa-duotone fa-solid fa-id-card" color="green-8" size="18px"></q-icon>
              <strong class="q-ml-xs text-grey-9 font-13"> : {{user.national_code}}</strong>
            </div>
            <div class="col-12 q-mt-lg">
              <q-icon name="fa-duotone fa-solid fa-memo-pad" color="green-8" size="18px"></q-icon>
              <strong class="q-ml-xs text-grey-9 font-13"> : {{user.bio}}</strong>
            </div>

          </div>
        </div>
      </q-card-section>
      <q-separator class="q-mt-sm"/>
      <q-card-section>
        asdasd
      </q-card-section>
    </template>
  </q-card>
</template>

<style scoped>


</style>