<script>
import {Stores_Auth} from "@/stores/auth/auth.js";
import {Stores_Implements} from "@/stores/Implements/implements.js";
import {Stores_Lands} from "@/stores/lands/lands.js";

export default {
  name: "Searching",
  mounted() {
    this.Get_Categories();
    this.Get_Implements();
  },
  data() {
    return {
      categories:[],
      implements:[],
      lands:[],
      jalali_date:null,
      searching: false,
      search_data:{
        implement_id:null,
        user_land_id:null,
        area:null,
      },
      implement_category_id:null,
      errors:[],

    }
  },
  methods: {
    Stores_Auth,
    Get_Categories(){
      Stores_Implements().Categories().then(res=>{
        this.categories = [];
        res.data.result.forEach(item=>{
          this.categories.push({label: item.name, value: item.id,image:item.image});
        })
      })
    },
    Get_Implements(){
      let params = {}
      if (this.implement_category_id){
        params.category = this.implement_category_id;
        this.search_data.implement_id =null;
      }
      Stores_Implements().All(params).then(res=>{
        this.implements = [];
        res.data.result.forEach(item=>{
          this.implements.push({label: item.name, value: item.id,image:item.image});
        })
      })
    },
    Get_Lands(){
      Stores_Lands().Index().then(res=>{
        this.lands = [];
        res.data.result.forEach(item=>{
          this.lands.push({label: item.title, value: item.id});
        })
      })
    },
    Filter_Category_Select (val, update, abort) {
      update(() => {
        if (val){
          this.categories =  this.categories.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Categories();
        }
      })
    },
    Filter_Implements_Select (val, update, abort) {
      update(() => {
        if (val){
          this.implements =  this.implements.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Implements();
        }
      })
    },
    Filter_Lands_Select (val, update, abort) {
      update(() => {
        if (val){
          this.lands =  this.lands.filter(item => {
            return item.label !== null && item.label.match(val)
          })
        }else {
          this.Get_Lands();
        }
      })
    },

  }

}
</script>

<template>
  <q-card flat class="animation-fade-in">
    <q-card-section>
      <div class="q-mt-sm text-center">
        <strong class="text-teal-9 font-17">جستجو خدمات کشاورزی</strong>
      </div>
      <div v-if="Stores_Auth().AuthGetCheckAuth" class="text-center q-mt-md">
        برای جستجو خدمات کافیه زمین و خدمات مورد نظر خود را انتخاب کنید و کلید جستجتو را بزنید ، افراد ارائه دهنده این خدمات که نزدیک شما هستند برای شما نمایش داده میشوند
      </div>
    </q-card-section>
    <template v-if="!Stores_Auth().AuthGetCheckAuth">
      <div class=" q-px-sm">
        <div class="text-center">
          <img class="" src="assets/images/background/working.svg" width="400" alt="">
          <div class="q-mt-xs">
            <strong class="font-13 text-red">
              برای جستجتو خدمات کشاورزی ابتدا باید وارد حساب کاربری خود شوید
            </strong>
          </div>
          <div class="text-center q-mt-lg">
            <q-btn :to="{name : 'auth'}" class="q-py-sm" color="teal-8" rounded label="ثبت نام / ورود به حساب کاربری"></q-btn>
          </div>
        </div>
      </div>

    </template>
    <template v-else>
      <q-card-section>
        <div class="q-px-">
          <div>
            <q-select
                outlined
                :options="categories"
                emit-value
                @update:model-value="Get_Implements"
                color="indigo-5"
                label="انتخاب دسته بندی خدمات"
                map-options
                v-model="implement_category_id"
                @filter="Filter_Category_Select"
                position="top"
                rounded
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <img src="assets/images/icons/category.svg" width="32" alt="">
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                    <strong>
                      {{ scope.opt.label }}
                    </strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="fa-duotone fa-regular fa-grid-2" color="teal-8" size="24px"></q-icon>
              </template>
            </q-select>
          </div>
          <div class="q-mt-lg">
            <q-select
                outlined
                :options="implements"
                emit-value
                color="indigo-5"
                label="انتخاب خدمات مورد نظر"
                map-options
                v-model="search_data.implement_id"
                @filter="Filter_Implements_Select"
                position="top"
                rounded
                use-input
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <img src="assets/images/icons/implement.svg" width="45" alt="">
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                    <strong>
                      {{ scope.opt.label }}
                    </strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="fa-duotone fa-regular fa-tractor" color="teal-8" size="24px"></q-icon>
              </template>
            </q-select>
          </div>
          <div class="q-mt-lg">
            <q-select
                outlined
                :options="lands"
                emit-value
                color="indigo-5"
                label="انتخاب زمین (مزرعه)"
                map-options
                v-model="search_data.user_land_id"
                @filter="Filter_Lands_Select"
                position="top"
                rounded
                use-input
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section avatar>
                    <img src="assets/images/icons/farm.svg" class="rounded-borders" width="45" alt="">
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                    <strong>
                      {{ scope.opt.label }}
                    </strong>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="fa-duotone fa-regular fa-location-check" color="teal-8" size="24px"></q-icon>
              </template>
            </q-select>
          </div>
          <div class="q-mt-lg">
            <q-input outlined rounded v-model="search_data.area" type="number" label="مساحت کار ( متر مربع )">
              <template v-slot:prepend>
                <q-icon name="fa-duotone fa-regular fa-ruler-triangle" color="teal-8" size="24px"></q-icon>
              </template>
            </q-input>
            <div class="q-px-sm q-mt-sm text-red-9 font-13">
              اگر متراژ کار را وارد نکنید،مساحت کل زمین در نظر گرفته میشود
            </div>
          </div>
          <div class="q-mt-lg">
            <q-input rounded outlined v-model="jalali_date" mask="date" label="تاریخ انجام (روی آیکون تقویم کلیک کنید)">
              <template v-slot:prepend>
                <q-icon color="teal-8" name="fa-duotone fa-regular fa-calendar" class="cursor-pointer" title="باز کردن تقویم">
                  <q-popup-proxy cover>
                    <q-date color="teal-6" dark v-model="jalali_date"  calendar="persian" >
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="q-mt-xl">
            <q-btn class="q-mt-md font-15"  rounded color="teal-7" label="جستجتو خدمات" style="width: 100%;padding-top: 13px;padding-bottom: 13px" icon="fa-duotone fa-regular fa-magnifying-glass"></q-btn>
          </div>

        </div>
      </q-card-section>
    </template>

  </q-card>





</template>

<style scoped>

</style>