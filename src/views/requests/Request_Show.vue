<script>
import {Stores_Requests} from "@/stores/requests/requests.js";
import {Stores_Searching} from "@/stores/searching/searching.js";
import Searching_Provider_Single from "@/views/searching/components/Searching_Provider_Single.vue";
import {useQuasar} from "quasar";

export default {
  name: "Request_Show",
  mounted() {
    this.Get_Request();
  },
  components: {
    'provider_single' : Searching_Provider_Single,
  },
  data(){
    return {
      $q: useQuasar(),
      loading:true,
      remove_loading:false,
      request : null,
      providers :[],
      requested_providers:[],
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

    }
  },
  methods :{
    Get_Request(){
      Stores_Requests().Requests_Show(this.$route.params.id).then(res=>{
        this.request = res.data.result;
        this.providers = res.data.result.search_result_decode;
        this.Get_Request_Users();
        this.loading = false;
      }).catch(error=>{

      })

    },
    Get_Request_Users(){

      this.requested_providers = [];
      Stores_Searching().Searching_Request_Users(this.request.id).then(res=>{
        this.requested_providers = res.data.result;
      }).catch(error=>{
        this.Methods_Notify_Error_Server();
      })

    },
    Remove_Request(){
      this.$q.dialog({
        title: 'آیا اطمینان دارید',
        message: 'درخواست خود را لغو کنید ؟',
        ok: {
          glossy: true,
          color : "green-7"
        },
        cancel: {
          glossy: true,
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        this.remove_loading = true;
        Stores_Requests().Requests_Cancel(this.request.id).then(res=>{
          this.Get_Request();
          this.Methods_Notify_Message_Success('درخواست مورد نظر با موفقیت لغو گردید')
          this.remove_loading = false;

        }).catch(error=>{
          this.Methods_Notify_Error_Server();
          this.remove_loading = false;
        })

        
      }).onCancel(() => {

      }).onDismiss(() => {

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
  computed :{
    Do_Filter(){
      if (this.filter_select === 'min_dis'){
        this.providers = this.SortByKey(this.providers,'dis','asc')
      }
      if (this.filter_select === 'max_dis'){
        this.providers = this.SortByKey(this.providers,'dis','desc')
      }
      if (this.filter_select === 'min_price'){
        this.providers = this.SortByKey(this.providers,'price','asc')
      }
      if (this.filter_select === 'max_price'){
        this.providers = this.SortByKey(this.providers,'price','desc')
      }
      if (this.filter_select === 'random'){
          this.providers = this.request.search_result_decode;
      }

    },
  }
}
</script>

<template>
  <q-card flat>
    <q-card-section class="row q-pb-xs">
      <div class="col-6 q-mt-xs">
        <strong class="text-teal-9 font-16 q-mt-xs">مدیریت درخواست </strong>
      </div>
      <div class="col-6 text-right">
        <q-btn :to="{name : 'requests'}" color="blue-grey-9" label="بازگشت" flat rounded icon-right="fa-duotone fa-regular fa-left"></q-btn>
      </div>
    </q-card-section>
    <q-separator/>
    <template v-if="loading">
      <global_loading_colorful  size="110" text="درحال دریافت اطلاعات درخواست"></global_loading_colorful>
    </template>
    <template v-else>
      <q-card-section class="animation-fade-in">
        <div class="text-center">
          <strong class="text-red-7 font-16">
            {{request.implement.name}}
          </strong>
        </div>
        <div class="row q-mt-md">
          <div class="col-6">
            <div>
              <q-icon name="fa-duotone  fa-farm" color="teal-7" size="22px"></q-icon>
              <span class="text-grey-8 q-ml-sm">زمین : </span>
              <strong>{{request.land.title}}</strong>
            </div>
            <div class="q-mt-lg">
              <q-icon name="fa-duotone  fa-square-dashed" color="teal-7" size="22px"></q-icon>
              <span class="text-grey-8 q-ml-sm">مساحت کار : </span>
              <strong>{{request.area}}</strong>
              <span class="q-ml-xs">متر</span>
            </div>
            <div class="q-mt-lg">
              <q-icon name="fa-duotone  fa-dollar" color="teal-7" size="22px"></q-icon>
              <span class="text-grey-8 q-ml-sm">هزینه کار : </span>
              <template v-if="!request.price">
                <strong>ثبت نشده</strong>
              </template>
              <template v-else>
                <strong>{{request.area}}</strong>
                <span class="q-ml-xs">تومان</span>
              </template>

            </div>
          </div>
          <div class="col-6">
            <div>
              <q-icon name="fa-duotone  fa-info-circle" color="teal-7" size="22px"></q-icon>
              <span class="text-grey-8 q-ml-sm">وضعیت : </span>
              <strong v-if="request.status === 'pending'">در انتظار</strong>
              <strong v-if="request.status === 'canceled'">لغو شده</strong>
            </div>
            <div class="q-mt-lg">
              <q-icon name="fa-duotone fa-calendar-days" color="teal-7" size="22px"></q-icon>
              <span class="text-grey-8 q-ml-sm">ت درخواست : </span>
              <strong>{{this.$filters.date_jalali(request.created_at,'jYYYY/jM/jD')}}</strong>
            </div>
            <div class="q-mt-lg">
              <q-icon name="fa-duotone fa-user" color="teal-7" size="22px"></q-icon>
              <span class="text-grey-8 q-ml-sm">کاربر : </span>
              <template v-if="request.provider">

              </template>
              <template v-else>
                <strong v-if="request.status === 'pending' || request.status === 'working'">
                  در انتظار ...
                </strong>
                <strong v-if="request.status === 'canceled'">
                  لغو شده
                </strong>
              </template>

            </div>
          </div>
          <div class="col-12 text-center">
            <q-btn v-if="request.status === 'pending' || request.status === 'working'" class="q-pt-sm q-pb-sm" @click="Remove_Request" :loading="remove_loading"  color="red-7" label="لغو درخواست" icon="fa-duotone fa-regular fa-trash-can-xmark" rounded style="width: 100%;margin-top: 30px"></q-btn>
            <q-banner  style="border-radius: 20px" class="bg-orange-10 q-mt-lg rounded-borders " v-if="request.status === 'canceled'">
              <q-icon name="fa-duotone fa-hexagon-minus fa-regular" color="white" size="28px"></q-icon>
              <strong class="text-white q-ml-sm">این درخواست لغو شده است</strong>
            </q-banner>
          </div>
        </div>
        <q-separator class="q-mt-lg q-mb-lg"/>
        <template v-if="request.status === 'pending'">
          <div class="text-center">
            <strong class="text-indigo-10 font-15">
              خدمات دهندگان در انتظار تایید
            </strong>
          </div>
          <div class="q-mt-md" >
            <strong class="text-red-8 font-13">مرتب سازی نتایج بر اساس :</strong>
            <div class="q-mt-sm" >
              <q-select
                  outlined
                  rounded
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

          <div class="q-mt-lg">
            <provider_single :requested="requested_providers" @Requested="Get_Request_Users" v-for="provider in providers" :provider="provider" :request_id="request.id" class="q-mb-lg"></provider_single>

          </div>
        </template>
      </q-card-section>
    </template>
  </q-card>
</template>

<style scoped>

</style>