<script>
export default {
  name: "Provider_Implements",
  props: ['implements','user'],
  data(){
    return {
      show_message:true
    }
  }
}
</script>

<template>
  <template v-if="implements && user">
    <div v-if="!implements.length" class="text-center q-mt-xl">
      <img src="assets/images/icons/farmer_two.svg" width="250" alt="">
      <div class="text-red font-14">
        <strong class="text-grey-9">
          متاسفانه {{user.name}} عزیز،درحال حاظر خدماتی برای ارائه ندارد !
        </strong>
      </div>
    </div>
    <template v-else>
      <q-banner v-if="show_message" dense class="bg-teal-8 q-mt-sm q-mb-lg text-white text-justify" style="border-radius: 14px">
        <div>
          <q-btn class="q-mr-sm" @click="show_message = false" push round size="xs" color="white" text-color="red-8" icon="fa-duotone fa-times fa-regular"></q-btn>
          برای آشنایی کامل با ادوات و نحوه کارکرد آنها میتوانبد با کلیک روی تصویر اسم ادوات توضیحات را مشاهده نمایید
        </div>
      </q-banner>
      <div class="q-mt-md">
        <div v-for="implement in implements" class="q-mb-md implement-box">
          <div class="row">
            <div class="col-3">
              <img v-if="implement.implement.image" :src="implement.implement.image" class="implement-image">
              <img v-else src="assets/images/icons/gardening.svg" class="implement-image" alt="">
            </div>
            <div class="col-9">
              <div>
                <strong class="text-teal-8">{{implement.implement.name}}</strong>
                <span class="text-grey-10 float-right font-13">{{implement.implement.price_type}}</span>
                <span class="text-grey-8 float-right font-12 q-mr-xs">تومان</span>
                <strong class="float-right text-deep-purple-7 q-mr-sm">{{this.$filters.number_format(implement.price)}}</strong>
              </div>
              <div class="q-mt-sm">
                 <strong class="text-blue-5 font-13">{{implement.category.name}}</strong>
              </div>
            </div>
          </div>

        </div>
      </div>
    </template>
  </template>

</template>

<style scoped>
.implement-box{
  border-radius: 12px;
  padding: 14px 10px;
  border: 1px solid rgba(11, 24, 56, 0.3);
  margin-bottom: 20px;

}
.implement-image{
  border-radius: 8px;
  width: 55px;
  height: 55px;
}

</style>