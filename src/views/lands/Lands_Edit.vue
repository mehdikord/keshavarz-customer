<script>
import map_satelite from "@/components/global/map/Global_Map_Satelite.vue";
import {Stores_Lands} from "@/stores/lands/lands.js";

export default {
  name: "Lands_Edit",
  components: {map_satelite},
  props:['land'],
  mounted() {
    if (this.land){
      this.items = this.land;
    }
  },
  data(){
    return {
      items : {
        id : null,
        title:null,
        description:null,
        area : null,
        location : null,
      },
      loading:false,
      errors:[],

    }
  },
  methods:{
    handleLocationUpdate(coordinates) {
      this.items.location = coordinates;
    },
    Edit_Item(){
      this.loading=true;
      this.items.id = this.land.id;
      Stores_Lands().Edit(this.items).then(res=>{
        this.$emit('Updated',res.data.result)
        this.loading=false;
      }).catch(error=>{
        if (error.response.status === 422) {
          this.Methods_Validation_Notify();
          this.errors = error.response.data;
        }else {
          this.Methods_Notify_Error_Server();
        }
        this.loading=false;
      })


    }
  }

}
</script>

<template>

  <div v-if="land" class="text-center">
    <strong class="text-indigo-8 font-13">محل زمین خود را از نقشه پیدا کنید و با کلیک محل مورد نظر را ثبت کنید</strong>
    <map_satelite :selected="land.location" class="q-mt-md" @location_updated="item => handleLocationUpdate(item)"></map_satelite>
  </div>
  <div class="q-mt-md">
    <q-input color="indigo-5" outlined rounded v-model="items.title" type="text" label="عنوان زمین ( کنار جاده )" :error="this.Methods_Validation_Check(errors,'title')">
      <template v-slot:prepend>
        <q-icon name="fa-duotone fa-light fa-file-lines" color="teal-7"></q-icon>
      </template>
      <template v-slot:error>
        <global_validations_errors  :errors="this.Methods_Validation_Errors(errors,'title')" />
      </template>
    </q-input>
  </div>
  <div>
    <q-input color="indigo-5" outlined rounded v-model="items.area" type="number" label="مساحت زمین ( متر )" :error="this.Methods_Validation_Check(errors,'area')">
      <template v-slot:prepend>
        <q-icon name="fa-duotone fa-light fa-ruler-triangle" color="teal-7"></q-icon>
      </template>
      <template v-slot:error>
        <global_validations_errors :errors="this.Methods_Validation_Errors(errors,'area')" />
      </template>
    </q-input>
  </div>
  <div>
    <q-input color="indigo-5" outlined rounded v-model="items.description" type="textarea" rows="4" label="توضیحات ( مثال : اجاره شده از آقای کریمی)">
    </q-input>
  </div>
  <div class="q-mt-lg text-right">
    <q-btn rounded class="q-mr-sm" color="blue-grey-9" icon="fa-duotone fa-light fa-times" label="بستن" v-close-popup></q-btn>
    <q-btn :loading="loading" @click="Edit_Item" rounded color="blue-8" icon="fa-duotone fa-light fa-pencil" label="ویرایش اطلاعات"></q-btn>
  </div>
</template>

<style scoped>

</style>