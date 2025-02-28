<script>
import {Stores_Profile} from "@/stores/profile/profile.js";

export default {
  name: "Profile_Invoices",
  mounted () {

      this.Get_Item()
  },
  data(){
    return {
      loading:true,
      item:null,
    }
  },
  methods:{
    Get_Item(){
      Stores_Profile().Invoices_Show(this.$route.params.id).then(res=>{
        this.item = res.data.result;
        this.loading=false;
      }).catch(err=>{
        this.Methods_Notify_Error_Server();
      })
    },
  }
}
</script>

<template>
  <q-card flat>
    <q-card-section class="animation-fade-in q-px-xs">
      <q-separator class="q-mb-md"/>
      <div class="q-mb-xl">
        <strong class="text-red font-14">مشاهده جزئیات پرداخت</strong>
        <router-link :to="{name : 'profile_invoices'}">
          <strong class="text-blue-8 float-right font-14">
            بازگشت
            <q-icon name="fa-duotone fa-left fa-regular" size="18px"></q-icon>
          </strong>
        </router-link>
      </div>
      <div class="q-mt-md">
        <global_loading_colorful v-if="loading" size="75" text="درحا دریافت اطلاعات"></global_loading_colorful>
        <template v-else>
          <div class="q-mt-lg q-px-sm">
            <div>
              <span>ID : </span>
              <strong class="float-right" dir="ltr"># {{item.id}}</strong>
            </div>
            <q-separator class="q-mt-md q-mb-md"/>
            <div>
              <span>مبلغ پرداختی : </span>
              <strong class="float-right text-teal-7">{{this.$filters.number_format(item.amount)}} <span class="text-grey-8 font-12">تومان</span></strong>
            </div>
            <q-separator class="q-mt-md q-mb-md"/>
            <div>
              <span>وضعیت پرداخت : </span>
              <template v-if="item.is_paid">
                <strong class="float-right text-green-6 font-13"><q-icon name="fa-duotone fa-regular fa-check" color="green-8" size="18px"></q-icon> پرداخت شده </strong>
              </template>
              <template v-else>
                <strong class="float-right text-red-6 font-13"><q-icon name="fa-duotone fa-regular fa-times" color="red-8" size="18px"></q-icon> پرداخت نشده </strong>
              </template>

            </div>
            <q-separator class="q-mt-md q-mb-md"/>
            <div>
              <span>تاریخ ثبت : </span>
              <strong class="float-right text-dark font-13">{{this.$filters.date_jalali(item.created_at,'jYYYY/jM/jD')}}</strong>
            </div>
            <template v-if="item.paid_at">
              <q-separator class="q-mt-sm q-mb-sm"/>
              <div>
                <span>تاریخ پرداخت : </span>
                <strong class="float-right text-dark font-13">{{this.$filters.date_jalali(item.paid_at,'jYYYY/jM/jD')}}</strong>
              </div>
            </template>
            <q-separator class="q-mt-md q-mb-md"/>
            <div>
              <span>شماره پیگری بانکی : </span>
              <strong class="float-right text-dark font-13">{{item.ref_id}}</strong>
            </div>
            <q-separator class="q-mt-md q-mb-md"/>
            <div>
              <span>روش پرداخت : </span>
              <strong class="float-right text-indigo font-14">آنلاین</strong>
            </div>
            <q-separator class="q-mt-md q-mb-md"/>
            <div>
              <span>درگاه پرداخت : </span>
              <strong class="float-right text-yellow-10 font-14">ذرین پال</strong>
            </div>
            <q-separator class="q-mt-md q-mb-md"/>
            <div>
              <span>توضیحات : </span>
              <span class=" text-grey-9 q-ml-sm font-14">{{item.description}} </span>
            </div>

          </div>
          <div class="q-mt-lg text-center">
            <q-btn color="teal-8" rounded label="پرینت فاکتور" icon="fa-duotone fa-light fa-print"></q-btn>
          </div>
        </template>
      </div>

    </q-card-section>
  </q-card>

</template>

<style scoped>
.item-box{
  padding:12px 12px ;
  border-radius: 7px;
  border: 1px dashed rgba(102, 103, 103, 0.8);
  background-color: rgba(0,0,0,0.03);
}

</style>