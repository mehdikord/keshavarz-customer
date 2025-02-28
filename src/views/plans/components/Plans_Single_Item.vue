<script>
import {Stores_Auth} from "@/stores/auth/auth.js";

export default {
  name: "Plans_Single_Item",
  methods: {Stores_Auth},
  props:['plan'],
  data(){
    return {
      dialog_buy:false
    }
  }

}
</script>

<template>
  <div @click="dialog_buy=true" v-if="plan" class="item-box animation-fade-in row cursor-pointer">
    <div class="col-md-2 col-sm-3 col-xs-3 bg-pink-6 item-padding text-center">
      <q-icon name="fa-duotone fa-light fa-circle-star" class="plan-icon" color="white"></q-icon>
    </div>
    <div class="col-md-10 col-sm-9 col-xs-9 q-px-md q-pt-sm">
      <div class="plan-title text-dark">
        {{plan.name}}
        <strong class="float-right plan-price text-purple-8 q-mt-md">{{this.$filters.number_format(plan.price)}} <span class="plan-currency text-grey-8">تومان</span>  </strong>
      </div>
      <div class="plan-subtitle text-grey-8 q-mt-xs">
        {{plan.access}} ماه دسترسی نامحدود
      </div>
    </div>
  </div>
  <q-dialog
      v-model="dialog_buy"
      position="top"
  >
    <q-card style="width: 100%">
      <q-card-section class="text-center">
        <label class="text-pink-8 font-16"><strong>خرید اشتراک ویژه پرگولا</strong></label>
      </q-card-section>
      <q-separator/>

      <q-card-section v-if="Stores_Auth().AuthGetCheckAuth">
        <div>
          <span class="text-grey-8">نام اشتراک : </span><strong class="q-ml-sm">{{plan.name}}</strong>
        </div>
        <q-separator class="q-mt-md q-mb-md"/>
        <div>
          <span class="text-grey-8">مبلغ قابل پرداخت : </span><strong class="q-ml-sm text-teal-6 font-16">{{this.$filters.number_format(plan.price)}}</strong><span class="text-grey-10 q-ml-sm">تومان</span>
        </div>
        <q-separator class="q-mt-md q-mb-md"/>
        <div>
          <span class="text-grey-8">نوع و درگاه پرداخت : </span><strong class="q-ml-sm">آنلاین / <strong class="text-yellow-10"> زرین پال </strong></strong>
        </div>
        <q-separator class="q-mt-md q-mb-md"/>
        <div>
          <span class="text-grey-8">توضیحات: </span><strong class="q-ml-sm">{{plan.description}}</strong>
        </div>
      </q-card-section>
      <q-card-section v-else>
        <div class="text-center q-mt-md">
          <img class="bg-image" src="assets/images/background/login_need.svg" alt="">
          <div class="q-mt-sm">
            <strong>
              برای خرید اشتراک ابتدا باید وار حساب کاربری خود شوید
            </strong>
          </div>
          <div class="q-mt-md">
            <q-btn :to="{name : 'auth'}" class="auth-btn" color="pink-7" glossy rounded size="sm" label="ورود / ثبت نام در پرگولا"></q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-mb-sm q-px-md q-mt-sm">
        <q-btn v-if="Stores_Auth().AuthGetCheckAuth" size="sm" class="submit-btn" color="pink-8"  rounded glossy label="خرید اشتراک" icon="fa-duotone fa-solid fa-check-circle" />
        <q-btn size="sm" class="submit-btn" color="grey-8"  rounded glossy label="بستن" icon="fa-duotone fa-solid fa-times-circle" v-close-popup />
      </q-card-actions>

    </q-card>
  </q-dialog>


</template>

<style scoped>
.item-padding{
  padding: 18px;
  border-bottom-left-radius: 12px;
  border-top-left-radius: 12px;
}
.item-box {
  background-color: rgba(12, 57, 103, 0.09);
  border-radius: 12px;
}
.plan-title {
  font-size: 17px;
  font-weight: 800;
}
.plan-subtitle {
  font-size: 15px;
}
.plan-icon{
  font-size: 40px;
}
.plan-price{
  font-size: 20px;
  font-weight: 800 !important;
}
.plan-currency{
  font-size: 13px;
}
.submit-btn{
  font-size: 14px !important;
}
.bg-image{
  width: 250px !important;
}
.auth-btn{
  font-size: 15px !important;
}
@media only screen and (max-width: 768px) {
  .item-padding{
    padding: 18px;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;
  }
  .item-box {
    background-color: rgba(12, 57, 103, 0.09);
    border-radius: 12px;
  }
  .plan-title {
    font-size: 15px;
    font-weight: 800;
  }
  .plan-subtitle {
    font-size: 12px;
  }
  .plan-icon{
    font-size: 35px;
  }
  .plan-price{
    font-size: 17px;
    font-weight: 800 !important;
  }
  .plan-currency{
    font-size: 11px;
  }
  .submit-btn{
    font-size: 12px !important;
  }
  .bg-image{
    width: 200px !important;
  }
  .auth-btn{
    font-size: 14px !important;
  }
}
</style>