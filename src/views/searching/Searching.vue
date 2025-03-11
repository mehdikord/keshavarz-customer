<script>
import {Stores_Auth} from "@/stores/auth/auth.js";
import {Stores_Implements} from "@/stores/Implements/implements.js";
import {Stores_Lands} from "@/stores/lands/lands.js";
import {Stores_Searching} from "@/stores/searching/searching.js";
import {provide} from "vue";
import Searching_Provider_Single from "@/views/searching/components/Searching_Provider_Single.vue";

export default {
  name: "Searching",
  components: {
    'provider_single' : Searching_Provider_Single,
  },
  mounted() {
    if (localStorage.getItem('customer_keshavarz_searching')){
      this.find=true;
      this.providers = JSON.parse(localStorage.getItem('customer_keshavarz_searching'));
    }
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
        date:null,
      },
      implement_category_id:null,
      errors:[],
      providers:[],
      find:false,
      exists_dialog:false,
      show_message_one : true,
      show_message_profile : true,
      filter_options : [
        {
          label: 'تصادفی',
          value: 'random',
          icon : "fa-duotone fa-shuffle fa-solid",
        },
        {
          label: 'کمترین فاصله',
          value: 'min_dis',
          icon: "fa-duotone fa-right fa-solid",
        },
        {
          label: 'بیشترین فاصله',
          value: 'max_dis',
          icon: "fa-duotone fa-arrow-right-long fa-solid",

        },
        {
          label: 'کمترین قیمت',
          value: 'min_price',
          icon: "fa-duotone fa-chart-line-down fa-solid",

        },
        {
          label: 'بیشترین قیمت',
          value: 'max_price',
          icon: "fa-duotone fa-chart-line-up fa-solid",

        }
      ],
      filter_select : 'random',
      requested_providers:[],

    }
  },
  methods: {
    Stores_Auth,
    Do_Search(){
      if (!this.search_data.implement_id){
        return this.Methods_Notify_Message_Error('خدمات مورد نظر را انتخاب نکرده اید !')
      }
      if (!this.search_data.user_land_id){
        return this.Methods_Notify_Message_Error('زمین مورد نظر را انتخاب نکرده اید !')
      }
      if (this.jalali_date){
        this.search_data.date = this.Methods_Date_Jalali_To_Gregorian(this.jalali_date)
      }
      this.searching = true;
      Stores_Searching().Searching(this.search_data).then(res=>{
        this.providers = res.data.result;
        console.log(this.providers);
        this.find = true;
        if (this.providers.result.length > 0){
          localStorage.setItem('customer_keshavarz_searching', JSON.stringify(this.providers));
        }
        this.searching = false;
      }).catch(error=>{
        if (error.response.status === 409){
          this.exists_dialog = true;
        }
        this.searching = false;

      })


    },
    Reset_Search(){
      this.providers=[];
      localStorage.removeItem('customer_keshavarz_searching');
      this.find=false;
    },
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
    Send_Request(){

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
    SortByKey(array, key, order) {
      return array.sort((a, b) => {
        let comparison = 0;
        if (a[key] > b[key]) {
          comparison = 1;
        } else if (a[key] < b[key]) {
          comparison = -1;
        }
        return order === 'desc' ? comparison * -1 : comparison;
      });
    },

  },
  computed:{
    Do_Filter(){
      if (this.filter_select === 'min_dis'){
        this.providers.result = this.SortByKey(this.providers.result,'dis','asc')
      }
      if (this.filter_select === 'max_dis'){
        this.providers.result = this.SortByKey(this.providers.result,'dis','desc')
      }
      if (this.filter_select === 'min_price'){
        this.providers.result = this.SortByKey(this.providers.result,'price','asc')
      }
      if (this.filter_select === 'max_price'){
        this.providers.result = this.SortByKey(this.providers.result,'price','desc')
      }
      if (this.filter_select === 'random'){
        if (localStorage.getItem('customer_keshavarz_searching')){
          this.providers = JSON.parse(localStorage.getItem('customer_keshavarz_searching'));
        }
      }

    }
  }

}
</script>

