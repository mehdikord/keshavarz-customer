<script>

import {Stores_Auth} from "@/stores/auth/auth.js";
import {Stores_Plans} from "@/stores/plans/plans.js";
import Plans_Single_Item from "@/views/plans/components/Plans_Single_Item.vue";

export default {
  name: "Plans",
  components: {
    'plan_single' : Plans_Single_Item,
  },
  mounted() {
    if (Stores_Auth().AuthGetCheckAuth){
      this.User_Plan_Active();
    }
    this.Get_All_Plans();

  },
  data() {
    return {
      active_plan_loading: true,
      active_plan: null,
      plans_loading: true,
      plans:[],


    }
  },
  methods: {
    Stores_Auth,
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
    Get_All_Plans(){
      Stores_Plans().All().then(res=> {
        this.plans = res.data.result;
        this.plans_loading = false;
      }).catch(error=>{
        this.Methods_Notify_Error_Server();
      })
    }
  }
}


</script>

<template>
  <q-card flat >
    <q-card-section>
      <div class="text-center title-text font-lalezar text-pink-6 animation-fade-in">
        اشتراک ویژه پرگولا
      </div>
       <div class="q-mt-sm text-center">
         <q-btn size="sm" outline color="deep-purple" label="چرا اشتراک ویژه ؟" rounded class="font-11"></q-btn>
       </div>
    </q-card-section>
    <q-card-section class="q-pt-xs" v-if="Stores_Auth().AuthGetCheckAuth">
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
              <strong>اشتراکی برای شما فعال نیست <br> برای استفاده کامل از خدمات پرگولا ابتدا اشتراک مورد نظر خود را انتخاب کنید</strong>
            </div>
            <div class="text-center q-mt-sm q-mb-xs">
              <q-icon name="fa-duotone fa-regular fa-down-long fa-bounce" color="teal-8" class="down-icon" style="--fa-animation-duration: 1.2s;"></q-icon>
            </div>
          </template>
        </template>

      </div>
    </q-card-section>
    <q-card-section>
      <global_loading_colorful v-if="plans_loading" size="85" text="درحال دریافت لیست اشتراک ها"></global_loading_colorful>
      <div class="row">
        <div v-for="plan in plans" class="col-md-6 col-sm-12 col-xs-12 q-px-sm q-mb-md">
          <plan_single :plan="plan" class="q-mb-md"></plan_single>
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>

<style scoped>
.title-text{
  font-size: 45px;
}
.subtitle-text{
  font-size: 17px;
}
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
  .title-text{
    font-size: 30px;
  }
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
