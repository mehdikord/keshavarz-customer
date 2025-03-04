<script>
import {Stores_Auth} from "@/stores/auth/auth.js";
import {Stores_Lands} from "@/stores/lands/lands.js";
import Global_Map_Satelite from "@/components/global/map/Global_Map_Satelite.vue";
import { useQuasar} from 'quasar'

export default {
  name: "Lands",
  components:{
    'map_satelite' : Global_Map_Satelite,
  },
  mounted() {
    this.Get_Items()
  },
  data(){
    return {
      $q: useQuasar(),
      dialog_add:false,
      add_items:{
        title:null,
        description:null,
        area : null,
        location : null,
      },
      items:[],
      loading:true,
      add_loading:false,
      remove_loading:[],
      errors:[],
    }
  },
  methods: {
    Stores_Auth,
    Get_Items(){
      Stores_Lands().Index().then(res=>{
        this.items=res.data.result;
        this.loading=false;
      }).catch(error=>{

      })
    },
    Add_Item(){
      this.add_loading=true;
      Stores_Lands().Store(this.add_items).then(res=>{
        this.items.unshift(res.data.result);
        this.add_loading=false;
        this.dialog_add=false;
        this.Methods_Notify_Message_Success('تبریک ، زمین جدید شما با موفقیت اضافه شد')
        this.errors=[];
      }).catch(error=>{
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.add_loading=false;

      })
    },
    Remove_Item(id){
      this.$q.dialog({
        title: 'آیا اطمینان دارید',
        message: 'زمین مورد نظر حذف شود ؟',
        ok: {
          glossy: false,
          rounded:true,
          color : "green-7"
        },
        cancel: {
          glossy: false,
          rounded:true,
          color: 'red-7'
        },
        persistent: true
      }).onOk(() => {
        this.remove_loading[id]=true;
        Stores_Lands().Remove(id).then(res=>{
          this.Methods_Notify_Delete();
          this.items = this.items.filter(item=>{return item.id!==id;});
        }).catch(error=>{
          this.Methods_Notify_Error_Server();
          this.remove_loading[id]=false;
        })
      }).onCancel(() => {

      }).onDismiss(() => {

      })
    },
    handleLocationUpdate(coordinates) {
      this.add_items.location = coordinates;
    }

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
        <div class="q-mt-sm text-center">
          <strong class="text-teal-9 font-16">لیست زمین های من</strong>
          <div class="q-mt-md font-13 text-grey-9">
            در این قسمت شما میتوانید لیست زمین های کشاوزی خود را برای مدیریت و دریافت خدمات بهتر اضافه کنید
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-sm animation-fade-in">
        <div class="text-center">
          <q-btn @click="dialog_add=true" class="q-py-sm q-px-xl" rounded color="teal-8" icon="fa-duotone fa-square-plus fa-light" label="افزودن زمین (مزرعه) جدید"></q-btn>
          <q-dialog
              v-model="dialog_add"
              position="top"
          >
            <q-card style="width: 100%">
              <q-card-section class="row items-center q-pb-none">
                <div>
                  <strong class="text-teal-7 font-15">افزودن زمین جدید</strong>
                </div>
                <q-space />
                <q-btn icon="fa-duotone fa-times fa-regular" color="red" round size="xs" v-close-popup />
              </q-card-section>
              <q-separator class="q-mt-md" />
              <q-card-section>
                <div class="text-center">
                  <strong class="text-indigo-8 font-13">محل زمین خود را از نقشه پیدا کنید و با کلیک محل مورد نظر را ثبت کنید</strong>
                  <map_satelite class="q-mt-md" @location_updated="item => handleLocationUpdate(item)"></map_satelite>
                </div>
                <div class="q-mt-md">
                  <q-input color="indigo-5" outlined rounded v-model="add_items.title" type="text" label="عنوان زمین ( کنار جاده )" :error="this.Methods_Validation_Check(errors,'title')">
                    <template v-slot:prepend>
                      <q-icon name="fa-duotone fa-light fa-file-lines" color="teal-7"></q-icon>
                    </template>
                    <template v-slot:error>
                      <global_validations_errors  :errors="this.Methods_Validation_Errors(errors,'title')" />
                    </template>
                  </q-input>
                </div>
                <div>
                  <q-input color="indigo-5" outlined rounded v-model="add_items.area" type="number" label="مساحت زمین ( متر )" :error="this.Methods_Validation_Check(errors,'area')">
                    <template v-slot:prepend>
                      <q-icon name="fa-duotone fa-light fa-ruler-triangle" color="teal-7"></q-icon>
                    </template>
                    <template v-slot:error>
                      <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'area')" />
                    </template>
                  </q-input>
                </div>
                <div>
                  <q-input color="indigo-5" outlined rounded v-model="add_items.description" type="textarea" rows="4" label="توضیحات ( مثال : اجاره شده از آقای کریمی)">
                  </q-input>
                </div>

              </q-card-section>
              <q-card-section class="text-right">
                <q-btn rounded class="q-mr-sm" color="blue-grey-9" icon="fa-duotone fa-light fa-times" label="بستن" v-close-popup></q-btn>
                <q-btn :loading="add_loading" @click="Add_Item" rounded color="teal-8" icon="fa-duotone fa-light fa-plus-circle" label="افزودن زمین"></q-btn>
              </q-card-section>

            </q-card>
          </q-dialog>

        </div>
        <q-separator class="q-mt-md q-mb-md"/>
        <template v-if="loading">
          <global_loading_colorful size="100" text="درحال دریافت لیست زمین ها"></global_loading_colorful>
        </template>
        <template v-else>
          <template v-if="!items.length">
            <div class="q-mt-lg text-center">
              <img src="assets/images/icons/farm-shape.svg" width="300" alt="">
              <div class="q-mt-xs">
                <strong class="font-13">شما هنوز هیچ زمینی برای خود اضافه نکرده اید. برای استفاده از خدمات کشاوز ابتدا مزرعه خود را اضافه کنید</strong>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="text-center q-mb-md text-indigo-8">
              برای جزئیات و مدیریت زمین ، روی تصویر یا اسم آن کلیک کنید
            </div>
            <div v-for="item in items" class="item-box q-mb-md row">
              <div class="col-sm-3 col-xs-3">
                <img src="assets/images/icons/farm.svg" class="farm-image q-mt-xs" alt="">
              </div>
              <div class="col-sm-9 col-xs-9 q-pa-sm q-pl-md">
                <div>
                  <strong class="text-teal-8 font-16">{{item.title}}</strong>
                  <q-btn @click="Remove_Item(item.id)" :loading="remove_loading[item.id]" color="red-7" class="float-right" size="xs" round icon="fa-duotone fa-light fa-trash"></q-btn>
                  <q-btn color="blue-7" class="float-right q-mr-sm " size="xs" round icon="fa-duotone fa-light fa-pencil"></q-btn>
                </div>
                <div class="q-mt-xs">
                  <span class="text-grey-8">متراژ : </span>
                  <strong class="text-dark">{{this.$filters.number_format(item.area)}}</strong>
                  <span class="font-13 text-grey-8 q-ml-sm">متر</span>
                </div>
              </div>
            </div>
          </template>
        </template>

      </q-card-section>
    </q-card>


  </template>
</template>

<style scoped>

.item-box{
  border-radius: 10px;
  border: 1px dashed rgba(154, 154, 154, 0.0);
  background-color: rgba(26, 54, 122, 0.1);
}
.farm-image{
  border-radius: 8px;
}



</style>