<template>
  <q-card flat class="animation-fade-in">
    <q-card-section>
      <div class="q-mt-sm text-center">
        <strong class="text-teal-9 font-17">جستجو خدمات کشاورزی</strong>
      </div>
      <div v-if="Stores_Auth().AuthGetCheckAuth && !find" class="text-center q-mt-md">
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
      <q-card-section class="q-pt-xs">
        <template v-if="!find">
          <q-card-section v-if="!searching">
            <div class="q-px-xs animation-fade-in">
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
                    behavior="menu"
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
                    behavior="menu"
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
                    rounded
                    position="top"
                    behavior="menu"
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
                <q-btn @click="Do_Search" class="q-mt-md font-15"  rounded color="teal-7" label="جستجتو خدمات" style="width: 100%;padding-top: 13px;padding-bottom: 13px" icon="fa-duotone fa-regular fa-magnifying-glass"></q-btn>
              </div>

            </div>
          </q-card-section>
          <template v-else>
            <global_searching text="درحال یافتن نزدیکترین خدمات دهندگان"></global_searching>
          </template>
        </template>
        <template v-else>
          <template v-if="providers.result.length < 1">
            <div class="text-center">
              <img src="assets/images/icons/farmer_one.svg" width="250" alt="farmer">
              <div class="q-mt-xs">
                <strong class="text-red-7">متاسفانه برای {{providers.request.implement.name}} هیچ خدمات دهنده ای در نزدیکی شما یافت نشد !</strong>
              </div>
              <div class="q-mt-lg">
                <q-btn @click="Reset_Search()" color="teal-7" class="q-pt-sm q-pb-sm" rounded icon="fa-duotone fa-light fa-refresh" label="جستجتو مجدد خدمات "></q-btn>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="text-center text-grey-10">
              <span>تعداد : <strong class="text-red-8 font-16"> {{providers.result.length}} </strong> خدمات دهنده برای <strong class="text-dark">{{providers.request.implement.name}}</strong>  یافت شد </span>
              <q-banner v-if="show_message_one" dense class="bg-teal-7 rounded-borders q-mt-sm text-white text-justify">
                <q-btn class="q-mr-sm" @click="show_message_one = false" push round size="xs" color="white" text-color="red-8" icon="fa-duotone fa-times fa-regular"></q-btn>
                  با بررسی شرایط درخواست خود را برای خدمات دهندگان ارسال کنید و در صورت تایید خدمات دهنده ، شماره تماس خدمات دهنده برای شما ارسال میشود
              </q-banner>
            </div>
            <div class="q-mt-md" >
              <strong class="text-red-8 font-13">مرتب سازی نتایج بر اساس :</strong>
              <div class="q-mt-sm" >
                <q-select
                    outlined
                    color="indigo"
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    v-model="filter_select"
                    label="انتخاب ترتیب نمایش"
                    :options="filter_options"
                    emit-value
                    map-options
                    @change="Do_Filter"
                    position="top"
                    behavior="menu"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-icon :name="scope.opt.icon" color="deep-purple-10" size="24px"></q-icon>
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

                </q-select>
              </div>
            </div>
            <div class="q-mt-md">
              <q-banner v-if="show_message_profile" dense class="bg-red-5 rounded-borders q-mt-sm q-mb-lg text-white text-justify">
                <div>
                  <q-btn class="q-mr-sm" @click="show_message_profile = false" push round size="xs" color="white" text-color="red-8" icon="fa-duotone fa-times fa-regular"></q-btn>
                  برای اطلاعات بیشتر میتوانید با کلیک روی تصویر یا اسم خدمات دهنده وارد پروفایل او شوید
                </div>
              </q-banner>
              <provider_single v-for="provider in providers.result" :provider="provider" :request_id="providers.request.id" class="q-mb-lg"></provider_single>
            </div>
          </template>

        </template>
      </q-card-section>

    </template>
    <q-dialog
        v-model="exists_dialog"
    >
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-center">
            <img src="assets/images/icons/searching-one.svg" width="220" alt="">
            <div>
              <strong>درحال حاضر درخواست فعالی با این مشخصات وجو دارد  برای مشاهده به قسمت درخواست ها بروید</strong>
            </div>
            <div class="text-center q-mt-md">
              <q-btn :to="{name : 'requests'}" rounded color="blue-8" class="font-13 q-pt-sm q-pb-sm" style="width: 100%" label="لیست درخواست ها"></q-btn>
            </div>
          </div>
          
        </q-card-section>
      </q-card>
    </q-dialog>

  </q-card>





</template>

<style scoped>




</style>