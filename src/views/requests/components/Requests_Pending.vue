<script>
export default {
  name: "Requests_Pending",
  data(){
    return {
      loading:false,
      items : [],
    }
  }
}
</script>

<template>
  <q-card flat class="animation-fade-in">
    <q-card-section class="q-pt-sm">
      <div class="text-center">
        <strong class="text-teal-9 font-16">درخواست های درانتظار خدمات دهنده</strong>
      </div>
    </q-card-section>
    <q-card-section>
      <global_loading_colorful v-if="loading" size="110" text="درحال دریافت درخواست ها"></global_loading_colorful>
      <template v-else>
        <template v-if="items.length < 1">
          <div class="text-center">
            <img src="assets/images/icons/no-data.svg" width="320" alt="">
            <div>
              <strong class="text-red">شما درحال حاضر هیج درخواست درانتظاری ندارید !</strong>
            </div>
            <div class="text-center q-mt-md">
              <q-btn color="teal-7" label=" درخواست خدک" icon="fa-duotone fa-light fa-search"></q-btn>
            </div>
          </div>
        </template>
        <template v-else>

        </template>


      </template>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>