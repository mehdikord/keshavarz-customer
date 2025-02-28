<script>
export default {
  name: "About"
}
</script>

<template>
 <q-card flat >
  <q-card-section >
    <div class=" text-center q-mt-sm res-page-title font-lalezar text-pink-6 animation-fade-in">
      درباره تیم پرگولا
    </div>
  </q-card-section>
   <q-card-section class="animation-fade-in q-pt-xs">
     <div class="about-short text-center">
       لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
     </div>
     <div class="q-mt-xl text-center">
       <img src="assets/images/background/team.svg" class="img-bg" alt="">
     </div>
     <div class="q-mt-lg about-short text-center">
       لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته،
     </div>
   </q-card-section>

 </q-card>


</template>

<style scoped>
.about-short{
  font-size: 16px;
}
.img-bg{
  width: 450px;
}
@media only screen and (max-width: 768px) {
  .about-short{
    font-size: 14px;
  }
  .img-bg{
    width: 300px;
  }
}
</style>