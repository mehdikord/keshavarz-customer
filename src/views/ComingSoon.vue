<script>
export default {
name: "ComingSoon"
}
</script>

<template>
  <div class="q-mt-lg" style="margin-top: 100px">
    <div class=" text-center">
      <img class="logo-image" src="assets/images/icons/logo.png" alt="">
    </div>
    <div class="text-center">
      <img src="assets/images/background/comingsoon.svg" class="image" alt="">
      <div class="q-mt-lg">
        <strong class="text-grey-8 font-24 font-lalezar font-weight-100">پرگولا در دست ساخت است ... !</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>

.image{
  width: 420px;
}
.logo-image{
  width: 340px;
}
@media only screen and (max-width: 768px) {
  .image{
    width: 100%;
  }
  .logo-image{
    width: 260px;
  }
}


</style>