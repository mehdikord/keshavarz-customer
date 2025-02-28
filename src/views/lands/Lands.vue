<script>
import {Stores_Auth} from "@/stores/auth/auth.js";

export default {
  name: "Lands",
  methods: {
    Stores_Auth,


  }

}
</script>

<template>

  <template v-if="!Stores_Auth().AuthGetCheckAuth">

    <div class="q-mt-xl q-px-sm">
      <div class="text-center">
        <img src="assets/images/background/auth-need.svg" width="300" alt="">
        <div class="q-mt-xs">
          <strong class="font-13 text-red">برای مشاهده لیست زمین های خود ابتدا باید وارد حساب کاربری خود شوید  </strong>
        </div>
        <div class="text-center q-mt-lg">
          <q-btn :to="{name : 'auth'}" class="q-py-sm" color="teal-8" rounded label="ثبت نام / ورود به حساب کاربری"></q-btn>
        </div>
      </div>
    </div>

  </template>
  <template v-else>
    <q-card flat>
      <q-card-section>
        <div class="q-mt-md text-center">
          <strong class="text-teal-9 font-15">لیست زمین های من</strong>
          <div class="q-mt-sm font-13 text-grey-9">
            در این قسمت شما میتوانید لیست زمین های کشاوزی خود را برای مدیریت و دریافت خدمات بهتر اضافه کنید
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-sm">
        <div class="text-center">
          <q-btn class="q-py-sm q-px-xl" rounded color="teal-7" icon="fa-duotone fa-square-plus fa-regular" label="افزودن زمین جدید"></q-btn>
        </div>
        <q-separator class="q-mt-md q-mb-md"/>
        <div v-for="i in 3" class="item-box q-mb-md">
          xcvxcvxcv
        </div>
      </q-card-section>
    </q-card>


  </template>
</template>

<style scoped>

.item-box{
  padding: 15px 5px;
  border-radius: 8px;
  border: 1px dashed rgba(0,0,0,0.15);
  background-color: rgba(0,0,0,0.05);

}



</style>