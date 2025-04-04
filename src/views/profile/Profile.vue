<script>

import {Stores_Profile} from "@/stores/profile/profile.js";
import map_satelite from "@/components/global/map/Global_Map_Satelite.vue";

export default {
  name: "Profile",
  components: {map_satelite},
  mounted() {
    this.Get_Profile()
    this.Get_Province();

  },
  data(){
    return {
      user:null,
      image_dialog:false,
      edit_dialog:false,
      edit_loading:false,
      image_loading:false,
      image:null,
      provinces:[],
      provinces_select:[],
      cities_select:[],
      errors:[],
      edit_items : {
        name : null,
        province_id : null,
        city_id : null,
        bio : null,
        national_code : null,
      }
    }
  },
  methods:{
    Get_Profile(){
      Stores_Profile().Index().then(res=>{
        this.user = res.data.result;
        this.edit_items.name = this.user.name;
        this.edit_items.province_id = this.user.province_id;
        this.edit_items.city_id = this.user.city_id;
        this.edit_items.bio = this.user.bio;
        this.edit_items.national_code = this.user.national_code;
      }).catch(error => {

      })
    },
    Update_Image(type){
      this.image_loading=true;
      if (type === 'remove'){
        this.image = null;
      }
      Stores_Profile().Edit_Image({image:this.image}).then(res=>{
        if (res.data.result){
          this.user.profile = res.data.result;
        }else {
          this.user.profile=null;
        }
        this.image_loading=false;
        this.image_dialog=false;
        this.Methods_Notify_Update();
      }).catch(error => {
        this.Methods_Notify_Error_Server()
        this.image_loading=false;
      })
    },
    Get_Province(){
      Stores_Profile().Locations().then(res=>{
        this.provinces = res.data.result;
        res.data.result.forEach(item => {
          this.provinces_select.push({label:item.name,value:item.id});
        })
      }).catch(error => {

      })


    },
    Edit_Profile(){
      this.edit_loading=true;
      Stores_Profile().Edit(this.edit_items).then(res=>{
        this.Get_Profile();
        this.edit_loading=false;
        this.edit_dialog=false;
        this.Methods_Notify_Update();
      }).catch(error => {
        if (error.response.status === 422) {
          this.errors = error.response.data;
          this.Methods_Validation_Notify();
        }
        this.edit_dialog=false;

      })
    },
  },
  computed:{
    GetCities(){
      if (this.edit_items.province_id){
        let cities;
        this.provinces.forEach(province =>{
          if (province.id === this.edit_items.province_id){
            cities = province.cities;
          }
        })
        this.cities_select=[];
        cities.forEach(city => {
          this.cities_select.push({label : city.name , value : city.id})
        })
      }
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
            <q-icon v-if="!user.profile" @click="image_dialog=true" name="fa-duotone fa-solid fa-user-vneck" size="75px" color="deep-purple-8"></q-icon>
            <img @click="image_dialog=true" v-else :src="user.profile" class="profile-image shadow-1" :alt="user.name">

            <q-dialog
                v-model="image_dialog"
                position="top"
            >
              <q-card style="width: 100%">
                <q-card-section class="row items-center q-pb-none">
                  <div>
                    <strong class="text-deep-purple-7 font-15">ویرایش تصویر پروفایل</strong>
                  </div>
                  <q-space />
                  <q-btn icon="fa-duotone fa-times fa-regular" color="red" round size="xs" v-close-popup />
                </q-card-section>
                <q-separator class="q-mt-md" />
                <q-card-section>
                  <div>
                    <q-file outlined rounded bottom-slots v-model="image" color="indigo-5" label="تصویر پروفایل جدید" counter>
                      <template v-slot:prepend>
                        <q-icon name="fa-duotone fa-image fa-regular" color="green" />
                      </template>
                      <template v-slot:append>
                        <q-icon name="fa-duotone fa-times fa-regular" color="red" @click.stop.prevent="image = null" class="cursor-pointer" />
                      </template>
                    </q-file>
                  </div>
                </q-card-section>
                <q-card-actions align="right" class="q-mb-sm">
                  <q-btn @click="Update_Image('update')" :disable="!image" rounded color="teal-7" icon="fa-duotone fa-light fa-check" label="ثبت تصویر جدید"></q-btn>
                  <q-btn @click="Update_Image('remove')" :disable="!user.profile" rounded color="red" icon="fa-duotone fa-light fa-trash" label="حذف تصویر فعلی"></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-dialog
                v-model="edit_dialog"
                position="top"
            >
              <q-card style="width: 100%">
                <q-card-section class="row items-center q-pb-none">
                  <div>
                    <strong class="text-blue-7 font-15">ویرایش اطلاعات کاربری</strong>
                  </div>
                  <q-space />
                  <q-btn icon="fa-duotone fa-times fa-regular" color="red" round size="xs" v-close-popup />
                </q-card-section>
                <q-separator class="q-mt-md" />
                <q-card-section>
                  <div>
                    <q-input label="نام کامل" color="indigo-5" :error="this.Methods_Validation_Check(errors,'name')" v-model="edit_items.name" rounded outlined>
                      <template v-slot:prepend>
                        <q-icon name="fa-duotone fa-user fa-regular" color="green-8"></q-icon>
                      </template>
                      <template v-slot:error>
                        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'name')"></global_validations_errors>
                      </template>
                    </q-input>
                  </div>

                  <div class="q-mt-xs">
                    <q-input type="number" label="کد ملی" color="indigo-5" :error="this.Methods_Validation_Check(errors,'national_code')" v-model="edit_items.national_code" rounded outlined>
                      <template v-slot:prepend>
                        <q-icon name="fa-duotone fa-id-card fa-regular" color="green-8"></q-icon>
                      </template>
                      <template v-slot:error>
                        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'national_code')"></global_validations_errors>
                      </template>
                    </q-input>
                  </div>

                  <div class="q-mt-xs">
                    <q-select
                        outlined
                        v-model="edit_items.province_id"
                        color="indigo-5"
                        rounded
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        use-input
                        label="استان"
                        :options="provinces_select"
                        emit-value
                        map-options
                        behavior="menu"
                        @change="GetCities"
                        :error="this.Methods_Validation_Errors(errors,'province_id')"
                    >
                      <template v-slot:prepend>
                        <q-icon name="fa-duotone fa-house-building fa-regular" color="green-8"></q-icon>
                      </template>
                      <template v-slot:error>
                        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'province_id')"></global_validations_errors>
                      </template>
                    </q-select>
                  </div>

                  <div class="q-mt-xs">
                    <q-select
                        outlined
                        v-model="edit_items.city_id"
                        color="indigo-5"
                        rounded
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        use-input
                        label="شهر"
                        :options="cities_select"
                        emit-value
                        map-options
                        behavior="menu"
                        :error="this.Methods_Validation_Errors(errors,'city_id')"
                    >
                      <template v-slot:prepend>
                        <q-icon name="fa-duotone fa-building-user fa-regular" color="green-8"></q-icon>
                      </template>
                      <template v-slot:error>
                        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'city_id')"></global_validations_errors>
                      </template>
                    </q-select>
                  </div>

                  <div class="q-mt-xs">
                    <q-input label="درباره شما ..." type="textarea" rows="3" color="indigo-5" :error="this.Methods_Validation_Check(errors,'bio')" v-model="edit_items.bio" rounded outlined>
                      <template v-slot:prepend>
                        <q-icon name="fa-duotone fa-memo-pad fa-regular" color="green-8"></q-icon>
                      </template>
                      <template v-slot:error>
                        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'bio')"></global_validations_errors>
                      </template>
                    </q-input>
                  </div>

                </q-card-section>
                <q-card-actions align="right" class="q-mb-sm">
                  <q-btn v-close-popup rounded color="blue-grey-7" icon="fa-duotone fa-light fa-times" label="بستن"></q-btn>
                  <q-btn @click="Edit_Profile" :loading="edit_loading" rounded color="teal-8" icon="fa-duotone fa-light fa-check" label="ثبت اطلاعات"></q-btn>
                </q-card-actions>
              </q-card>
            </q-dialog>
            <div class="q-mt-md">
              <strong class="font-19 text-deep-orange-9">{{user.name}}</strong>  -  <strong class="font-15 text-grey-9">{{user.phone}}</strong>
            </div>
          </div>
          <div class="row q-mt-lg">
            <div class="col-4 ">
              <q-icon name="fa-duotone fa-solid fa-house-building" color="green-8" size="18px"></q-icon>
              <strong v-if="user.province" class="q-ml-xs text-grey-9 font-13"> : {{user.province.name}}</strong>
            </div>
            <div class="col-4">
              <q-icon name="fa-duotone fa-solid fa-building-user" color="green-8" size="18px"></q-icon>
              <strong v-if="user.city" class="q-ml-xs text-grey-9 font-13"> : {{user.city.name}}</strong>
            </div>
            <div class="col-4">
              <q-icon name="fa-duotone fa-solid fa-id-card" color="green-8" size="18px"></q-icon>
              <strong class="q-ml-xs text-grey-9 font-13"> : {{user.national_code}}</strong>
            </div>
            <div class="col-12 q-mt-lg">
              <q-icon name="fa-duotone fa-solid fa-memo-pad" color="green-8" size="18px"></q-icon>
              <strong class="q-ml-xs text-grey-9 font-13"> : {{user.bio}}</strong>
            </div>
            <div class="col-12 q-mt-md text-center">
              <q-btn class="font-13 q-pt-sm q-pb-sm" @click="edit_dialog=true" label="ویرایش اطلاعات کاربری" push color="teal-8" rounded icon="fa-duotone fa-pencil fa-light"></q-btn>
            </div>

          </div>
        </div>
      </q-card-section>
      <q-separator class=""/>
      <q-card-section>


      </q-card-section>
    </template>
  </q-card>
</template>

<style scoped>

.profile-image{
  width: 100px;
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
}
</style>