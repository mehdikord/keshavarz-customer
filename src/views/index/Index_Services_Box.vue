<script>
export default {
  name: "Index_Services_Box"
}
</script>

<template>
  <div class="row">
    <div class="col-md-3 col-sm-12 col-xs-12 q-px-xs q-mb-md">
      <router-link :to="{name :'services_coloring'}">
        <div class="service-box bg-teal-7 glossy ">
          <q-icon name="fa-duotone fa-light fa-palette" class="service-icon" color="white"></q-icon>
          <strong class="float-right text-white service-title">هوش مصنوعی رنگ مو</strong>
        </div>
      </router-link>
    </div>
    <div class="col-md-3 col-sm-12 col-xs-12 q-px-xs q-mb-md">
      <div class="service-box bg-blue-7 glossy">
        <q-icon name="fa-duotone fa-solid fa-book-open-cover" class="service-icon" color="white"></q-icon>
        <strong class="float-right text-white service-title">اصطلاحات رنگ و مو</strong>
      </div>
    </div>
    <div class="col-md-3 col-sm-12 col-xs-12 q-px-xs q-mb-md">
      <div class="service-box bg-deep-orange-6 glossy">
        <q-icon name="fa-duotone fa-light fa-face-viewfinder" class="service-icon" color="white"></q-icon>
        <strong class="float-right text-white service-title">آنالیز چهره شما</strong>
      </div>
    </div>
    <div class="col-md-3 col-sm-12 col-xs-12 q-px-xs q-mb-md">
      <div class="service-box bg-deep-purple-6 glossy">
        <q-icon name="fa-duotone fa-light fa-paintbrush" class="service-icon" color="white"></q-icon>
        <strong class="float-right text-white service-title">کارخانه رنگ</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-box{
  padding: 15px 15px;
  border-radius: 20px;
}
.service-icon{
  font-size: 42px;
}
.service-title{
  font-size: 15px;
  margin-top: 8px;
}
@media only screen and (max-width: 768px) {
  .service-box{
    padding: 20px 15px;
    border-radius: 20px;
  }
  .service-icon{
    font-size: 34px;
  }
  .service-title{
    font-size: 14px;

  }
}

</style>