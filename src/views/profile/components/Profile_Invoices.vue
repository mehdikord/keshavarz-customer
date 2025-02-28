<script>
import {Stores_Profile} from "@/stores/profile/profile.js";

export default {
  name: "Profile_Invoices",
  mounted () {
    if (this.$route.name === 'profile_invoices'){
      this.Get_Items()
    }
    if (this.$route.name === 'profile_invoices_show'){
      this.Get_Item()
    }


  },
  data(){
    return {
      loading:true,
      items:[],
      item:null,
      delete_loading:[],
    }
  },
  methods:{
    Get_Items(){
      Stores_Profile().Invoices_Get().then(res=>{
        this.items = res.data.result;
        this.loading=false;
      }).catch(err=>{
        this.Methods_Notify_Error_Server();
      })

    },
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
      <div class="text-center">
        <strong class="text-red font-15">لیست پرداخت ها</strong>
      </div>
      <div class="q-mt-md">
        <global_loading_colorful v-if="loading" size="75" text="درحا دریافت اطلاعات"></global_loading_colorful>
        <template v-else>
          <div class="row">
            <div v-for="item in items" class="col-xs-12 col-sm-12 q-px-sm q-mb-lg">
              <div class="item-box">
                <div>
                  <span>مبلغ : </span>
                  <strong class="float-right text-teal-7">{{this.$filters.number_format(item.amount)}} <span class="text-grey-8 font-12">تومان</span></strong>
                </div>
                <q-separator class="q-mt-sm q-mb-sm"/>
                <div>
                  <span>وضعیت پرداخت : </span>
                  <template v-if="item.is_paid">
                    <strong class="float-right text-green-6 font-13"><q-icon name="fa-duotone fa-regular fa-check" color="green-8" size="18px"></q-icon> پرداخت شده </strong>
                  </template>
                  <template v-else>
                    <strong class="float-right text-red-6 font-13"><q-icon name="fa-duotone fa-regular fa-times" color="red-8" size="18px"></q-icon> پرداخت نشده </strong>
                  </template>

                </div>
                <q-separator class="q-mt-sm q-mb-sm"/>
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
                <div class="q-mt-sm text-center">
                  <router-link :to="{name : 'profile_invoices_show',params : {id : item.id}}">
                    <strong class="text-blue-8">جزئیات کامل</strong>
                  </router-link>
                </div>
              </div>
            </div>
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