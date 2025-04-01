<script>
export default {
  name: "Splash",
  data() {
    return {
      slide: 1,
    }
  },
  methods: {
    Start_App(){
      localStorage.setItem('keshavarz_customers_splash','done');
      location.reload()
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div class="">
      <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="teal"
          navigation
          padding
          arrows
          style="height: 90vh"
        
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <div class="text-center">
            <img src="assets/images/splash/spalsh-one.svg" width="300" alt="">
            <div>
              <strong class="font-lalezar font-34 font-weight-100">کشاورز</strong>
            </div>
            <div class="q-mt-md">
              <strong class="text-grey-9">
                همراه همیشگی کشاورزان در کاشت ، داشت و برداشت
              </strong>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <div class="text-center">
            <img src="assets/images/splash/splash-two.svg" width="300" alt="">
            <div>
              <strong class="font-lalezar font-28 font-weight-100">دریافت خدمات کشاورزی</strong>
            </div>
            <div class="q-mt-md">
              <strong class="text-grey-9">
                جستجو و دریافت ادوات و خدمات کشاورزی در سریع ترین زمان ممکن
              </strong>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center">
          <div class="text-center">
            <img src="assets/images/splash/splash-three.svg" width="300" alt="">
            <div>
              <strong class="font-lalezar font-28 font-weight-100">مدیریت کارها</strong>
            </div>
            <div class="q-mt-md">
              <strong class="text-grey-9">
                مدیریت کامل مزارع و خدمات استفاده شده برای آن ها و امور مالی
              </strong>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-center">
          <div class="text-center">
            <img src="assets/images/splash/splash-four.svg" width="300" alt="">
            <div>
              <strong class="font-lalezar font-28 font-weight-100">آنالیز با هوش مصنوعی</strong>
            </div>
            <div class="q-mt-md">
              <strong class="text-grey-9">
                بررسی وضعیت مزرعه و محصول شما توسط هوش مصنوعی برای ارائه بهترین روش ها برای محصولی بهتر
              </strong>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="5" class="column no-wrap flex-center">
          <div class="text-center">
            <img src="assets/images/splash/svg-five.svg" width="300" alt="">
            <div>
              <strong class="font-lalezar font-28 font-weight-100">اخبار بروز کشاورزی</strong>
            </div>
            <div class="q-mt-md">
              <strong class="text-grey-9">
                اطلاع از بروزترین خبرهای حوزه کشاورزی
              </strong>
              <div class="q-mt-xl">
                <q-btn @click="Start_App" style="width: 100%;" color="teal" rounded label="شروع کار با کشاورز " class="q-pt-sm q-pb-sm font-16 font-weight-600"></q-btn>
              </div>
            </div>
          </div>
        </q-carousel-slide>

      </q-carousel>
    </div>
  </div>
</template>

<style scoped>

</style>