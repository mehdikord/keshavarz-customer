<script>
import {Stores_Requests} from "@/stores/requests/requests.js";

export default {
  name: "Index_Requests",
  mounted() {
    this.Get_Requests();
  },
  data(){
    return {
      loading:true,
      items:[]
    }
  },
  methods:{
    Get_Requests(){
      Stores_Requests().Requests_Actives().then(res=>{
        this.items=res.data.result;
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
  <q-card square flat class=" bg-card">
    <q-card-section class="text-center">
      <strong class="text-white font-16">وضعیت درخواست ها</strong>
    </q-card-section>
    <q-card-section class="q-pt-xs q-px-xs">
      <div class="text-center">
        <template v-if="loading">
          <global_loading_colorful size="100"></global_loading_colorful>
        </template>
        <template v-else>
          <template v-if="items.length < 1">
            <div class="animation-fade-in">
              <img src="assets/images/icons/sad.svg" width="50" alt="">
              <div class="text-center q-mt-sm text-white">
                هیچ درخواست فعالی یافت نشد !
              </div>
              <q-btn :to="{name : 'searching'}" class="q-mt-sm" glossy color="teal-7" rounded label="درخواست خدمات"></q-btn>
            </div>
          </template>
          <template v-else>
            <div v-for="item in items">
              <router-link :to="{name: 'requests_show', params: {id: item.id}}">
                <div class="item-box row text-left q-mb-md animation-fade-in">
                  <div class="col-2">
                    <img src="assets/images/icons/gardening.svg" width="55" alt="">
                  </div>
                  <div class="col-10 q-pl-xs">
                    <div>
                      <strong class="text-green-13 font-15">{{item.implement.name}}</strong>
                      <strong class="float-right text-white q-ml-sm">
                        <template v-if="item.status === 'pending'">
                          <q-icon name="fa-duotone fa-light fa-spinner fa-spin" color="white" size="16px"></q-icon>
                          <strong class="text-white q-ml-sm">در انتظار ...</strong>
                        </template>
                        <template v-if="item.status === 'working'">
                          <strong class="text-white q-ml-sm">در حال انجام</strong>

                        </template>
                      </strong>
                      <span class="float-right text-yellow-13">وضعیت : </span>
                    </div>
                    <div class="q-mt-md">
                      <span class="text-yellow-13">مزرعه : </span>
                      <strong class="text-white">{{item.land.title}}</strong>
                      <strong class="float-right text-grey-4 q-ml-sm">{{this.$filters.date_jalali(item.created_at,'jYYYY/jM/jD')}}</strong>
                      <span class="float-right text-yellow-13">تاریخ : </span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </template>
        </template>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.bg-card{
  background-color: rgba(31, 43, 80, 0.98) !important;
}
.item-box{
  border-radius: 20px;
  padding: 12px 10px;
  border: 1px dashed rgba(255, 255, 255, 0.38);
}
</style>