<script>
import {Stores_Requests} from "@/stores/requests/requests.js";
import Request_Item from "@/views/requests/components/Request_Item.vue";

export default {
  name: "Requests_Working",
  components: {
    'request_item' : Request_Item,
  },
  mounted() {
    this.Get_Items();
  },
  data(){
    return {
      loading:true,
      items : [],
    }
  },
  methods :{
    Get_Items(){
      Stores_Requests().Requests_Canceled().then(res=>{
        this.items = res.data.result;
        console.log(this.items);
        this.loading=false;
      }).catch(error=>{
        this.Methods_Notify_Error_Server()
        this.loading=false;
      })

    }
  }
}
</script>

<template>
  <q-card flat class="animation-fade-in">
    <q-card-section class="q-pt-sm">
      <div class="text-center">
        <strong class="text-red-9 font-16">درخواست های لغو شده </strong>
      </div>
      <div class="text-center text-grey-9 q-mt-sm">
        برای مدیریت کامل و مشاهده جزئیات روی اسم آن کلیک کنید
      </div>
    </q-card-section>
    <q-card-section class="q-px-xs q-pt-sm">
      <global_loading_colorful v-if="loading" size="110" text="درحال دریافت درخواست ها"></global_loading_colorful>
      <template v-else>
        <template v-if="items.length < 1">
          <div class="text-center">
            <img src="assets/images/icons/no-data.svg" width="320" alt="">
            <div>
              <strong class="text-red">شما درحال حاضر هیج درخواست لغو شده ای ندارید !</strong>
            </div>
            <div class="text-center q-mt-md">
              <q-btn color="teal-7" label=" درخواست خدمات" rounded icon="fa-duotone fa-light fa-search"></q-btn>
            </div>
          </div>
        </template>
        <template v-else>
          <div v-for="item in items" :key="item.id">
            <request_item class="q-mb-lg" :request="item"></request_item>
          </div>

        </template>
      </template>
    </q-card-section>
  </q-card>
</template>

<style scoped>

</style>