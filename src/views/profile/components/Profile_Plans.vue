<script>
import {Stores_Plans} from "@/stores/plans/plans.js";

export default {
  name: "Profile_Plans",
  mounted () {
    this.User_Plan_Active();
    this.Get_Items();

  },
  data(){
    return {
      active_plan : null,
      active_plan_loading : false,
      loading : false,
      items : null,

    }
  },
  methods:{
    User_Plan_Active(){
      Stores_Plans().Active().then(res=> {
        if (res.data.result.id){
          this.active_plan = res.data.result;
        }
        this.active_plan_loading = false;
      }).catch(error=>{
        this.Methods_Notify_Error_Server();
      })

    },
    Get_Items (){
      Stores_Plans().Own().then((res=> {
        this.items = res.data.result;
        this.loading = false;
      })).catch(error=>{
        this.Methods_Notify_Error_Server();
      })

    }
  }
}
</script>

<template>
  <q-card flat>
    <q-card-section class="animation-fade-in q-px-xs">
      <q-separator class="q-mb-md"/>
      <div class="text-center">
        <strong class="text-red font-15">تاریخچه اشتراک های من</strong>
      </div>
      <div class="q-mt-sm">
        <div class="active-plan-box animation-fade-in">
          <div class="text-center">
            <strong class="text-grey-7 active-plan-title">اشتراک فعال من </strong>
          </div>
          <global_loading_colorful v-if="active_plan_loading" size="90"></global_loading_colorful>
          <template v-else>
            <template v-if="active_plan">
              <div class="text-center q-mt-md">
                <div class="">
                  <strong class="text-indigo font-15">{{active_plan.title}}</strong>
                </div>
                <div class="q-mt-xs row q-gutter-sm justify-center">
                  <q-chip color="green-7" size="sm" text-color="white" class="font-13">شروع :
                    {{ this.$filters.date_jalali(active_plan.start_at,'jYYYY/jM/jD') }}
                  </q-chip>
                  <q-chip color="red-8" size="sm" text-color="white" class="font-13">پایان :
                    {{ this.$filters.date_jalali(active_plan.end_at,'jYYYY/jM/jD') }}
                  </q-chip>
                </div>
                <div class="q-mt-md">
                  <strong> <span class="text-red-8">{{active_plan.days}}</span> روز باقی مانده تا پایان اشتراک شما</strong>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="text-center q-mt-sm no-plan-text">
                <strong>اشتراکی برای شما فعال نیست <br> برای استفاده کامل از خدمات پرگولا اشتراک ویژه تهیه کنید</strong>
              </div>
              <div class="q-mt-md text-center">
                <q-btn :to="{name : 'plans'}" color="purple-6" label="دریافت اشتراک ویژه" rounded icon="fa-duotone fa-stars fa-light"></q-btn>
              </div>

            </template>
          </template>

        </div>
      </div>
    </q-card-section>
  </q-card>



</template>

<style scoped>

.active-plan-box{
  padding: 18px 10px;
  border-radius: 7px;
  background: rgba(110,21,140,0.07);
}
.active-plan-title{
  font-size: 17.5px;
}
.no-plan-text{
  font-size: 14px;
  line-height: 25px;
}
.down-icon{
  font-size: 35px;
}
@media only screen and (max-width: 768px) {

  .active-plan-title{
    font-size: 14.5px;
  }
  .no-plan-text{
    font-size: 13px;
    line-height: 22px;
  }
  .down-icon{
    font-size: 26px;
  }
}
</style>